import { createSelector } from 'reselect';

const getSelectedModelPortfolio = (state) => state.topic.selectedModelPortfolio;
const getPortfolio = (state) => state.topic.portfolio;
const getInvestmentAmount = (state) => state.investmentAmount.investmentAmount;
const getAuthenticated = (state) => state.user.authenticated;

const getSaveModelPortfolioButtonVisibility = (authenticated, selectedModelPortfolio, portfolio) => {
  if ( !authenticated ) {
    return 'hidden';
  }
  if ( selectedModelPortfolio.valid === 0 ) {
    return 'disabled';
  }
  for (var security of portfolio) {
    if ( security.ticker.valid === 0 || security.allocation.valid === 0 ) {
      return 'disabled';
    }
  }
  return 'visible';
}

const getDeleteModelPortfolioButtonVisibility = (authenticated, selectedModelPortfolio, portfolio) => {
  if ( !authenticated ) {
    return 'hidden';
  }
  if ( !selectedModelPortfolio.email ) {
    return 'disabled';
  }
  for (var security of portfolio) {
    if ( security.ticker.valid === 0 || security.allocation.valid === 0 ) {
      return 'disabled';
    }
  }
  return 'visible';
}

const getGenerateStepsButtonVisibility = (investmentAmount, portfolio) => {
  if ( investmentAmount.valid === 0 ) {
    return 'disabled';
  }
  for (var security of portfolio) {
    if ( security.price.valid === 0 || security.units.valid === 0 ) {
      return 'disabled';
    }
  }
  return 'visible';
}

export const getComponentAvailability = createSelector( [
  getSelectedModelPortfolio,
  getPortfolio,
  getInvestmentAmount,
  getAuthenticated
], (selectedModelPortfolio, portfolio, investmentAmount, authenticated) => {
  let saveModelPortfolioButtonVisibility = getSaveModelPortfolioButtonVisibility( authenticated, selectedModelPortfolio, portfolio );
  let deleteModelPortfolioButtonVisibility = getDeleteModelPortfolioButtonVisibility( authenticated, selectedModelPortfolio, portfolio );
  let generateStepsButtonVisibility = getGenerateStepsButtonVisibility( investmentAmount, portfolio );
  return {
    saveModelPortfolioButtonVisibility,
    deleteModelPortfolioButtonVisibility,
    generateStepsButtonVisibility
  };
} );
