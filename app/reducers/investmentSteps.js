import { combineReducers } from 'redux';
import * as types from '../types';
import { getValuesForInvesting, getValuesForDisvesting, getUpdatedValuePerSecurityArray,
 getValueAdjustmentsNeededPerSecurity, getUnitsForValuePerSecurity } from '../algorithms/InvestmentStepsAlgorithms';

const investmentSteps = (
  state = {},
  action
) => {
    switch (action.type) {
        case types.GENERATE_STEPS:			
			var portfolio = action.portfolio;
            var investmentAmount = Number(action.investmentAmount.value);
			var equityFromPortfolio = 0;
            for (var security of portfolio) {
                equityFromPortfolio += security.price.number * security.units.number;
            }
			var totalEquity = investmentAmount + equityFromPortfolio;
			
            var valuePerSecurityCurrent = [];
            for (var security of portfolio) {
                valuePerSecurityCurrent.push(security.price.number * security.units.number);
            }
            var valuePerSecurityTotal = [];
            for (var security of portfolio) {
                valuePerSecurityTotal.push(security.allocation.number / 100 * totalEquity)
            }
			if (totalEquity < 0) {
				//Sell everything, still missing X amount
				var cashStillMissing = -1 * investmentAmount - equityFromPortfolio;
			}
			else if (investmentAmount == 0) {
				var valueAdjustmentNeededPerSecurity = getValueAdjustmentsNeededPerSecurity(valuePerSecurityCurrent, valuePerSecurityTotal);
				var unitsAdjustmentsNeededPerSecurity = getUnitsForValuePerSecurity(valueAdjustmentNeededPerSecurity, portfolio);
			}
			else if (investmentAmount > 0) {
				//Balance by investing, sell and buy to balance
				//Get value arrays
				var valueAdditionPerSecurity = getValuesForInvesting(investmentAmount, valuePerSecurityCurrent, valuePerSecurityTotal);
				var unitsAdditionPerSecurity = getUnitsForValuePerSecurity(valueAdditionPerSecurity, portfolio);
				valuePerSecurityCurrent = getUpdatedValuePerSecurityArray(valuePerSecurityCurrent, valueAdditionPerSecurity);
				var valueAdjustmentNeededPerSecurity = getValueAdjustmentsNeededPerSecurity(valuePerSecurityCurrent, valuePerSecurityTotal);
				var unitsAdjustmentsNeededPerSecurity = getUnitsForValuePerSecurity(valueAdjustmentNeededPerSecurity, portfolio);
			}
			else if (investmentAmount < 0 ) {
				//Balance by selling, sell and buy to balance
				var valueReductionPerSecurity = getValuesForDisvesting(investmentAmount, valuePerSecurityCurrent, valuePerSecurityTotal);
				var unitsReductionPerSecurity = getUnitsForValuePerSecurity(valueReductionPerSecurity, portfolio);
				valuePerSecurityCurrent = getUpdatedValuePerSecurityArray(valuePerSecurityCurrent, valueReductionPerSecurity);
				var valueAdjustmentNeededPerSecurity = getValueAdjustmentsNeededPerSecurity(valuePerSecurityCurrent, valuePerSecurityTotal);
				var unitsAdjustmentsNeededPerSecurity = getUnitsForValuePerSecurity(valueAdjustmentNeededPerSecurity, portfolio);
			}
			//Convert values to units
			
			
            return {cashStillMissing: cashStillMissing,
						balanceByInvesting: unitsAdditionPerSecurity,
						balanceByTakingOut: unitsReductionPerSecurity,
						balanceByTakingOutAndInvesting: unitsAdjustmentsNeededPerSecurity};
        default:
            return state;
    }
};

const topicReducer = combineReducers({
  investmentSteps
});

export default topicReducer;
