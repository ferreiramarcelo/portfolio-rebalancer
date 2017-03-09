import { createSelector } from 'reselect';

const getModelPortfolios = (state) => state.modelPortfolio.modelPortfolios;
const getEmail = (state) => state.user.email;
const getPortfolio = (state) => state.portfolio;
const getAuthenticated = (state) => state.user.authenticated;
const getInvestmentAmount = (state) => state.investmentAmount.investmentAmount;

const getSelectedModelPortfolioSelect = function getSelectedModelPortfolioSelect(selectedModelPortfolio, modelPortfolios, email) {
  let valid = true;
  const hintText = '';
  let errorText = '';
  if (!selectedModelPortfolio.name) {
    valid = false;
    errorText = 'Required';
  }
  for (const modelPortfolio of modelPortfolios) {
    if (modelPortfolio.email === email && modelPortfolio.name === selectedModelPortfolio.name && modelPortfolio.id !== selectedModelPortfolio.id) {
      valid = false;
      errorText = 'Name already in use';
    }
  }
  return {
    valid,
    hintText,
    errorText
  };
};

const getSymbolSelect = function getSymbolSelect(symbol) {
  let valid = true;
  let hintText = '';
  let errorText = '';
  if (!symbol.value && symbol.value !== '0') {
    valid = false;
    errorText = 'Required';
  }
  if (!symbol.dirty) {
    hintText = 'AAPL';
  }
  return {
    valid,
    hintText,
    errorText
  };
};

const getAllocationSelect = function getAllocationSelect(allocation) {
  let valid = true;
  const number = Number(allocation.value);
  let hintText = '';
  let errorText = '';
  if (!allocation.value && allocation.value !== '0') {
    errorText = 'Required';
    valid = false;
  } else if (typeof number !== 'number' || isNaN(number) || !isFinite(number)) {
    errorText = 'Number required';
    valid = false;
  } else if (number < 0) {
    errorText = '0 minimum';
    valid = false;
  } else if (number > 100) {
    errorText = '100 maximum';
    valid = false;
  }
  if (!allocation.dirty) {
    hintText = '0';
  }
  return {
    valid,
    number,
    hintText,
    errorText
  };
};

const getPriceSelect = function getPriceSelect(price) {
  let valid = true;
  const number = Number(price.value);
  let hintText = '';
  let errorText = '';
  if (!price.value && price.value !== '0') {
    errorText = 'Required';
    valid = false;
  } else if (typeof number !== 'number' || isNaN(number) || !isFinite(number)) {
    errorText = 'Number required';
    valid = false;
  } else if (number < 0.01) {
    errorText = '0.01 minimum';
    valid = false;
  }
  if (!price.dirty) {
    hintText = '1.00';
  }
  return {
    valid,
    number,
    hintText,
    errorText
  };
};

const getUnitsSelect = function getUnitsSelect(units) {
  let valid = true;
  const number = Number(units.value);
  let hintText = '';
  let errorText = '';
  if (!units.value && units.value !== '0') {
    errorText = 'Required';
    valid = false;
  } else if (typeof number !== 'number' || isNaN(number) || !isFinite(number)) {
    errorText = 'Number required';
    valid = false;
  } else if (number < 0) {
    errorText = '0 minimum';
    valid = false;
  }
  if (!units.dirty) {
    hintText = '0';
  }
  return {
    valid,
    number,
    hintText,
    errorText
  };
};

const getSecuritySelect = function getSecuritySelect(security) {
  return {
    symbolSelect: getSymbolSelect(security.symbol),
    allocationSelect: getAllocationSelect(security.allocation),
    priceSelect: getPriceSelect(security.price),
    unitsSelect: getUnitsSelect(security.units)
  };
};

const getSecuritiesSelect = function getSecuritiesSelect(portfolio) {
  const securitiesSelect = [];
  for (const security of portfolio) {
    securitiesSelect.push(getSecuritySelect(security));
  }
  return securitiesSelect;
};

const getSecuritiesAreValid = function getSecuritiesAreValid(securitiesSelect) {
  if (securitiesSelect.length < 1) {
    return false;
  }
  for (const securitySelect of securitiesSelect) {
    if (!securitySelect.symbolSelect.valid || !securitySelect.allocationSelect.valid || !securitySelect.priceSelect.valid || !securitySelect.unitsSelect.valid) {
      return false;
    }
  }
  return true;
};

const getInvestmentAmountSelect = function getInvestmentAmountSelect(investmentAmount) {
  let valid = true;
  const number = Number(investmentAmount.value);
  let hintText = '';
  let errorText = '';
  if (investmentAmount.value === '') {
      errorText = 'Required';
      valid = false;
  } else if (typeof number !== 'number' || isNaN(number) || !isFinite(number)) {
      errorText = 'Number required';
      valid = false;
  }
  if (!investmentAmount.dirty) {
    hintText = '0';
  }
  return {
    valid,
    number,
    hintText,
    errorText
  };
};

const getSaveModelPortfolioButtonSelect = function getSaveModelPortfolioButtonSelect(authenticated, selectedModelPortfolioSelect, securitiesAreValid) {
  let visibility = 'hidden';
  let tooltip = '';
  if (!authenticated) {
    visibility = 'disabled';
    tooltip = 'Log in to save';
  } else if (!selectedModelPortfolioSelect.valid) {
    visibility = 'disabled';
    tooltip = 'Invalid model portfolio name';
  } else if (!securitiesAreValid) {
    visibility = 'disabled';
    tooltip = 'Invalid securities';
  } else {
    visibility = 'visible';
    tooltip = 'Save';
  }
  return {visibility, tooltip};
};

const getDeleteModelPortfolioButtonVisibility = function getDeleteModelPortfolioButtonVisibility(authenticated, selectedModelPortfolio) {
  if (!authenticated) {
    return 'hidden';
  }
  if (!selectedModelPortfolio.email) {
    return 'disabled';
  }
  return 'visible';
};

const getGenerateStepsButtonVisibility = function getGenerateStepsButtonVisibility(investmentAmountSelect, securitiesAreValid) {
  if (!investmentAmountSelect.valid || !securitiesAreValid) {
    return 'disabled';
  }
  return 'visible';
};


export const getPortfolioSelect = createSelector([
  getModelPortfolios,
  getEmail,
  getPortfolio,
  getAuthenticated,
  getInvestmentAmount
], (modelPortfolios, email, portfolio, authenticated, investmentAmount) => {
  const selectedModelPortfolioSelect = getSelectedModelPortfolioSelect(portfolio.selectedModelPortfolio, modelPortfolios, email);
  const securitiesSelect = getSecuritiesSelect(portfolio.portfolio);
  const securitiesAreValid = getSecuritiesAreValid(securitiesSelect);
  const investmentAmountSelect = getInvestmentAmountSelect(investmentAmount);
  const saveModelPortfolioButtonSelect = getSaveModelPortfolioButtonSelect(authenticated, selectedModelPortfolioSelect, securitiesAreValid);
  const deleteModelPortfolioButtonVisibility = getDeleteModelPortfolioButtonVisibility(authenticated, portfolio.selectedModelPortfolio);
  const generateStepsButtonVisibility = getGenerateStepsButtonVisibility(investmentAmountSelect, securitiesAreValid);
  return {
    selectedModelPortfolioSelect,
    securitiesSelect,
    investmentAmountSelect,
    saveModelPortfolioButtonSelect,
    deleteModelPortfolioButtonVisibility,
    generateStepsButtonVisibility
  };
});
