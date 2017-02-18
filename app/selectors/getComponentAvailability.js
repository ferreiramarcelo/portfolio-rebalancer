import { createSelector } from 'reselect';

const getSelectedModelPortfolio = (state) => state.modelPortfolio.selectedModelPortfolio;
const getPortfolio = (state) => state.modelPortfolio.portfolio;
const getInvestmentAmount = (state) => state.investmentAmount.investmentAmount;
const getAuthenticated = (state) => state.user.authenticated;

const getSaveModelPortfolioButtonVisibility = (authenticated, selectedModelPortfolio, portfolio) => {
  if (!authenticated) {
    return 'hidden';
  }
  if (selectedModelPortfolio.valid === 0) {
    return 'disabled';
  }
  for (const security of portfolio) {
    if (security.symbol.valid === 0 || security.allocation.valid === 0) {
      return 'disabled';
    }
  }
  return 'visible';
};

const getDeleteModelPortfolioButtonVisibility = (authenticated, selectedModelPortfolio, portfolio) => {
  if (!authenticated) {
    return 'hidden';
  }
  if (!selectedModelPortfolio.email) {
    return 'disabled';
  }
  for (const security of portfolio) {
    if (security.symbol.valid === 0 || security.allocation.valid === 0) {
      return 'disabled';
    }
  }
  return 'visible';
};

const getGenerateStepsButtonVisibility = (investmentAmount, portfolio) => {
  if (investmentAmount.valid === 0) {
    return 'disabled';
  }
  for (const security of portfolio) {
    if (security.price.valid === 0 || security.units.valid === 0) {
      return 'disabled';
    }
  }
  return 'visible';
};

export default getComponentAvailability = createSelector([
  getSelectedModelPortfolio,
  getPortfolio,
  getInvestmentAmount,
  getAuthenticated
], (selectedModelPortfolio, portfolio, investmentAmount, authenticated) => {
  const saveModelPortfolioButtonVisibility = getSaveModelPortfolioButtonVisibility(authenticated, selectedModelPortfolio, portfolio);
  const deleteModelPortfolioButtonVisibility = getDeleteModelPortfolioButtonVisibility(authenticated, selectedModelPortfolio, portfolio);
  const generateStepsButtonVisibility = getGenerateStepsButtonVisibility(investmentAmount, portfolio);
  return {
    saveModelPortfolioButtonVisibility,
    deleteModelPortfolioButtonVisibility,
    generateStepsButtonVisibility
  };
});
