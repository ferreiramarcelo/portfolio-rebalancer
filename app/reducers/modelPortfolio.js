import { combineReducers } from 'redux';
import * as types from '../types';

const modelPortfoliosAutoCompleteSearchText = (state = '', action) => {
  switch (action.type) {
    case types.MODEL_PORTFOLIOS_AUTO_COMPLETE_SEARCH_TEXT_CHANGE:
      return action.searchText;
    case types.SELECT_MODEL_PORTFOLIO:
      return '';
    default:
      return state;
  }
};

const modelPortfolio = (state = {}, action) => {
  switch (action.type) {
    case types.CREATE_MODEL_PORTFOLIO_REQUEST:
      return {
        id: action.id,
        name: action.name,
        email: action.email,
        securities: action.securities
      };
    case types.SAVE_MODEL_PORTFOLIO_REQUEST:
      if (state.id === action.id) {
        return {
          id: action.id,
          name: action.name,
          email: action.email,
          securities: action.securities
        };
      }
      return state;
    default:
      return state;
  }
};

const modelPortfolios = (state = [], action) => {
  switch (action.type) {
    case types.REQUEST_SUCCESS:
      if (action.data) {
        return action.data;
      }
      return state;
    case types.CREATE_MODEL_PORTFOLIO_REQUEST:
      return [
        ...state,
        modelPortfolio(undefined, action)
      ];
    case types.CREATE_MODEL_PORTFOLIO_FAILURE:
      return state.filter(t => t.id !== action.id);
    case types.SAVE_MODEL_PORTFOLIO_REQUEST:
      return state.map(t => modelPortfolio(t, action));
    case types.DELETE_MODEL_PORTFOLIO_REQUEST:
    case types.SAVE_MODEL_PORTFOLIO_FAILURE:
      return state.filter(t => t.id !== action.id);
    default:
      return state;
  }
};

const userModelPortfolios = (state = [], action) => {
  switch (action.type) {
    case types.REQUEST_SUCCESS:
      if (action.data) {
        return action.data;
      }
      return state;
    case types.CREATE_MODEL_PORTFOLIO_REQUEST:
      return [
        ...state,
        modelPortfolio(undefined, action)
      ];
    case types.CREATE_MODEL_PORTFOLIO_FAILURE:
      return state.filter(t => t.id !== action.id);
    case types.SAVE_MODEL_PORTFOLIO_REQUEST:
      return state.map(t => modelPortfolio(t, action));
    case types.DELETE_MODEL_PORTFOLIO_REQUEST:
    case types.SAVE_MODEL_PORTFOLIO_FAILURE:
      return state.filter(t => t.id !== action.id);
    default:
      return state;
  }
};

const modelPortfolioReducer = combineReducers({
  modelPortfoliosAutoCompleteSearchText,
  modelPortfolios
});

export default modelPortfolioReducer;
