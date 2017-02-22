/* eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import * as types from '../types';

polyfill();

function fetchSecurityPrice(symbol) {
  const api = 'https://query.yahooapis.com/v1/public/yql';
  const query = encodeURIComponent("select LastTradePriceOnly from yahoo.finance.quotes where symbol in ('" + symbol + "')");
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

function setPriceFromFetch(index, price) {
  return {
    index,
    price,
    type: types.SET_PRICE_FROM_FETCH,
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

export function selectModelPortfolio(selectedModelPortfolio) {
  return (dispatch, getState) => {
    dispatch(selectModelPortfolioDispatch(selectedModelPortfolio));
    const {portfolio} = getState();
    for (const security of portfolio.portfolio) {
      dispatch(setPriceToFetching(security.index));
      fetchSecurityPrice(security.symbol.value)
        .then(data => {
          if (data.status === 200) {
            const price = data.data.query.results.quote.LastTradePriceOnly;
            const priceNumber = Number(price);
            if (!price || typeof priceNumber !== 'number' || isNaN(priceNumber) || !isFinite(priceNumber)) {
              return dispatch(setPriceToFetchFailed(security.index));
            }
            return dispatch(setPriceFromFetch(security.index, price));
          }
        })
        .catch((jqxhr, textStatus, error) => {
          return dispatch(setPriceToFetchFailed(security.index, textStatus, error));
        });
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
      dispatch(setPriceToFetching(index));
      return fetchSecurityPrice(value)
        .then(data => {
          if (data.status === 200) {
            const price = data.data.query.results.quote.LastTradePriceOnly;
            const priceNumber = Number(price);
            if (!price || typeof priceNumber !== 'number' || isNaN(priceNumber) || !isFinite(priceNumber)) {
              return dispatch(setPriceToFetchFailed(index));
            }
            return dispatch(setPriceFromFetch(index, price));
          }
        })
        .catch((jqxhr, textStatus, error) => {
          return dispatch(setPriceToFetchFailed(index, textStatus, error));
        });
    };
  }
}
