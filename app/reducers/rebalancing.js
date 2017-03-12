import { combineReducers } from 'redux';
import * as types from '../types';
import { getValuesForInvesting, getValuesForDisvesting, getValueAdjustmentsPerSecurity, getUnitsForInvesting, getUnitsForDisvesting, getUnitsForAdjusting, getUpdatedValuePerSecurityForAdditions, getUpdatedValuePerSecurityForReductions } from '../algorithms/PortfolioAlgorithms';

const rebalancingSteps = (state = {},
  action
) => {
  switch (action.type) {
    case types.GENERATE_STEPS: {
      let portfolio = [];
      let investmentAmount = 0;
      let balanceByAdjusting = [];
      let balanceByInvesting = [];
      let balanceByDisvesting = [];
      let cashStillMissing = 0;
      let extraCash = 0;
      /* Compute portfolio statistics */
      if (action.portfolio.length > 0) {
        portfolio = action.portfolio;
        investmentAmount = action.investmentAmount;
        let equityFromPortfolio = 0;
        for (const security of portfolio) {
          equityFromPortfolio += security.price * security.units;
        }
        const totalEquity = investmentAmount + equityFromPortfolio;
        let valuePerSecurityCurrent = [];
        for (const security of portfolio) {
          valuePerSecurityCurrent.push(security.price * security.units);
        }
        const valuePerSecurityTotal = [];
        for (const security of portfolio) {
          const allocationPercentage = security.allocation / 100;
          valuePerSecurityTotal.push((allocationPercentage * totalEquity).toFixed(4));
        }
        /* Compute balancing steps */
        let valueAdjustmentsPerSecurity = [];
        let valueAdditionPerSecurity = [];
        let valueReductionPerSecurity = [];
        if (totalEquity < 0) {
          const negativeInvestmentAmount = -1 * investmentAmount;
          cashStillMissing = negativeInvestmentAmount - equityFromPortfolio;
        } else if (investmentAmount === 0) {
          valueAdjustmentsPerSecurity = getValueAdjustmentsPerSecurity(valuePerSecurityCurrent, valuePerSecurityTotal);
          const balanceByAdjustingAndExtraCash = getUnitsForAdjusting(valueAdjustmentsPerSecurity, portfolio, 0);
          balanceByAdjusting = balanceByAdjustingAndExtraCash.unitsAdjustmentsPerSecurity;
        } else if (investmentAmount > 0) {
          valueAdditionPerSecurity = getValuesForInvesting(investmentAmount, valuePerSecurityCurrent, valuePerSecurityTotal);
          const balanceByInvestingAndExtraCash = getUnitsForInvesting(valueAdditionPerSecurity, portfolio, investmentAmount);
          balanceByInvesting = balanceByInvestingAndExtraCash.unitsAdditionPerSecurity;
          extraCash = balanceByInvestingAndExtraCash.extraCash;

          valuePerSecurityCurrent = getUpdatedValuePerSecurityForAdditions(valuePerSecurityCurrent, balanceByInvesting, portfolio);
          valueAdjustmentsPerSecurity = getValueAdjustmentsPerSecurity(valuePerSecurityCurrent, valuePerSecurityTotal);
          const balanceByAdjustingAndExtraCash = getUnitsForAdjusting(valueAdjustmentsPerSecurity, portfolio, extraCash);
          balanceByAdjusting = balanceByAdjustingAndExtraCash.unitsAdjustmentsPerSecurity;
        } else if (investmentAmount < 0) {
          valueReductionPerSecurity = getValuesForDisvesting(investmentAmount, valuePerSecurityCurrent, valuePerSecurityTotal);
          const balanceByDisvestingAndExtraCash = getUnitsForDisvesting(valueReductionPerSecurity, portfolio, investmentAmount);
          balanceByDisvesting = balanceByDisvestingAndExtraCash.unitsReductionPerSecurity;
          extraCash = balanceByDisvestingAndExtraCash.extraCash;

          valuePerSecurityCurrent = getUpdatedValuePerSecurityForReductions(valuePerSecurityCurrent, balanceByDisvesting, portfolio);
          valueAdjustmentsPerSecurity = getValueAdjustmentsPerSecurity(valuePerSecurityCurrent, valuePerSecurityTotal);
          const balanceByAdjustingAndExtraCash = getUnitsForAdjusting(valueAdjustmentsPerSecurity, portfolio, extraCash);
          balanceByAdjusting = balanceByAdjustingAndExtraCash.unitsAdjustmentsPerSecurity;
        }
      }
      return {
        portfolio,
        cashStillMissing,
        balanceByInvesting,
        balanceByDisvesting,
        balanceByAdjusting,
      };
    }
    case types.SELECT_MODEL_PORTFOLIO:
    case types.CREATE_NEW_PORTFOLIO:
      return {};
    default:
      return state;
  }
};

const rebalancingReducer = combineReducers({
  rebalancingSteps
});

export default rebalancingReducer;
