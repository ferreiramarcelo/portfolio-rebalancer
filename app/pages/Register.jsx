import React, { Component } from 'react';
import Page from '../pages/Page';
import RegisterContainer from '../containers/Register';

class Register extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Register | Portfolio Rebalancer';
  }

  pageMeta() {
    return [
      {
        name: 'description',
        content: 'Register for Portfolio Rebalancer'
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
        <RegisterContainer {...this.props} />
      </Page>
      );
  }
}

export default Register;
