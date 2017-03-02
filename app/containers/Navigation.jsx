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

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';

const cx = classNames.bind( styles );

const Navigation = ({tab, user, logOut}) => {

  const getLogInTab = function getLogInTab( authenticated ) {
    if ( !user.authenticated ) {
      return (
      <Tab
           value="/login"
           containerElement={ <Link to="/login" /> }
           label={ 'LOG IN' } />
      );
    }
    return null;
  };
  const logInTab = getLogInTab( user.authenticated );

  const getRegisterTab = function getRegisterTab( authenticated ) {
    if ( !user.authenticated ) {
      return (
      <Tab
           value="/register"
           containerElement={ <Link to="/register" /> }
           label={ 'REGISTER' } />
      );
    }
    return null;
  };
  const registerTab = getRegisterTab( user.authenticated );

  const getLoggedInAsIdentifier = function getLoggedInAsIdentifier( authenticated, email ) {
    if ( user.authenticated ) {
      return (
      <span style={{ float: 'right'}} className={cx('logged-in-as-identifier')} >{ email }</span>
      );
    }
    return null;
  };
  const loggedInAsIdentifier = getLoggedInAsIdentifier( user.authenticated, user.email );

  const getLogOutButton = function getLogOutButton( authenticated ) {
    if ( user.authenticated ) {
      return (
      <FlatButton
                  onTouchTap={ logOut }
                  label={ 'LOG OUT' }
                  labelStyle={ { color: 'white', fontSize: '16px' } }
                  className={cx('navigation-button-right')} />
      );
    }
    return null;
  };
  const logOutButton = getLogOutButton( user.authenticated );

  const getUnauthenticatedTabs = function getUnauthenticatedTabs() {
    return (<Tabs value={ tab }>
              <Tab
                   value="/"
                   label="Portfolio Rebalancer"
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
    <div style={{width: '100%', height: '48px'} }>
      <div style={{display: 'table-cell'}}>
      <Tabs
            value={ tab }
          >
        <Tab
             value="/"
             label="Portfolio Rebalancer"
             containerElement={ <Link to="/" /> }>
        </Tab>
        <Tab
             value="/about"
             label="ABOUT"
             containerElement={ <Link to="/about" /> }>
        </Tab>
      </Tabs>
    </div>
    <div style={{display: 'table-cell'}}>
      { logOutButton }
      { loggedInAsIdentifier }
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
