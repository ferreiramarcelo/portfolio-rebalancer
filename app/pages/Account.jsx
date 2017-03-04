import React, { Component } from 'react';
import Page from '../pages/Page';
import AccountContainer from '../containers/Account';

class Account extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Account | Portfolio Rebalancer';
  }

  pageMeta() {
    return [
      {
        name: 'description',
        content: 'View account infofor Portfolio Rebalancer'
      },
      {
        name: 'keywords',
        content: 'portfolio, rebalance, rebalancer, stocks, securities, security, finance, investment, account, info, change, password, email, verify'
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
        <AccountContainer {...this.props} />
      </Page>
      );
  }
}

export default Account;
