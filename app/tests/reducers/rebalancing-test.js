import expect from 'expect';
import rebalancingReducer from 'reducers/rebalancing';
import * as types from 'types';

describe('Rebalancing Reducer', () => {
  const initialState = { rebalancingSteps: {} };

  it('REBALANCING 1: should return the initial state', () => {
    expect(
      rebalancingReducer(undefined, {})
    ).toEqual(initialState);
  });

  const emptyState = { rebalancingSteps: {} };
  it('REBALANCING 2: should handle SELECT_MODEL_PORTFOLIO', () => {
    expect(
      rebalancingReducer(undefined, {type: types.SELECT_MODEL_PORTFOLIO})
    ).toEqual(emptyState);
  });

  it('REBALANCING 3: should handle CREATE_NEW_PORTFOLIO', () => {
    expect(
      rebalancingReducer(undefined, {type: types.CREATE_NEW_PORTFOLIO})
    ).toEqual(emptyState);
  });

  const emptyPortfolio = [];
  const emptyInvestmentAmount = {};
  const emptyPortfolioResult = {
    rebalancingSteps: {
    portfolio: [],
    cashStillMissing: 0,
    balanceByInvesting: [],
    balanceByDisvesting: [],
    balanceByAdjusting: []
  }
  };
  it('REBALANCING 4: should handle GENERATE_STEPS with empty data provided', () => {
    expect(
      rebalancingReducer(undefined, {type: types.GENERATE_STEPS, portfolio: emptyPortfolio, investmentAmount: emptyInvestmentAmount})
    ).toEqual(emptyPortfolioResult);
  });

  const portfolio5 = [{symbol: 'AAPL', allocation: 100, price: 10, units: 0}];
  const investmentAmount5 = 10000;
  const portfolioResult5 = {
    rebalancingSteps: {
    portfolio: [{symbol: 'AAPL', allocation: 100, price: 10, units: 0}],
    cashStillMissing: 0,
    balanceByInvesting: [1000],
    balanceByDisvesting: [],
    balanceByAdjusting: []
  }
  };
  it('REBALANCING 5: should handle GENERATE_STEPS with one security portfolio provided', () => {
    expect(
      rebalancingReducer(undefined, {type: types.GENERATE_STEPS, portfolio: portfolio5, investmentAmount: investmentAmount5})
    ).toEqual(portfolioResult5);
  });

  const portfolio6 = [{symbol: 'AAPL', allocation: 95.42, price: 76.32, units: 983}, {symbol: 'MSFT', allocation: 4.58, price: 729.78, units: 65.33}];
  const investmentAmount6 = 6343.23;
  const portfolioResult6 = {
    rebalancingSteps: {
    portfolio: [{symbol: 'AAPL', allocation: 95.42, price: 76.32, units: 983}, {symbol: 'MSFT', allocation: 4.58, price: 729.78, units: 65.33}],
    cashStillMissing: 0,
    balanceByInvesting: [83, 0],
    balanceByDisvesting: [],
    balanceByAdjusting: [547, -57]
  }
  };
  it('REBALANCING 6: should handle GENERATE_STEPS with two security portfolio provided', () => {
    expect(
      rebalancingReducer(undefined, {type: types.GENERATE_STEPS, portfolio: portfolio6, investmentAmount: investmentAmount6})
    ).toEqual(portfolioResult6);
  });

});
