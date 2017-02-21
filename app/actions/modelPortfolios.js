/* eslint consistent-return: 0, no-else-return: 0*/
import { polyfill} from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from '../types';

polyfill();

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

function createNewModelPortfolioDispatch(data) {
  return {
    type: types.CREATE_NEW_PORTFOLIO,
    modelPortfolios: data.modelPortfolios,
    email: data.email
  };
}

export function createNewModelPortfolio() {
  return (dispatch, getState) => {
    const {modelPortfolio, user} = getState();
    dispatch(createNewModelPortfolioDispatch({
      modelPortfolios: modelPortfolio.modelPortfolios,
      email: user.email
    }));
  };
}

function createModelPortfolioSuccess() {
  return {
    type: types.CREATE_MODEL_PORTFOLIO_SUCCESS
  };
}

function createModelPortfolioFailure(data) {
  return {
    type: types.CREATE_MODEL_PORTFOLIO_FAILURE,
    id: data.id,
    error: data.error
  };
}

function createModelPortfolioDuplicate() {
  return {
    type: types.CREATE_MODEL_PORTFOLIO_DUPLICATE
  };
}

function saveModelPortfolioRequest(data) {
  return {
    type: types.SAVE_MODEL_PORTFOLIO_REQUEST,
    id: data.id,
    name: data.name,
    email: data.email,
    securities: data.securities
  };
}

function saveModelPortfolioSuccess() {
  return {
    type: types.SAVE_MODEL_PORTFOLIO_SUCCESS
  };
}

function saveModelPortfolioFailure(data) {
  return {
    type: types.SAVE_MODEL_PORTFOLIO_FAILURE,
    id: data.id,
    error: data.error
  };
}

function saveModelPortfolioDuplicate() {
  return {
    type: types.SAVE_MODEL_PORTFOLIO_DUPLICATE
  };
}

function deleteModelPortfolioRequest(data) {
  return {
    type: types.DELETE_MODEL_PORTFOLIO_REQUEST,
    id: data.id,
    modelPortfolios: data.modelPortfolios,
    email: data.email
  };
}

function deleteModelPortfolioSuccess() {
  return {
    type: types.SAVE_MODEL_PORTFOLIO_SUCCESS
  };
}

function deleteModelPortfolioFailure(data) {
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
