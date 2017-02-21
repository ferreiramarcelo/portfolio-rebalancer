import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import user from '../reducers/user';
import modelPortfolio from '../reducers/modelPortfolio';
import portfolio from '../reducers/portfolio';
import investmentAmount from '../reducers/investmentAmount';
import rebalancing from '../reducers/rebalancing';
import authentication from '../reducers/authentication';
import view from '../reducers/view';
import * as types from '../types';

const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.CREATE_REQUEST:
      return true;
    case types.REQUEST_SUCCESS:
    case types.REQUEST_FAILURE:
      return false;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  isFetching,
  modelPortfolio,
  portfolio,
  user,
  investmentAmount,
  rebalancing,
  view,
  routing,
  authentication
});

export default rootReducer;
