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

  const getLoggedInAsIdentifier = function getLoggedInAsIdentifier( authenticated, email ) {
      return (
      <span className={cx('logged-in-as-identifier')} >{ email }</span>
      );
  };
  const loggedInAsIdentifier = getLoggedInAsIdentifier( user.authenticated, user.email );

  const getLogOutButton = function getLogOutButton( authenticated ) {
      return (
      <FlatButton
                  onTouchTap={ logOut }
                  label={ "LOG OUT" }
                  className={cx('log-out-button')} />
      );
  };
  const logOutButton = getLogOutButton( user.authenticated );

  const getUnauthenticatedTabs = function getUnauthenticatedTabs() {
    return null;
  }
  const unauthenticatedTabs = getUnauthenticatedTabs();


  const getNavigation = function getNavigation( givenAuthenticated ) {
    if ( givenAuthenticated ) {
      return unauthenticatedTabs;
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
