import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import { Tabs, Tab } from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import classNames from 'classnames/bind';
import { logOut } from '../actions/users';
import styles from '../css/containers/navigation';

const cx = classNames.bind( styles );

const Navigation = ({tab, user, logOut}) => {

  const getLogInTab = function getLogInTab() {
    return (
    <Tab
         value="/login"
         containerElement={ <Link to="/login" /> }
         label={ 'LOG IN' } />
    );
  };
  const logInTab = getLogInTab();

  const getRegisterTab = function getRegisterTab() {
    return (
    <Tab
         value="/register"
         containerElement={ <Link to="/register" /> }
         label={ 'REGISTER' } />
    );
  };
  const registerTab = getRegisterTab();

  const getLoggedInAsIdentifier = function getLoggedInAsIdentifier( authenticated, email ) {
    return (
    <span className={ cx( 'logged-in-as-identifier' ) }>{ email }</span>
    );
  };
  const loggedInAsIdentifier = getLoggedInAsIdentifier( user.authenticated, user.email );

  const getLogOutButton = function getLogOutButton( authenticated ) {
    return (
    <FlatButton
                onTouchTap={ logOut }
                label={ "LOG OUT" }
                className={ cx( 'log-out-button' ) } />
    );
  };
  const logOutButton = getLogOutButton( user.authenticated );

  const getUnauthenticatedTabs = function getUnauthenticatedTabs() {
    return (<Tabs value={ tab }>
              <Tab
                   value="/"
                   label="PR"
                   containerElement={ <Link to="/" /> }>
              </Tab>
              <Tab
                   value="/about"
                   label="ABOUT"
                   containerElement={ <Link to="/about" /> }>
              </Tab>
              { logInTab }
              { registerTab }
            </Tabs>);
  }
  const unauthenticatedTabs = getUnauthenticatedTabs();

  const getAuthenticatedNav = function getAuthenticatedNav() {
    return (
    <div className={ cx( 'authenticated-container' ) }>
      <div className={ cx( 'authenticated-container-tabs' ) }>
        <Tabs value={ tab }>
          <Tab
               value="/"
               label="PR"
               containerElement={ <Link to="/" /> }>
          </Tab>
          <Tab
               value="/about"
               label="ABOUT"
               containerElement={ <Link to="/about" /> }>
          </Tab>
          <Tab
               value="/account"
               label="ACCOUNT"
               containerElement={ <Link to="/account" /> }>
          </Tab>
        </Tabs>
      </div>
      <div className={ cx( 'authenticated-container-log-out' ) }>
        { logOutButton }
      </div>
    </div>);
  }
  const authenticatedNav = getAuthenticatedNav();

  const getNavigation = function getNavigation( givenAuthenticated ) {
    if ( givenAuthenticated ) {
      return authenticatedNav;
    }
    return unauthenticatedTabs;
  }
  const navigation = getNavigation( user.authenticated );

  return (
  <nav
       className={ cx( 'navigation' ) }
       role="navigation">
    { navigation }
  </nav>
  );
};

Navigation.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func.isRequired
};

function mapStateToProps( state ) {
  return {
    user: state.user
  };
}

export default connect( mapStateToProps, {
  logOut
} )( Navigation );
