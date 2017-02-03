import {createSelector} from 'reselect';

const getSelectedModelPortfolio = (state) => state.topic.selectedModelPortfolio;
const getPortfolio = (state) => state.topic.portfolio;
const getInvestmentAmount = (state) => state.investmentAmount.investmentAmount;

export const getComponentAvailability = createSelector([
    getSelectedModelPortfolio, getPortfolio, getInvestmentAmount
], (selectedModelPortfolio, portfolio, investmentAmount) => {
    var saveModelPortfolioButtonIsDisabled = false;
    var deleteModelPortfolioButtonisDisabled = false;
    var generateStepsButtonIsDisabled = false;

    if (investmentAmount.valid === 0) {
			generateStepsButtonIsDisabled = true;
		}
		for (var security of portfolio) {
			if (security.ticker.valid === 0 || security.allocation.valid === 0) {
        saveModelPortfolioButtonIsDisabled = true;
        generateStepsButtonIsDisabled = true;
			}
      else if (security.price.valid === 0 || security.units.valid === 0) {
        generateStepsButtonIsDisabled = true;

      }
      if (!selectedModelPortfolio.email) {
        deleteModelPortfolioButtonisDisabled = true;
      }
      if (selectedModelPortfolio.valid === 0) {
        saveModelPortfolioButtonIsDisabled = true;
      }
		}
		return {saveModelPortfolioButtonIsDisabled: saveModelPortfolioButtonIsDisabled, generateStepsButtonIsDisabled: generateStepsButtonIsDisabled, deleteModelPortfolioButtonisDisabled: deleteModelPortfolioButtonisDisabled };
});
