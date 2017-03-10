import React from 'react';
import { Route, IndexRoute } from 'react-router';
import FetchData from './fetch-data';
import { App, PortfolioRebalancer, About, Authentication, Register, Account, ResetPassword, Loading } from './pages';
import { verify, isPasswordResetTokenValid } from './actions/users';

export default (store) => {
  const redirectIfAuthenticated = (nextState, replace, callback) => {
    const {user: {authenticated}} = store.getState();
    if (authenticated) {
      replace({
        pathname: '/'
      });
    }
    callback();
  };

  const redirectIfNotAuthenticated = (nextState, replace, callback) => {
    const {user: {authenticated}} = store.getState();
    if (!authenticated) {
      replace({
        pathname: '/'
      });
    }
    callback();
  };

  const onEnterVerify = (nextState, replace) => {
    store.dispatch(verify(nextState.params.token));
  };

  const onEnterGithub = (nextState, replace) => {
    location.href = 'https://github.com/AlexisDeschamps/portfolio-rebalancer/';
  };

  const onEnterReset = (nextState, replace) => {
    store.dispatch(isPasswordResetTokenValid(nextState.params.token));

    // Check database to see if token is valid
    // Present screen for password reset
    // Reset password
  };

  return (
    <Route path="/" component={App}>
      <IndexRoute component={PortfolioRebalancer} fetchData={FetchData.fetchPortfolioRebalancerData} />
      <Route path="/about" component={About} />
      <Route path="/login" component={Authentication} onEnter={redirectIfAuthenticated} />
      <Route path="/register" component={Register} onEnter={redirectIfAuthenticated} />
      <Route path="/account" component={Account} onEnter={redirectIfNotAuthenticated} />
      <Route path="/verify/:token" component={PortfolioRebalancer} onEnter={onEnterVerify} />
      <Route path="/reset/:token" component={ResetPassword} onEnter={onEnterReset} />
    </Route>
    );
};
