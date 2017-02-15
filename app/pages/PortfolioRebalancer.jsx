import React, { Component } from 'react';
import Page from '../pages/Page';
import PortfolioRebalancerContainer from '../containers/PortfolioRebalancer';

class PortfolioRebalancer extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Portfolio Rebalancer';
  }

  pageMeta() {
    return [
      {
        name: 'description',
        content: 'Investment portfolio rebalancing tool'
      },
      {
        name: 'keywords',
        content: 'portfolio, rebalance, rebalancer, stocks, securities, security, finance, investment'
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
        <PortfolioRebalancerContainer {...this.props} />
      </Page>
      );
  }
}

export default PortfolioRebalancer;
