import { ENV } from '../../config/appConfig';
import dotenv from 'dotenv';

var dbURI = '';
if (ENV === 'production') {
  dbURI = 'mongodb://' + process.env.PORTFOLIO_REBALANCER_USERNAME + ':' + process.env.PORTFOLIO_REBALANCER_PASSWORD + process.env.MONGODB_URI;
}
else {
  dotenv.load();
  //import { ENV } from '../../../config/appConfig';
  console.log("USERNAME" + process.env.PORTFOLIO_REBALANCER_USERNAME_DEV );
  dbURI = 'mongodb://' + process.env.PORTFOLIO_REBALANCER_USERNAME_DEV + ':' + process.env.PORTFOLIO_REBALANCER_PASSWORD_DEV + process.env.MONGODB_URI_DEV;
  //dbURI = 'mongodb://alsoeasierrailroadstone:eachlittlealsostop@ds153669.mlab.com:53669/portfolio-rebalancer';
}
export const db = dbURI;

export default {
  db
};
