import { ENV } from '../../config/appConfig';
import dotenv from 'dotenv';

let dbURI = '';
if (ENV === 'production') {
  dbURI = 'mongodb://' + process.env.PORTFOLIO_REBALANCER_USERNAME + ':' + process.env.PORTFOLIO_REBALANCER_PASSWORD + process.env.MONGODB_URI;
} else {
  dotenv.load();
  dbURI = 'mongodb://' + process.env.PORTFOLIO_REBALANCER_USERNAME_DEV + ':' + process.env.PORTFOLIO_REBALANCER_PASSWORD_DEV + process.env.MONGODB_URI_DEV;
}
export const db = dbURI;

export default {
  db
};
