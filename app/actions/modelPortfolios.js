/* eslint consistent-return: 0, no-else-return: 0*/
import { polyfill} from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from '../types';

polyfill();

export function fetchSecurityPrice(symbol) {
  const api = 'https://query.yahooapis.com/v1/public/yql';
  const query = encodeURIComponent("select LastTradePriceOnly from yahoo.finance.quotes where symbol in ('" + symbol + "')");
  const yqlStatement = 'q=' + query + '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
  const uri = api + '?' + yqlStatement;
  return request.get(uri);
}

export function setPriceToFetching(index) {
  return {
    index,
    type: types.SET_PRICE_TO_FETCHING,
  };
}

export function setPriceToNotFetching(index) {
  return {
    index,
    type: types.SET_PRICE_TO_NOT_FETCHING,
  };
}

export function setPriceFromFetch(index, price) {
  return {
    index,
    price,
    type: types.SET_PRICE_FROM_FETCH,
  };
}

export function setPriceToFetchFailed(index) {
  return {
    index,
    type: types.SET_PRICE_TO_FETCH_FAILED,
  };
}

export function selectModelPortfolioDispatch(selectedModelPortfolio) {
  return {
    type: types.SELECT_MODEL_PORTFOLIO,
    selectedModelPortfolio
  };
}

export function selectModelPortfolio(selectedModelPortfolio) {
  return (dispatch, getState) => {
    dispatch(selectModelPortfolioDispatch(selectedModelPortfolio));
    const {modelPortfolio} = getState();
    for (const security of modelPortfolio.portfolio) {
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

export function createNewPortfolioDispatch(data) {
  return {
    type: types.CREATE_NEW_PORTFOLIO,
    modelPortfolios: data.modelPortfolios,
    email: data.email
  };
}

export function createNewPortfolio() {
  return (dispatch, getState) => {
    const {modelPortfolio, user} = getState();
    dispatch(createNewPortfolioDispatch({
      modelPortfolios: modelPortfolio.modelPortfolios,
      email: user.email
    }));
  };
}

export function modelPortfolioNameTextFieldChangeDispatch(data) {
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

export function securityTextFieldChangeDispatch(index, column, value) {
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
      if (value === '') {
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

export function makeModelPortfolioRequest(method, id, data, api = '/modelPortfolio') {
  return request[method](api + (id ? ('/' + id) : ''), data);
}

export function createModelPortfolioRequest(data) {
  return {
    type: types.CREATE_MODEL_PORTFOLIO_REQUEST,
    id: data.id,
    name: data.name,
    email: data.email,
    securities: data.securities
  };
}

export function createModelPortfolioSuccess() {
  return {
    type: types.CREATE_MODEL_PORTFOLIO_SUCCESS
  };
}

export function createModelPortfolioFailure(data) {
  return {
    type: types.CREATE_MODEL_PORTFOLIO_FAILURE,
    id: data.id,
    error: data.error
  };
}

export function createModelPortfolioDuplicate() {
  return {
    type: types.CREATE_MODEL_PORTFOLIO_DUPLICATE
  };
}

export function saveModelPortfolioRequest(data) {
  return {
    type: types.SAVE_MODEL_PORTFOLIO_REQUEST,
    id: data.id,
    name: data.name,
    email: data.email,
    securities: data.securities
  };
}

export function saveModelPortfolioSuccess() {
  return {
    type: types.SAVE_MODEL_PORTFOLIO_SUCCESS
  };
}

export function saveModelPortfolioFailure(data) {
  return {
    type: types.SAVE_MODEL_PORTFOLIO_FAILURE,
    id: data.id,
    error: data.error
  };
}

export function saveModelPortfolioDuplicate() {
  return {
    type: types.SAVE_MODEL_PORTFOLIO_DUPLICATE
  };
}

export function deleteModelPortfolioRequest(data) {
  return {
    type: types.DELETE_MODEL_PORTFOLIO_REQUEST,
    id: data.id,
    modelPortfolios: data.modelPortfolios,
    email: data.email
  };
}

export function deleteModelPortfolioSuccess() {
  return {
    type: types.SAVE_MODEL_PORTFOLIO_SUCCESS
  };
}

export function deleteModelPortfolioFailure(data) {
  return {
    type: types.deleteModelPortfolioFailure,
    id: data.id,
    error: data.error
  };
}

export function saveModelPortfolio(selectedModelPortfolio, portfolio) {
	return (dispatch, getState) => {
		if (selectedModelPortfolio.name.trim().length <= 0 || portfolio.length <= 0) {
			return;
		}
		const securities = [];
		for (const security of portfolio) {
			securities.push({
				symbol: security.symbol.value,
				allocation: Number(security.allocation.value)
			});
		}
		if (selectedModelPortfolio.email) {
			const id = selectedModelPortfolio.id;
			const data = {
				id,
				name: selectedModelPortfolio.name,
				email: selectedModelPortfolio.email,
				securities
			};
			dispatch(saveModelPortfolioRequest(data));
			return makeModelPortfolioRequest('put', id, data)
			.then((res) => {
				if (res.status === 200) {
					return dispatch(saveModelPortfolioSuccess());
				}
			})
			.catch(() => {
				return dispatch(saveModelPortfolioFailure({
					error: 'Oops! Something went wrong and we couldn\'t save your modelPortfolio'
				}));
			});
		}
		const { user } = getState();
		const id = md5.hash(selectedModelPortfolio.name);
		const data = {
			id,
			name: selectedModelPortfolio.name,
			email: user.email,
			securities
		};
		dispatch(createModelPortfolioRequest(data));
		return makeModelPortfolioRequest('post', id, data)
		.then((res) => {
			if (res.status === 200) {
				return dispatch(createModelPortfolioSuccess());
			}
		})
		.catch(() => {
			return dispatch(createModelPortfolioFailure({
				id,
				error: 'Failure. Something went wrong and the model portfolio was not saved.'
			}));
		});
	};
}

export function deleteModelPortfolio(id) {
  return (dispatch, getState) => {
    const {modelPortfolio, user} = getState();
    dispatch(deleteModelPortfolioRequest({
      id,
      modelPortfolios: modelPortfolio.modelPortfolios,
      email: user.email
    }));
    return makeModelPortfolioRequest('delete', id)
      .then(res => {
        if (res.status === 200) {
          return dispatch(deleteModelPortfolioSuccess());
        }
      })
      .catch(() => {
        return dispatch(deleteModelPortfolioFailure({
          id,
          error: 'Failure. Something went wrong and the model portfolio was not deleted.'
        }));
      });
  };
}
