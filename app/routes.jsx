import React from 'react';
import { Route, IndexRoute } from 'react-router';
import FetchData from './fetch-data';
import { App, PortfolioRebalancer, About, Authentication, Register, Account, ResetPassword } from './pages';
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

  const onEnterVerify = (nextState) => {
    store.dispatch(verify(nextState.params.token));
  };

  const onEnterGithub = (nextState) => {
    location.href = 'https://github.com/AlexisDeschamps/portfolio-rebalancer/';
  };

  const onEnterReset = (nextState) => {
    store.dispatch(isPasswordResetTokenValid(nextState.params.token));
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
