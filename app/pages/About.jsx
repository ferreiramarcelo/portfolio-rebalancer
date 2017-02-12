import React, { Component } from 'react';
import Page from '../pages/Page';
import AboutContainer from '../containers/About';

class About extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'About | Portfolio Rebalancer';
  }

  pageMeta() {
    return [
      {
        name: 'description',
        content: 'About Porfolio Rebalancer'
      },
      {
        name: 'keywords',
        content: 'portfolio, rebalance, rebalancer, stocks, securities, security, finance, investment, about, purpose, usage, technologies, contact'
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
        <AboutContainer {...this.props} />
      </Page>
      );
  }
}

export default About;
