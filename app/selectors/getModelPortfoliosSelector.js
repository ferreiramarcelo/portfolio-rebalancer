/* eslint no-useless-escape: 0*/
import { createSelector } from 'reselect';
const getModelPortfolios = (state) => state.modelPortfolio.modelPortfolios;
const getEmail = (state) => state.user.email;

const getDefaultAndUserModelPortfolios = function getDefaultAndUserModelPortfolios(modelPortfolios, email) {
  const defaultModelPortfolios = [];
  const userModelPortfolios = [];
  for (const modelPortfolio of modelPortfolios) {
    if (modelPortfolio.email === email) {
      userModelPortfolios.push(modelPortfolio);
    } else if (!modelPortfolio.email) {
      defaultModelPortfolios.push(modelPortfolio);
    }
  }
  return {defaultModelPortfolios, userModelPortfolios};
};

const getDisplayModelPortfolios = function getDisplayModelPortfolios(modelPortfolios, email) {
  const defaultModelPortfolios = [];
  const userModelPortfolios = [];
  for (const modelPortfolio of modelPortfolios) {
    if (modelPortfolio.email === email) {
      userModelPortfolios.push(modelPortfolio);
    } else if (!modelPortfolio.email) {
      defaultModelPortfolios.push(modelPortfolio);
    }
  }
  return {defaultModelPortfolios, userModelPortfolios};
};

export const getModelPortfoliosSelector = createSelector([
  getModelPortfolios,
  getEmail
], (modelPortfolios, email) => {
  const defaultAndUserModelPortfolios = getDefaultAndUserModelPortfolios(modelPortfolios, email);
  return {
    defaultModelPortfolios: defaultAndUserModelPortfolios.defaultModelPortfolios,
    userModelPortfolios: defaultAndUserModelPortfolios.userModelPortfolios,
  };
});
