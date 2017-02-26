/* eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import * as types from '../types';
import { getPortfolioWithNormalizedAllocations } from '../algorithms/PortfolioAlgorithms';

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
    let computedPortfolio = [];
      for (const security of portfolio.portfolio) {
        computedPortfolio.push({
          symbol: security.symbol.value,
          allocation: Number(security.allocation.value),
          price: Number(security.price.value),
          units: Number(security.units.value)
        });
      }
      computedPortfolio = getPortfolioWithNormalizedAllocations(computedPortfolio);
      const computedInvestmentAmount = Number(investmentAmount.investmentAmount.value);
    return dispatch(generateStepsDispatch(computedPortfolio, computedInvestmentAmount));
  };
}

export function setScrolledToBttom() {
  return {
    type: types.SET_SCROLLED_TO_BOTTOM
  };
}
