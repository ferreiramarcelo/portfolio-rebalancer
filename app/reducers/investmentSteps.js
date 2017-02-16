import { combineReducers } from 'redux';
import * as types from '../types';
import { getPortfolioWithNormalizedAllocations, getValuesForInvesting, getValuesForDisvesting, getValueAdjustmentsPerSecurity, getUnitsForValuePerSecurityAndExtraCash,
getUnitsForInvesting, getUnitsForDisvesting, getUnitsForAdjusting, getUpdatedValuePerSecurityForAdditions, getUpdatedValuePerSecurityForReductions } from '../algorithms/InvestmentStepsAlgorithms';

const investmentSteps = (state = {},
  action
) => {
  switch (action.type) {
    case types.GENERATE_STEPS:
      /* Compute portfolio statistics */
      let portfolio = [];
      for (let security of action.portfolio) {
        portfolio.push( {
          symbol: security.symbol.value,
          allocation: Number( security.allocation.value ),
          price: Number( security.price.value ),
          units: Number( security.units.value )
        });
      }
      portfolio = getPortfolioWithNormalizedAllocations( portfolio );
      let investmentAmount = Number( action.investmentAmount.value );
      let equityFromPortfolio = 0;
      for (let security of portfolio) {
        equityFromPortfolio += security.price * security.units;
      }
      let totalEquity = investmentAmount + equityFromPortfolio;

      let valuePerSecurityCurrent = [];
      for (let security of portfolio) {
        valuePerSecurityCurrent.push( security.price * security.units );
      }
      let valuePerSecurityTotal = [];
      for (let security of portfolio) {
        valuePerSecurityTotal.push( security.allocation / 100 * totalEquity )
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
      if ( totalEquity < 0 ) {
        cashStillMissing = -1 * investmentAmount - equityFromPortfolio;
      }
      else if ( investmentAmount === 0 ) {
        valueAdjustmentsPerSecurity = getValueAdjustmentsPerSecurity( valuePerSecurityCurrent, valuePerSecurityTotal );
        let unitsAdjustmentsPerSecurityAndExtraCash = getUnitsForAdjusting(valueAdjustmentsPerSecurity, portfolio);
        unitsAdjustmentsPerSecurity = unitsAdjustmentsPerSecurityAndExtraCash.unitsAdjustmentsPerSecurity;
      }
      else if ( investmentAmount > 0 ) {
        valueAdditionPerSecurity = getValuesForInvesting( investmentAmount, valuePerSecurityCurrent, valuePerSecurityTotal );
        let unitsAdditionPerSecurityAndExtraCash = getUnitsForInvesting( valueAdditionPerSecurity, portfolio, investmentAmount );
        unitsAdditionPerSecurity = unitsAdditionPerSecurityAndExtraCash.unitsAdditionPerSecurity;
        extraCash = unitsAdditionPerSecurityAndExtraCash.extraCash;

        valuePerSecurityCurrent = getUpdatedValuePerSecurityForAdditions( valuePerSecurityCurrent, unitsAdditionPerSecurity, portfolio );
        valueAdjustmentsPerSecurity = getValueAdjustmentsPerSecurity( valuePerSecurityCurrent, valuePerSecurityTotal );
        let unitsAdjustmentsPerSecurityAndExtraCash = getUnitsForAdjusting(valueAdjustmentsPerSecurity, portfolio);
        unitsAdjustmentsPerSecurity = unitsAdjustmentsPerSecurityAndExtraCash.unitsAdjustmentsPerSecurity;
      }
      else if ( investmentAmount < 0 ) {
        valueReductionPerSecurity = getValuesForDisvesting( investmentAmount, valuePerSecurityCurrent, valuePerSecurityTotal );
        let unitsReductionPerSecurityAndExtraCash = getUnitsForDisvesting( valueReductionPerSecurity, portfolio, investmentAmount );
        unitsReductionPerSecurity = unitsReductionPerSecurityAndExtraCash.unitsReductionPerSecurity;
        extraCash = unitsReductionPerSecurityAndExtraCash.extraCash;

        valuePerSecurityCurrent = getUpdatedValuePerSecurityForReductions( valuePerSecurityCurrent, unitsReductionPerSecurity, portfolio );
        valueAdjustmentsPerSecurity = getValueAdjustmentsPerSecurity( valuePerSecurityCurrent, valuePerSecurityTotal );
        let unitsAdjustmentsPerSecurityAndExtraCash = getUnitsForAdjusting(valueAdjustmentsPerSecurity, portfolio);
        unitsAdjustmentsPerSecurity = unitsAdjustmentsPerSecurityAndExtraCash.unitsAdjustmentsPerSecurity;
      }
      return {
        portfolio,
        cashStillMissing,
        balanceByInvesting: unitsAdditionPerSecurity,
        balanceByDisvesting: unitsReductionPerSecurity,
        balanceByAdjusting: unitsAdjustmentsPerSecurity
      };
    default:
      return state;
  }
};

const modelPortfolioReducer = combineReducers( {
  investmentSteps
} );

export default modelPortfolioReducer;
