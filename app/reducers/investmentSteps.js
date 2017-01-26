import { combineReducers } from 'redux';
import * as types from '../types';
import { getBalanceByInvestingValues, getBalanceByTakingOutValues, getUpdatedValuePerSecurityArray, getValueDifferenPerSecurity } from '../algorithms/InvestmentStepsAlgorithms';

const investmentSteps = (
  state = {},
  action
) => {
    switch (action.type) {
        case types.GENERATE_STEPS:			
            var investmentAmount = Number(action.investmentAmount.value);
			var equityFromPortfolio = 0;
            for (var security of action.portfolio) {
                equityFromPortfolio += security.price.number * security.units.number;
            }
			var totalEquity = investmentAmount + equityFromPortfolio;
			
            var valuePerSecurityCurrent = [];
            for (var security of action.portfolio) {
                valuePerSecurityCurrent.push(security.price.number * security.units.number);
            }
            var valuePerSecurityTotal = [];
            for (var security of action.portfolio) {
                valuePerSecurityTotal.push(security.allocation.number / 100 * totalEquity)
            }
			if (totalEquity < 0) {
				//Sell everything, still missing X amount
				var cashStillMissing = -1 * investmentAmount - equityFromPortfolio;
			} 
			else if (investmentAmount > 0) {
				//Balance by investing, sell and buy to balance
				//Get value arrays
				var valueAdditionPerSecurity = getBalanceByInvestingValues(investmentAmount, valuePerSecurityCurrent, valuePerSecurityTotal);
				valuePerSecurityCurrent = getUpdatedValuePerSecurityArray(valuePerSecurityCurrent, valueAdditionPerSecurity);
				var valueDifferencePerSecurity = getValueDifferenPerSecurity(valuePerSecurityCurrent, valuePerSecurityTotal);
				//
			}
			else if (investmentAmount < 0 ) {
				//Balance by selling, sell and buy to balance
				var valueReductionPerSecurity = getBalanceByTakingOutValues(investmentAmount, valuePerSecurityCurrent, valuePerSecurityTotal);
				valuePerSecurityCurrent = getUpdatedValuePerSecurityArray(valuePerSecurityCurrent, valueReductionPerSecurity);
				var valueDifferencePerSecurity = getValueDifferenPerSecurity(valuePerSecurityCurrent, valuePerSecurityTotal);
			}			
            return {balanceWithCash: valueAdditionPerSecurity, balanceBySellingAndBuying: valueDifferencePerSecurity};
        default:
            return state;
    }
};

const topicReducer = combineReducers({
  investmentSteps
});

export default topicReducer;
