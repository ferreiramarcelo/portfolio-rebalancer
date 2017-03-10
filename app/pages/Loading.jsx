import React, { Component } from 'react';
import Page from '../pages/Page';
import LoadingContainer from '../containers/Loading';

class Loading extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Loading... | Portfolio Rebalancer';
  }

  pageMeta() {
    return [
      {
        name: 'description',
        content: 'Loading Porfolio Rebalancer'
      },
      {
        name: 'keywords',
        content: 'portfolio, rebalance, rebalancer, stocks, securities, security, finance, investment, loading'
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
        <LoadingContainer {...this.props} />
      </Page>
      );
  }
}

export default Loading;
