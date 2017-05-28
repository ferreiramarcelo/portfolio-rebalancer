import expect from 'expect';
import rebalancingReducer from 'reducers/rebalancing';
import * as types from 'types';

describe('Rebalancing Reducer', () => {
  const initialState = {
    rebalancingSteps: {},
    showWholeUnits: true,
    showPartialUnits: false,
    showCashAmounts: false
  };

  it('REBALANCING 1: should return the initial state', () => {
    expect(
      rebalancingReducer(undefined, {})
    ).toEqual(initialState);
  });

  const emptyState = {
    rebalancingSteps: {}
  };
  it('REBALANCING 2: should handle SELECT_MODEL_PORTFOLIO', () => {
    expect(
      rebalancingReducer(undefined, {
        type: types.SELECT_MODEL_PORTFOLIO
      }).rebalancingSteps
    ).toEqual(emptyState.rebalancingSteps);
  });

  it('REBALANCING 3: should handle CREATE_NEW_PORTFOLIO', () => {
    expect(
      rebalancingReducer(undefined, {
        type: types.CREATE_NEW_PORTFOLIO
      }).rebalancingSteps
    ).toEqual(emptyState.rebalancingSteps);
  });

  const emptyPortfolio = [];
  const emptyInvestmentAmount = {};
  const emptyPortfolioResult = {
    rebalancingSteps: {
      portfolio: [],
      cashStillMissing: 0,
      balanceByInvesting: [],
      balanceByDisvesting: [],
      balanceByAdjusting: [],
      balanceByInvestingPartial: [],
      balanceByDisvestingPartial: [],
      balanceByAdjustingPartial: [],
      valueAdditionPerSecurity: [],
      valueReductionPerSecurity: [],
      valueAdjustmentsPerSecurity: []
    }
  };
  it('REBALANCING 4: should handle GENERATE_STEPS with empty data provided', () => {
    expect(
      rebalancingReducer(undefined, {
        type: types.GENERATE_STEPS,
        portfolio: emptyPortfolio,
        investmentAmount: emptyInvestmentAmount
      }).rebalancingSteps
    ).toEqual(emptyPortfolioResult.rebalancingSteps);
  });

  const portfolio5 = [
    {
      symbol: 'AAPL',
      allocation: 100,
      price: 10,
      units: 0
    }
  ];
  const investmentAmount5 = 10000;
  const portfolioResult5 = {
    rebalancingSteps: {
      portfolio: [
        {
          symbol: 'AAPL',
          allocation: 100,
          price: 10,
          units: 0
        }
      ],
      cashStillMissing: 0,
      balanceByInvesting: [
        1000
      ],
      balanceByDisvesting: [],
      balanceByAdjusting: [],
      balanceByInvestingPartial: [1000],
      balanceByDisvestingPartial: [],
      balanceByAdjustingPartial: [0],
      valueAdditionPerSecurity: [10000],
      valueReductionPerSecurity: [],
      valueAdjustmentsPerSecurity: [0]
    }
  };
  it('REBALANCING 5: should handle GENERATE_STEPS with one security portfolio provided', () => {
    expect(
      rebalancingReducer(undefined, {
        type: types.GENERATE_STEPS,
        portfolio: portfolio5,
        investmentAmount: investmentAmount5
      }).rebalancingSteps
    ).toEqual(portfolioResult5.rebalancingSteps);
  });

  const portfolio6 = [
    {
      symbol: 'AAPL',
      allocation: 95.42,
      price: 76.32,
      units: 983
    },
    {
      symbol: 'MSFT',
      allocation: 4.58,
      price: 729.78,
      units: 65.33
    }
  ];
  const investmentAmount6 = 6343.23;
  const portfolioResult6 = {
    rebalancingSteps: {
      portfolio: [
        {
          symbol: 'AAPL',
          allocation: 95.42,
          price: 76.32,
          units: 983
        },
        {
          symbol: 'MSFT',
          allocation: 4.58,
          price: 729.78,
          units: 65.33
        }
      ],
      cashStillMissing: 0,
      balanceByInvesting: [
        83,
        0
      ],
      balanceByDisvesting: [],
      balanceByAdjusting: [
        547,
        -57
      ],
      balanceByInvestingPartial: [83.11360062893083, 0],
      balanceByDisvestingPartial: [],
      balanceByAdjustingPartial: [547.3671291928723, -57.23147976102386],
      valueAdditionPerSecurity: [6343.23, 0],
      valueReductionPerSecurity: [],
      valueAdjustmentsPerSecurity: [41775.05930000001, -41766.389299999995]
    }
  };
  it('REBALANCING 6: should handle GENERATE_STEPS with positive investment and two security portfolio provided', () => {
    expect(
      rebalancingReducer(undefined, {
        type: types.GENERATE_STEPS,
        portfolio: portfolio6,
        investmentAmount: investmentAmount6
      }).rebalancingSteps
    ).toEqual(portfolioResult6.rebalancingSteps);
  });

  const portfolio7 = [
    {
      symbol: 'AAPL',
      allocation: 40,
      price: 354.32,
      units: 3242
    },
    {
      symbol: 'MSFT',
      allocation: 59,
      price: 20,
      units: 324234.43
    },
    {
      symbol: 'GOOG',
      allocation: 1,
      price: 800,
      units: 0
    }
  ];
  const investmentAmount7 = -8545.54;
  const portfolioResult7 = {
    rebalancingSteps: {
      portfolio: [
        {
          symbol: 'AAPL',
          allocation: 40,
          price: 354.32,
          units: 3242
        },
        {
          symbol: 'MSFT',
          allocation: 59,
          price: 20,
          units: 324234.43
        },
        {
          symbol: 'GOOG',
          allocation: 1,
          price: 800,
          units: 0
        }
      ],
      cashStillMissing: 0,
      balanceByInvesting: [],
      balanceByDisvesting: [
        0,
        -428,
        0
      ],
      balanceByAdjusting: [
        5365,
        -98873,
        95
      ],
      balanceByInvestingPartial: [],
      balanceByDisvestingPartial: [0, -427.27700000000004, 0],
      balanceByAdjustingPartial: [5365.866899977422, -98873.39924999997, 95.31060625],
      valueAdditionPerSecurity: [],
      valueReductionPerSecurity: [0, -8545.54, 0],
      valueAdjustmentsPerSecurity: [1901233.96, -1977467.9849999994, 76248.485]
    }
  };
  it('REBALANCING 7: should handle GENERATE_STEPS with negative investment and two security portfolio provided', () => {
    expect(
      rebalancingReducer(undefined, {
        type: types.GENERATE_STEPS,
        portfolio: portfolio7,
        investmentAmount: investmentAmount7
      }).rebalancingSteps
    ).toEqual(portfolioResult7.rebalancingSteps);
  });

  const portfolio8 = [
    {
      symbol: '1',
      allocation: 0,
      price: 10,
      units: 35
    },
    {
      symbol: '2',
      allocation: 20,
      price: 10,
      units: 20
    },
    {
      symbol: '3',
      allocation: 20,
      price: 20,
      units: 8
    },
    {
      symbol: '4',
      allocation: 20,
      price: 40,
      units: 5
    },
    {
      symbol: '5',
      allocation: 20,
      price: 5,
      units: 40
    },
    {
      symbol: '6',
      allocation: 20,
      price: 10,
      units: 22
    },
  ];
  const investmentAmount8 = 540;
  const portfolioResult8 = {
    rebalancingSteps: {
      portfolio: [
        {
          symbol: '1',
          allocation: 0,
          price: 10,
          units: 35
        },
        {
          symbol: '2',
          allocation: 20,
          price: 10,
          units: 20
        },
        {
          symbol: '3',
          allocation: 20,
          price: 20,
          units: 8
        },
        {
          symbol: '4',
          allocation: 20,
          price: 40,
          units: 5
        },
        {
          symbol: '5',
          allocation: 20,
          price: 5,
          units: 40
        },
        {
          symbol: '6',
          allocation: 20,
          price: 10,
          units: 22
        },
      ],
      cashStillMissing: 0,
      balanceByInvesting: [
        0,
        10,
        7,
        2,
        20,
        8
      ],
      balanceByDisvesting: [],
      balanceByAdjusting: [
        -35,
        7,
        3,
        2,
        14,
        7
      ],
      balanceByInvestingPartial: [0, 10.4, 7.2, 2.6, 20.8, 8.4],
      balanceByDisvestingPartial: [],
      balanceByAdjustingPartial: [-35, 7.4, 3.7, 2.35, 14.8, 7.4],
      valueAdditionPerSecurity: [0, 104, 144, 104, 104, 84],
      valueReductionPerSecurity: [],
      valueAdjustmentsPerSecurity: [-350, 74, 74, 94, 74, 74]
    }
  };
  it('REBALANCING 8: should handle GENERATE_STEPS with positive investment and six security portfolio provided', () => {
    expect(
      rebalancingReducer(undefined, {
        type: types.GENERATE_STEPS,
        portfolio: portfolio8,
        investmentAmount: investmentAmount8
      }).rebalancingSteps
    ).toEqual(portfolioResult8.rebalancingSteps);
  });

  const portfolio9 = [
    {
      symbol: 'A',
      allocation: 94,
      price: 10,
      units: 7
    },
    {
      symbol: 'B',
      allocation: 2,
      price: 4.5,
      units: 54.34
    },
    {
      symbol: 'C',
      allocation: 3,
      price: 1,
      units: 32423
    },
    {
      symbol: 'D',
      allocation: 1,
      price: 2,
      units: 432
    },
  ];
  const investmentAmount9 = 0;
  const portfolioResult9 = {
    rebalancingSteps: {
      portfolio: [
        {
          symbol: 'A',
          allocation: 94,
          price: 10,
          units: 7
        },
        {
          symbol: 'B',
          allocation: 2,
          price: 4.5,
          units: 54.34
        },
        {
          symbol: 'C',
          allocation: 3,
          price: 1,
          units: 32423
        },
        {
          symbol: 'D',
          allocation: 1,
          price: 2,
          units: 432
        },
      ],
      cashStillMissing: 0,
      balanceByInvesting: [],
      balanceByDisvesting: [],
      balanceByAdjusting: [
        3151,
        95,
        -31414,
        -263,
      ],
      balanceByInvestingPartial: [],
      balanceByDisvestingPartial: [],
      balanceByAdjustingPartial: [3151.54382, 95.00013333333334, -31414.9541, -263.99235],
      valueAdditionPerSecurity: [],
      valueReductionPerSecurity: [],
      valueAdjustmentsPerSecurity: [31515.4382, 427.5006, -31414.9541, -527.9847]
    }
  };
  it('REBALANCING 9: should handle GENERATE_STEPS with zero investment and four security portfolio provided', () => {
    expect(
      rebalancingReducer(undefined, {
        type: types.GENERATE_STEPS,
        portfolio: portfolio9,
        investmentAmount: investmentAmount9
      }).rebalancingSteps
    ).toEqual(portfolioResult9.rebalancingSteps);
  });
});
