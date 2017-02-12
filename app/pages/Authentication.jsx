import React, { Component } from 'react';
import Page from '../pages/Page';
import AuthenticationContainer from '../containers/Authentication';

class Authentication extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Log In | Portfolio Rebalancer';
  }

  pageMeta() {
    return [
      {
        name: 'description',
        content: 'Log into Portfolio Rebalancer'
      },
      {
        name: 'keywords',
        content: 'portfolio, rebalance, rebalancer, stocks, securities, security, finance, investment, log in, sign in, register, sign up, google, oauth'
      },
      {
        name: 'author',
        content: 'Alexis Deschamps'
      },
    ];
  }

  pageLink() {
    return [];
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        <AuthenticationContainer {...this.props} />
      </Page>
      );
  }
}

export default Authentication;
