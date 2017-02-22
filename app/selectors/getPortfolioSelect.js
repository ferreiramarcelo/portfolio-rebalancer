import { createSelector } from 'reselect';

const getModelPortfolios = (state) => state.modelPortfolio.modelPortfolios;
const getEmail = (state) => state.user.email;
const getPortfolio = (state) => state.portfolio;
const getAuthenticated = (state) => state.user.authenticated;
const getInvestmentAmount = (state) => state.investmentAmount.investmentAmount;

const getSelectedModelPortfolioSelect = function getSelectedModelPortfolioSelectFunc(selectedModelPortfolio, modelPortfolios, email) {
  let valid = true;
  let hintText = '';
  let errorText = '';
  if (!selectedModelPortfolio.name) {
    valid = false;
    errorText = 'Required';
  }
  for (let modelPortfolio of modelPortfolios) {
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
}

const getSymbolSelect = function getSymbolSelectFunc(symbol) {
  let valid = true;
  let hintText = '';
  let errorText = '';
  if (!symbol.value) {
    valid = false;
    errorText = 'Required';
  }
  if (!symbol.setOnce) {
    hintText = 'AAPL';
  }
  return {
    valid,
    hintText,
    errorText
  };
};

const getAllocationSelect = function getAllocationSelectFunc(allocation) {
  let valid = true;
  const number = Number(allocation.value);
  let hintText = '';
  let errorText = '';
  if (!allocation.value && number !== 0) {
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
  if (!allocation.setOnce) {
    hintText = '0';
  }
  return {
    valid,
    number,
    hintText,
    errorText
  };
};

const getPriceSelect = function getPriceSelectFunc(price) {
  let valid = true;
  const number = Number(price.value);
  let hintText = '';
  let errorText = '';
  if (!price.value && number !== 0) {
    errorText = 'Required';
    valid = false;
  } else if (typeof number !== 'number' || isNaN(number) || !isFinite(number)) {
    errorText = 'Number required';
    valid = false;
  } else if (number < 0.01) {
    errorText = '0.01 minimum';
    valid = false;
  }
  if (!price.setOnce) {
    hintText = '1.00';
  }
  return {
    valid,
    number,
    hintText,
    errorText
  };
};

const getUnitsSelect = function getUnitsSelectFunc(units) {
  let valid = true;
  const number = Number(units.value);
  let hintText = '';
  let errorText = '';
  if (!units.value && number !== 0) {
    errorText = 'Required';
    valid = false;
  } else if (typeof number !== 'number' || isNaN(number) || !isFinite(number)) {
    errorText = 'Number required';
    valid = false;
  } else if (number < 0) {
    errorText = '0 minimum';
    valid = false;
  }
  if (!units.setOnce) {
    hintText = '0';
  }
  return {
    valid,
    number,
    hintText,
    errorText
  };
};

const getSecuritySelect = function getSecuritySelectFunc(security) {
  return {
    symbolSelect: getSymbolSelect(security.symbol),
    allocationSelect: getAllocationSelect(security.allocation),
    priceSelect: getPriceSelect(security.price),
    unitsSelect: getUnitsSelect(security.units)
  };
};

const getSecuritiesSelect = function getSecuritiesSelectFunc(portfolio) {
  const securitiesSelect = [];
  for (const security of portfolio) {
    securitiesSelect.push(getSecuritySelect(security));
  }
  return securitiesSelect;
};

const getSecuritiesAreValid = function getSecuritiesAreValidFunc(securitiesSelect) {
  for (const securitySelect of securitiesSelect) {
    if (!securitySelect.symbolSelect.valid || !securitySelect.allocationSelect.valid || !securitySelect.priceSelect.valid || !securitySelect.unitsSelect.valid) {
      return false;
    }
  }
  return true;
};

const getInvestmentAmountSelect = function getInvestmentAmountSelectFunc(investmentAmount) {
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
  if (!investmentAmount.setOnce) {
    hintText = '0';
  }
  return {
    valid,
    number,
    hintText,
    errorText
  };
  return true;
};

const getSaveModelPortfolioButtonSelect = function getSaveModelPortfolioButtonSelectFunc(authenticated, selectedModelPortfolioSelect, securitiesAreValid) {
  let visibility = 'hidden';
  let tooltip = '';
  if (!authenticated) {
    visibility = 'disabled';
    tooltip = 'Log in to save';
  }
  else if (!selectedModelPortfolioSelect.valid) {
    visibility = 'disabled';
    tooltip = 'Invalid model portfolio name';
  }
  else if (!securitiesAreValid) {
    visibility = 'disabled';
    tooltip = 'Invalid securities';
  }
  else {
    visibility = 'visible';
    tooltip = 'Save';
  }
  return {visibility, tooltip};
};

const getDeleteModelPortfolioButtonVisibility = function getDeleteModelPortfolioButtonVisibilityFunc(authenticated, selectedModelPortfolio) {
  if (!authenticated) {
    return 'hidden';
  }
  if (!selectedModelPortfolio.email) {
    return 'disabled';
  }
  return 'visible';
};

const getGenerateStepsButtonVisibility = function getGenerateStepsButtonVisibilityFunc(investmentAmountSelect, securitiesAreValid) {
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
