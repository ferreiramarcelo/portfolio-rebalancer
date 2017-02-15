export const db = 'mongodb://' + process.env.PORTFOLIO_REBALANCER_USERNAME + ':' + process.env.PORTFOLIO_REBALANCER_PASSWORD + process.env.MONGODB_URI;

export default {
  db
};
