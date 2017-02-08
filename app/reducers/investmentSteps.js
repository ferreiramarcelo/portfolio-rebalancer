import { combineReducers } from 'redux';
import * as types from '../types';
import { getPortfolioWithNormalizedAllocations, getValuesForInvesting, getValuesForDisvesting, getUpdatedValuePerSecurityArray, getValueAdjustmentsNeededPerSecurity, getUnitsForValuePerSecurityAndExtraCash } from '../algorithms/InvestmentStepsAlgorithms';

const investmentSteps = (state = {},
  action
) => {
  switch (action.type) {
    case types.GENERATE_STEPS:
      let portfolio = action.portfolio;
      portfolio = getPortfolioWithNormalizedAllocations(portfolio);
      let investmentAmount = Number( action.investmentAmount.value );
      let equityFromPortfolio = 0;
      for (let security of portfolio) {
        equityFromPortfolio += security.price.number * security.units.number;
      }
      let totalEquity = investmentAmount + equityFromPortfolio;

      let valuePerSecurityCurrent = [];
      for (let security of portfolio) {
        valuePerSecurityCurrent.push( security.price.number * security.units.number );
      }
      let valuePerSecurityTotal = [];
      for (let security of portfolio) {
        valuePerSecurityTotal.push( security.allocation.number / 100 * totalEquity )
      }
      let valueAdjustmentNeededPerSecurity = [];
      let valueAdditionPerSecurity = [];
      let valueReductionPerSecurity = [];
      let unitsAdjustmentsNeededPerSecurity = [];
      let unitsAdditionPerSecurity = [];
      let unitsReductionPerSecurity = [];
      let cashStillMissing = 0;
      let extraCash = 0;
      if ( totalEquity < 0 ) {
        //Sell everything, still missing X amount
        cashStillMissing = -1 * investmentAmount - equityFromPortfolio;
      } else if ( investmentAmount === 0 ) {
        valueAdjustmentNeededPerSecurity = getValueAdjustmentsNeededPerSecurity( valuePerSecurityCurrent, valuePerSecurityTotal );
        let unitsAdjustmentsNeededPerSecurityAndExtraCash = getUnitsForValuePerSecurityAndExtraCash( valueAdjustmentNeededPerSecurity, portfolio );
        unitsAdjustmentsNeededPerSecurity = unitsAdjustmentsNeededPerSecurityAndExtraCash.unitsForValuePerSecurity;
        extraCash = unitsAdjustmentsNeededPerSecurityAndExtraCash.extraCash;
        // Make a new array with every security that is Purchaseble at least once, repeat process
        // Go through array, using extra cash, buy one unit of each security
      } else if ( investmentAmount > 0 ) {
        //Balance by investing, sell and buy to balance
        valueAdditionPerSecurity = getValuesForInvesting( investmentAmount, valuePerSecurityCurrent, valuePerSecurityTotal );
        let unitsAdditionPerSecurityAndExtraCash = getUnitsForValuePerSecurityAndExtraCash( valueAdditionPerSecurity, portfolio );
        unitsAdditionPerSecurity = unitsAdditionPerSecurityAndExtraCash.unitsForValuePerSecurity;
        extraCash = unitsAdditionPerSecurityAndExtraCash.extraCash;

        valuePerSecurityCurrent = getUpdatedValuePerSecurityArray( valuePerSecurityCurrent, valueAdditionPerSecurity );
        valueAdjustmentNeededPerSecurity = getValueAdjustmentsNeededPerSecurity( valuePerSecurityCurrent, valuePerSecurityTotal );
        let unitsAdjustmentsNeededPerSecurityAndExtraCash = getUnitsForValuePerSecurityAndExtraCash( valueAdjustmentNeededPerSecurity, portfolio );
        unitsAdjustmentsNeededPerSecurity = unitsAdjustmentsNeededPerSecurityAndExtraCash.unitsForValuePerSecurity;
        extraCash = unitsAdjustmentsNeededPerSecurityAndExtraCash.extraCash;
      } else if ( investmentAmount < 0 ) {
        //Balance by selling, sell and buy to balance
        valueReductionPerSecurity = getValuesForDisvesting( investmentAmount, valuePerSecurityCurrent, valuePerSecurityTotal );
        unitsReductionPerSecurity = getUnitsForValuePerSecurity( valueReductionPerSecurity, portfolio );
        valuePerSecurityCurrent = getUpdatedValuePerSecurityArray( valuePerSecurityCurrent, valueReductionPerSecurity );
        valueAdjustmentNeededPerSecurity = getValueAdjustmentsNeededPerSecurity( valuePerSecurityCurrent, valuePerSecurityTotal );
        unitsAdjustmentsNeededPerSecurity = getUnitsForValuePerSecurity( valueAdjustmentNeededPerSecurity, portfolio );
      }
      //Convert values to units
      // Get as close as possible to cash values


      return {
        cashStillMissing: cashStillMissing,
        balanceByInvesting: unitsAdditionPerSecurity,
        balanceByTakingOut: unitsReductionPerSecurity,
        balanceByTakingOutAndInvesting: unitsAdjustmentsNeededPerSecurity
      };
    default:
      return state;
  }
};

const topicReducer = combineReducers( {
  investmentSteps
} );

export default topicReducer;
