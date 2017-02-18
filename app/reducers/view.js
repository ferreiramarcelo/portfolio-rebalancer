import { combineReducers } from 'redux';
import * as types from '../types';

const view = (
  state = {displayPortfolio: false, justGeneratedSteps: false},
  action
) => {
  switch (action.type) {
    case types.SELECT_MODEL_PORTFOLIO:
        return { ...state, displayPortfolio: true, justGeneratedSteps: false };
    case types.CREATE_NEW_PORTFOLIO:
      return { ...state, displayPortfolio: true, justGeneratedSteps: false };
    case types.GENERATE_STEPS:
      return { ...state, justGeneratedSteps: true };
    case types.SET_SCROLLED_TO_BOTTOM:
      return { ...state, justGeneratedSteps: false };
    default:
      return { ...state, justGeneratedSteps: false };
  }
};

const modelPortfolioReducer = combineReducers({
  view
});

export default modelPortfolioReducer;
