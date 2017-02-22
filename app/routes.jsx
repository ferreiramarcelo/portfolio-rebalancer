import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { fetchPortfolioRebalancerData } from './fetch-data';
import { App, PortfolioRebalancer, About, Authentication } from './pages';

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

  return (
    <Route path="/" component={App}>
      <IndexRoute component={PortfolioRebalancer} fetchData={fetchPortfolioRebalancerData} />
      <Route path="login" component={Authentication} onEnter={redirectAuth} />
      <Route path="about" component={About} />
    </Route>
    );
};
