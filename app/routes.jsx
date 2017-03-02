import React from 'react';
import { Route, IndexRoute } from 'react-router';
import FetchData from './fetch-data';
import { App, PortfolioRebalancer, About, Authentication } from './pages';
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
    //verify();
    console.log("hehexd");
    store.dispatch(verify(nextState.params.token));
    callback();
  };

  return (
    <Route path="/" component={App}>
      <IndexRoute component={PortfolioRebalancer} fetchData={FetchData.fetchPortfolioRebalancerData} />
      <Route path="/login" component={Authentication} onEnter={redirectAuth} />
      <Route path="/verify/:token" component={PortfolioRebalancer} onEnter={onEnterVerify} />
      <Route path="/about" component={About} />
    </Route>
    );
};
