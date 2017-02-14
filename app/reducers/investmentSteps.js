import { combineReducers } from 'redux';
import * as types from '../types';
import { getPortfolioWithNormalizedAllocations, getValuesForInvesting, getValuesForDisvesting, getUpdatedValuePerSecurityArray, getValueAdjustmentsPerSecurity, getUnitsForValuePerSecurityAndExtraCash,
getUnitsForAdjusting } from '../algorithms/InvestmentStepsAlgorithms';

const investmentSteps = (state = {},
  action
) => {
  switch (action.type) {
    case types.GENERATE_STEPS:
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
      let valueAdjustmentsPerSecurity = [];
      let valueAdditionPerSecurity = [];
      let valueReductionPerSecurity = [];
      let unitsAdjustmentsPerSecurity = [];
      let unitsAdditionPerSecurity = [];
      let unitsReductionPerSecurity = [];
      let cashStillMissing = 0;
      let extraCash = 0;
      if ( totalEquity < 0 ) {
        //Sell everything, still missing X amount
        cashStillMissing = -1 * investmentAmount - equityFromPortfolio;
      }
      else if ( investmentAmount === 0 ) {
        valueAdjustmentsPerSecurity = getValueAdjustmentsPerSecurity( valuePerSecurityCurrent, valuePerSecurityTotal );
        let unitsAdjustmentsPerSecurityAndExtraCash = getUnitsForAdjusting(valueAdjustmentsPerSecurity, portfolio);
        unitsAdjustmentsPerSecurity = unitsAdjustmentsPerSecurityAndExtraCash.unitsAdjustmentsPerSecurity;
        //let unitsAdjustmentsPerSecurityAndExtraCash = getUnitsForValuePerSecurityAndExtraCash( valueAdjustmentsPerSecurity, portfolio );
        //unitsAdjustmentsPerSecurity = unitsAdjustmentsPerSecurityAndExtraCash.unitsForValuePerSecurity;
        //extraCash = unitsAdjustmentsPerSecurityAndExtraCash.extraCash;
        console.log("TEST");
      // Make a new array with every security that is Purchaseble at least once, repeat process
      // Go through array, using extra cash, buy one unit of each security
      }
      else if ( investmentAmount > 0 ) {
        //Balance by investing, sell and buy to balance
        valueAdditionPerSecurity = getValuesForInvesting( investmentAmount, valuePerSecurityCurrent, valuePerSecurityTotal );
        let unitsAdditionPerSecurityAndExtraCash = getUnitsForValuePerSecurityAndExtraCash( valueAdditionPerSecurity, portfolio );
        unitsAdditionPerSecurity = unitsAdditionPerSecurityAndExtraCash.unitsForValuePerSecurity;
        extraCash = unitsAdditionPerSecurityAndExtraCash.extraCash;

        valuePerSecurityCurrent = getUpdatedValuePerSecurityArray( valuePerSecurityCurrent, valueAdditionPerSecurity );
        valueAdjustmentsPerSecurity = getValueAdjustmentsPerSecurity( valuePerSecurityCurrent, valuePerSecurityTotal );
        let unitsAdjustmentsPerSecurityAndExtraCash = getUnitsForValuePerSecurityAndExtraCash( valueAdjustmentsPerSecurity, portfolio );
        unitsAdjustmentsPerSecurity = unitsAdjustmentsPerSecurityAndExtraCash.unitsForValuePerSecurity;
        extraCash = unitsAdjustmentsPerSecurityAndExtraCash.extraCash;
      }
      else if ( investmentAmount < 0 ) {
        //Balance by selling, sell and buy to balance
        valueReductionPerSecurity = getValuesForDisvesting( investmentAmount, valuePerSecurityCurrent, valuePerSecurityTotal );
        unitsReductionPerSecurity = getUnitsForValuePerSecurity( valueReductionPerSecurity, portfolio );
        valuePerSecurityCurrent = getUpdatedValuePerSecurityArray( valuePerSecurityCurrent, valueReductionPerSecurity );
        valueAdjustmentsPerSecurity = getValueAdjustmentsPerSecurity( valuePerSecurityCurrent, valuePerSecurityTotal );
        unitsAdjustmentsPerSecurity = getUnitsForValuePerSecurity( valueAdjustmentsPerSecurity, portfolio );
      }
      //Convert values to units
      // Get as close as possible to cash values


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

const topicReducer = combineReducers( {
  investmentSteps
} );

export default topicReducer;
