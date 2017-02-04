import React, { Component } from 'react';
import Page from '../pages/Page';
import VoteContainer from '../containers/Vote';

class Vote extends Component {
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
        content: 'A stocks portfolio rebalancing tool'
      }
    ];
  }

  pageLink() {
    return [];
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        <VoteContainer {...this.props} />
      </Page>
      );
  }
}

export default Vote;

