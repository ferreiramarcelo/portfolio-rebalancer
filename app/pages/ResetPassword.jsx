import React, { Component } from 'react';
import Page from '../pages/Page';
import ResetPasswordContainer from '../containers/ResetPassword';

class ResetPassword extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Password Reset | Portfolio Rebalancer';
  }

  pageMeta() {
    return [
      {
        name: 'description',
        content: 'Reset your Portfolio Rebalancer password'
      },
      {
        name: 'keywords',
        content: 'portfolio, rebalance, rebalancer, stocks, securities, security, finance, investment, account, info, reset, change, password'
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
        <ResetPasswordContainer {...this.props} />
      </Page>
      );
  }
}

export default ResetPassword;
