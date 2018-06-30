/* eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import * as types from '../types';

polyfill();
const ALPHA_VANTAGE_API = 'https://www.alphavantage.co/query?function=';

function fetchDailySecurityPrice(symbol) {
  const uri = `${ALPHA_VANTAGE_API}TIME_SERIES_DAILY&symbol=${symbol}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}&outputsize=compact`;
  return request.get(uri);
}

function fetchSecurityPrice(symbol) {
  if (symbol.indexOf('.') !== -1 || symbol.indexOf(':') !== -1) {
    return fetchDailySecurityPrice(symbol);
  }
  const uri = `${ALPHA_VANTAGE_API}TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${process.env.ALPHA_VANTAGE_API_KEY}&outputsize=compact`;
  return request.get(uri);
}

function fetchCurrencyConversion(originalCurrency, tradingCurrency) {
  const api = 'https://query.yahooapis.com/v1/public/yql';
  const query = encodeURIComponent('select * from yahoo.finance.xchange where pair in ("' + originalCurrency + tradingCurrency + '")');
  const yqlStatement = 'q=' + query + '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
  const uri = api + '?' + yqlStatement;
  return request.get(uri);
}

function fetchMassCurrencyConversion(listOfDistinctCurrencies, tradingCurrency) {
  const api = 'https://query.yahooapis.com/v1/public/yql';
  let listOfPairs = '';
  for (const distinctCurrency of listOfDistinctCurrencies) {
    listOfPairs = listOfPairs + '"' + distinctCurrency + tradingCurrency + '", ';
  }
  listOfPairs = listOfPairs.substring(0, listOfPairs.length - 2);
  const query = encodeURIComponent('select * from yahoo.finance.xchange where pair in (' + listOfPairs + ')');
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

function setPriceFromFetch(index, price, currency, originalPrice, conversionRate, portfolio) {
  return {
    type: types.SET_PRICE_FROM_FETCH,
    index,
    price,
    currency,
    originalPrice,
    conversionRate,
    portfolio
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

export function fetchSecurityPriceProcess(symbol, index) {
  return (dispatch, getState) => {
    dispatch(setPriceToFetching(index));
    fetchSecurityPrice(symbol)
      .then(data => {
        if (data.status === 200) {
          try {
            const series = data.data['Time Series (1min)'] || data.data['Time Series (Daily)'];
            const latestPrices = Object.values(series)[0];
            const price = latestPrices['1. open'];
            // const currency = data.data.query.results.quote.Currency;
            const priceNumber = Number(price);
            if (!price || typeof priceNumber !== 'number' || isNaN(priceNumber) || !isFinite(priceNumber)) {
              return dispatch(setPriceToFetchFailed(index));
            }
            const { portfolio } = getState();
            return dispatch(setPriceFromFetch(index, price, null, price, 1, portfolio.portfolio));
          } catch (error) { dispatch(setPriceToFetchFailed(index, error, error)); }
        }
      })
      .catch((jqxhr, textStatus, error) => {
        if (jqxhr.response.data.error.description === 'No definition found for Table yahoo.finance.quotes') {
          return dispatch(fetchSecurityPriceProcess(symbol, index));
        }
        return dispatch(setPriceToFetchFailed(index, textStatus, error));
      });
  };
}

export function selectModelPortfolio(selectedModelPortfolio) {
  return (dispatch, getState) => {
    dispatch(selectModelPortfolioDispatch(selectedModelPortfolio));
    const {portfolio} = getState();
    for (const security of portfolio.portfolio) {
      dispatch(fetchSecurityPriceProcess(security.symbol.value, security.index));
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

export function removeSecurityDispatch(index, portfolio) {
  return {
    type: types.REMOVE_SECURITY,
    index,
    portfolio
  };
}

export function removeSecurity(index) {
  return (dispatch, getState) => {
    const {portfolio} = getState();
    return dispatch(removeSecurityDispatch(
      index,
      portfolio.portfolio
    ));
  };
}

function securityTextFieldChangeDispatch(index, column, value, portfolio) {
  return {
    type: types.SECURITY_TEXT_FIELD_CHANGE,
    index,
    column,
    value,
    portfolio
  };
}

export function securityTextFieldChange(index, column, value) {
  if (column !== 'symbol') {
    return securityTextFieldChangeDispatch(index, column, value);
  } else {
    return (dispatch, getState) => {
      const {portfolio} = getState();
      dispatch(securityTextFieldChangeDispatch(index, column, value, portfolio.portfolio));
      if (!value) {
        return dispatch(setPriceToNotFetching(index));
      }
      return dispatch(fetchSecurityPriceProcess(value, index));
    };
  }
}

export function setTradingCurrency(newTradingCurrency) {
  return (dispatch, getState) => {
    const {portfolio} = getState();
    if (newTradingCurrency === portfolio.currencies.tradingCurrency) {
      return;
    }
    const arrayOfDistinctCurrencies = [];
    for (const distinctCurrency in portfolio.currencies.listOfDistinctCurrencies) {
      if (portfolio.currencies.listOfDistinctCurrencies.hasOwnProperty(distinctCurrency)) {
        arrayOfDistinctCurrencies.push(distinctCurrency);
      }
    }
    if (arrayOfDistinctCurrencies.length > 1) {
    fetchMassCurrencyConversion(arrayOfDistinctCurrencies, newTradingCurrency)
      .then(data => {
        if (data.status === 200) {
          const newListOfDistinctCurrencies = {};
          for (let i = 0; i < arrayOfDistinctCurrencies.length; i++) {
            newListOfDistinctCurrencies[arrayOfDistinctCurrencies[i]] = data.data.query.results.rate[i].Rate;
          }
          dispatch(setCurrencies(newTradingCurrency, newListOfDistinctCurrencies));
        }
      })
      .catch((jqxhr, textStatus, error) => {
        if (jqxhr.response.data.error.description === 'No definition found for Table yahoo.finance.xchange') {
          return dispatch(setTradingCurrency(newTradingCurrency));
        }
        console.log(error);
      });
  } else {
    dispatch(setCurrencies(newTradingCurrency, {}));
  }
};
}

function setCurrencies(newTradingCurrency, newListOfDistinctCurrencies) {
  return {
    type: types.SET_CURRENCIES,
    newTradingCurrency,
    newListOfDistinctCurrencies
  };
}
