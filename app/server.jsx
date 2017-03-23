import axios from 'axios';
import { createMemoryHistory, match } from 'react-router';
import createRoutes from './routes';
import configureStore from './store/configureStore';
import * as types from './types';
import preRenderMiddleware from './middlewares/preRenderMiddleware';
import { host, port } from './config/app';
import pageRenderer from './utils/pageRenderer';
import * as constants from './constants';

axios.defaults.baseURL = `http://${host}:${port}`;

export default function render(req, res) {
  const authenticated = req.isAuthenticated();
  const history = createMemoryHistory();
  var email = '';
  let verified = false;
  let accountType = constants.ACCOUNT_TYPE_INTERNAL;
  if (req.user) {
    email = req.user.email;
    verified = req.user.verified;
    if (req.user.google) {
      accountType = constants.ACCOUNT_TYPE_GOOGLE;
    }
  }

  const store = configureStore({
    user: {
      authenticated,
      verified,
      message: '',
      email,
      accountType
    }
  }, history);
  const routes = createRoutes(store);

  match({
    routes,
    location: req.url
  }, (err, redirect, props) => {
    if (err) {
      res.status(500).json(err);
    } else if (redirect) {
      res.redirect(302, redirect.pathname + redirect.search);
    } else if (props) {
      store.dispatch({
        type: types.CREATE_REQUEST
      });
      preRenderMiddleware(props)
        .then(data => {
          store.dispatch({
            type: types.REQUEST_SUCCESS,
            data,
            email
          });
          const html = pageRenderer(store, props);
          res.status(200).send(html);
        })
        .catch(caughtError => {
          console.error(caughtError);
          res.status(500).json(caughtError);
        });
    } else {
      res.sendStatus(404);
    }
  });
}
