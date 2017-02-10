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
    return 'Log In';
  }

  pageMeta() {
    return [
      {
        name: 'description',
        content: 'A reactGo example of a login or register page'
      }
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
