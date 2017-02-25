import { combineReducers } from 'redux';
import * as types from '../types';
import { getPortfolioWithNormalizedAllocations, getValuesForInvesting, getValuesForDisvesting, getValueAdjustmentsPerSecurity, getUnitsForInvesting, getUnitsForDisvesting, getUnitsForAdjusting, getUpdatedValuePerSecurityForAdditions, getUpdatedValuePerSecurityForReductions } from '../algorithms/PortfolioAlgorithms';

const rebalancingSteps = (state = {},
  action
) => {
  switch (action.type) {
    case types.GENERATE_STEPS: {
      /* Compute portfolio statistics */
      let portfolio = [];
      for (const security of action.portfolio) {
        portfolio.push({
          symbol: security.symbol.value,
          allocation: Number(security.allocation.value),
          price: Number(security.price.value),
          units: Number(security.units.value)
        });
      }
      portfolio = getPortfolioWithNormalizedAllocations(portfolio);
      const investmentAmount = Number(action.investmentAmount.value);
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
        valuePerSecurityTotal.push(allocationPercentage * totalEquity);
      }
      /* Compute balancing steps */
      let valueAdjustmentsPerSecurity = [];
      let valueAdditionPerSecurity = [];
      let valueReductionPerSecurity = [];
      let unitsAdjustmentsPerSecurity = [];
      let unitsAdditionPerSecurity = [];
      let unitsReductionPerSecurity = [];
      let cashStillMissing = 0;
      let extraCash = 0;
      if (totalEquity < 0) {
        const negativeInvestmentAmount = -1 * investmentAmount;
        cashStillMissing = negativeInvestmentAmount - equityFromPortfolio;
      } else if (investmentAmount === 0) {
        valueAdjustmentsPerSecurity = getValueAdjustmentsPerSecurity(valuePerSecurityCurrent, valuePerSecurityTotal);
        const unitsAdjustmentsPerSecurityAndExtraCash = getUnitsForAdjusting(valueAdjustmentsPerSecurity, portfolio);
        unitsAdjustmentsPerSecurity = unitsAdjustmentsPerSecurityAndExtraCash.unitsAdjustmentsPerSecurity;
      } else if (investmentAmount > 0) {
        valueAdditionPerSecurity = getValuesForInvesting(investmentAmount, valuePerSecurityCurrent, valuePerSecurityTotal);
        const unitsAdditionPerSecurityAndExtraCash = getUnitsForInvesting(valueAdditionPerSecurity, portfolio, investmentAmount);
        unitsAdditionPerSecurity = unitsAdditionPerSecurityAndExtraCash.unitsAdditionPerSecurity;
        extraCash = unitsAdditionPerSecurityAndExtraCash.extraCash;

        valuePerSecurityCurrent = getUpdatedValuePerSecurityForAdditions(valuePerSecurityCurrent, unitsAdditionPerSecurity, portfolio);
        valueAdjustmentsPerSecurity = getValueAdjustmentsPerSecurity(valuePerSecurityCurrent, valuePerSecurityTotal);
        const unitsAdjustmentsPerSecurityAndExtraCash = getUnitsForAdjusting(valueAdjustmentsPerSecurity, portfolio);
        unitsAdjustmentsPerSecurity = unitsAdjustmentsPerSecurityAndExtraCash.unitsAdjustmentsPerSecurity;
      } else if (investmentAmount < 0) {
        valueReductionPerSecurity = getValuesForDisvesting(investmentAmount, valuePerSecurityCurrent, valuePerSecurityTotal);
        const unitsReductionPerSecurityAndExtraCash = getUnitsForDisvesting(valueReductionPerSecurity, portfolio, investmentAmount);
        unitsReductionPerSecurity = unitsReductionPerSecurityAndExtraCash.unitsReductionPerSecurity;
        extraCash = unitsReductionPerSecurityAndExtraCash.extraCash;

        valuePerSecurityCurrent = getUpdatedValuePerSecurityForReductions(valuePerSecurityCurrent, unitsReductionPerSecurity, portfolio);
        valueAdjustmentsPerSecurity = getValueAdjustmentsPerSecurity(valuePerSecurityCurrent, valuePerSecurityTotal);
        const unitsAdjustmentsPerSecurityAndExtraCash = getUnitsForAdjusting(valueAdjustmentsPerSecurity, portfolio);
        unitsAdjustmentsPerSecurity = unitsAdjustmentsPerSecurityAndExtraCash.unitsAdjustmentsPerSecurity;
      }
      return {
        portfolio,
        cashStillMissing,
        balanceByInvesting: unitsAdditionPerSecurity,
        balanceByDisvesting: unitsReductionPerSecurity,
        balanceByAdjusting: unitsAdjustmentsPerSecurity
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
