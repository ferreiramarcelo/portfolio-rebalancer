/* eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import * as types from '../types';

polyfill();

function fetchSecurityPrice(symbol) {
  const api = 'https://query.yahooapis.com/v1/public/yql';
  const query = encodeURIComponent('select LastTradePriceOnly, Currency from yahoo.finance.quotes where symbol in ("' + symbol + '")');
  const yqlStatement = 'q=' + query + '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
  const uri = api + '?' + yqlStatement;
  return request.get(uri);
}

function fetchCurrencyConversion(originalCurrency, tradingCurrency) {
  const api = 'https://query.yahooapis.com/v1/public/yql';
  const query = encodeURIComponent('select * from yahoo.finance.xchange where pair in ("' + originalCurrency + tradingCurrency + '")');
  const yqlStatement = 'q=' + query + '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
  const uri = api + '?' + yqlStatement;
  return request.get(uri);
}

function setPriceToFetching(index) {
  return {
    index,
    type: types.SET_PRICE_TO_FETCHING,
  };
}

function setPriceToNotFetching(index) {
  return {
    index,
    type: types.SET_PRICE_TO_NOT_FETCHING,
  };
}

function setPriceFromFetch(index, price, currency, conversionRate) {
  return {
    type: types.SET_PRICE_FROM_FETCH,
    index,
    price,
    currency,
    conversionRate
  };
}

function setPriceToFetchFailed(index) {
  return {
    index,
    type: types.SET_PRICE_TO_FETCH_FAILED,
  };
}

function selectModelPortfolioDispatch(selectedModelPortfolio) {
  return {
    selectedModelPortfolio,
    type: types.SELECT_MODEL_PORTFOLIO
  };
}

function fetchSecurityPriceProces(symbol, index) {
  return (dispatch, getState) => {
    dispatch(setPriceToFetching(index));
  fetchSecurityPrice(symbol)
    .then(data => {
      if (data.status === 200) {
        const price = data.data.query.results.quote.LastTradePriceOnly;
        const currency = data.data.query.results.quote.Currency;
        const priceNumber = Number(price);
        if (!price || typeof priceNumber !== 'number' || isNaN(priceNumber) || !isFinite(priceNumber)) {
          return dispatch(setPriceToFetchFailed(index));
        }
        const {portfolio} = getState();
        if (portfolio.currencies.tradingCurrency === null) {
          dispatch(setTradingCurrency(currency));
          return dispatch(setPriceFromFetch(index, price, currency, 1));
        } else if (currency === portfolio.currencies.tradingCurrency) {
          return dispatch(setPriceFromFetch(index, price, currency, 1));
        }
        fetchCurrencyConversion(currency, portfolio.currencies.tradingCurrency)
        .then(data => {
          if (data.status === 200) {
            const rate = data.data.query.results.rate.Rate;
            const rateNumber = Number(rate);
            if (!rate || typeof rateNumber !== 'number' || isNaN(rateNumber) || !isFinite(rateNumber)) {
              return dispatch(setPriceToFetchFailed(index));
            }
            const convertedPrice = price * rate;
            return dispatch(setPriceFromFetch(index, convertedPrice, currency, rate));
          }
        })
        .catch((jqxhr, textStatus, error) => {
          return dispatch(setPriceToFetchFailed(index, textStatus, error));
        });
        // Get exchange rate for tradingCurrency/currency
        // Add exchange rate to listOfDistinctCurrencies in setPriceFromFetch or similar dispatch
      }
    })
    .catch((jqxhr, textStatus, error) => {
      return dispatch(setPriceToFetchFailed(index, textStatus, error));
    });
  };
}

export function selectModelPortfolio(selectedModelPortfolio) {
  return (dispatch, getState) => {
    dispatch(selectModelPortfolioDispatch(selectedModelPortfolio));
    const {portfolio} = getState();
    for (const security of portfolio.portfolio) {
      dispatch(fetchSecurityPriceProces(security.symbol.value, security.index));
    }
  };
}

function modelPortfolioNameTextFieldChangeDispatch(data) {
  return {
    type: types.MODEL_PORTFOLIO_NAME_TEXT_FIELD_CHANGE,
    value: data.value,
    modelPortfolios: data.modelPortfolios,
    email: data.email
  };
}

export function modelPortfolioNameTextFieldChange(value) {
  return (dispatch, getState) => {
    const {user, modelPortfolio} = getState();
    dispatch(modelPortfolioNameTextFieldChangeDispatch({
      value,
      modelPortfolios: modelPortfolio.modelPortfolios,
      email: user.email
    }));
  };
}

export function addSecurity() {
  return {
    type: types.ADD_SECURITY,
  };
}

export function removeSecurity(index) {
  return {
    type: types.REMOVE_SECURITY,
    index
  };
}

function securityTextFieldChangeDispatch(index, column, value) {
  return {
    type: types.SECURITY_TEXT_FIELD_CHANGE,
    index,
    column,
    value
  };
}

export function securityTextFieldChange(index, column, value) {
  if (column !== 'symbol') {
    return securityTextFieldChangeDispatch(index, column, value);
  } else {
    return (dispatch) => {
      dispatch(securityTextFieldChangeDispatch(index, column, value));
      if (!value) {
        return dispatch(setPriceToNotFetching(index));
      }
      return dispatch(fetchSecurityPriceProces(value, index));
    };
  }
}

export function setTradingCurrency(currency) {
  return {
    type: types.SET_TRADING_CURRENCY,
    currency
  };
}
