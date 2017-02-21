/* eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import * as types from '../types';

polyfill();

function generateStepsDispatch(portfolio, investmentAmount) {
  return {
    type: types.GENERATE_STEPS,
    portfolio,
    investmentAmount,
  };
}
export function generateSteps() {
  return (dispatch, getState) => {
    const {portfolio, investmentAmount} = getState();
    return dispatch(generateStepsDispatch(portfolio.portfolio, investmentAmount.investmentAmount));
  };
}

export function setScrolledToBttom() {
  return {
    type: types.SET_SCROLLED_TO_BOTTOM
  };
}
