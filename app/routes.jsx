import React from 'react';
import { Route, IndexRoute } from 'react-router';
import FetchData from './fetch-data';
import { App, PortfolioRebalancer, About, Authentication, Register } from './pages';
import { verify } from './actions/users';

export default (store) => {
  const redirectAuth = (nextState, replace, callback) => {
    const {user: {authenticated}} = store.getState();
    if (authenticated) {
      replace({
        pathname: '/'
      });
    }
    callback();
  };

  const onEnterVerify = (nextState, replace, callback) => {
    store.dispatch(verify(nextState.params.token));
    callback();
  };

  const onEnterGithub = (nextState, replace, callback) => {
    location.href = "https://github.com/AlexisDeschamps/portfolio-rebalancer/";
    callback();
  };

  return (
    <Route path="/" component={App}>
      <IndexRoute component={PortfolioRebalancer} fetchData={FetchData.fetchPortfolioRebalancerData} />
      <Route path="/login" component={Authentication} onEnter={redirectAuth} />
      <Route path="/register" component={Register} onEnter={redirectAuth} />
      <Route path="/verify/:token" component={PortfolioRebalancer} onEnter={onEnterVerify} />
      <Route path="/about" component={About} />
    </Route>
    );
};
