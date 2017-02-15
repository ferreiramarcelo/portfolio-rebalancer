import axios from 'axios';

const service = {
  getModelPortfolios: () => axios.get('/modelPortfolio')
};

export default service;
