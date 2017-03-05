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

  const logInTab = <Tab
                        value="login"
                        containerElement={ <Link to="/login" /> }
                        label={ 'LOG IN' } />;

  const registerTab = <Tab
                           value="register"
                           containerElement={ <Link to="/register" /> }
                           label={ 'REGISTER' } />;

  const loggedInAsIdentifier = <span className={ cx( 'logged-in-as-identifier' ) }>{ user.email }</span>

  const logOutButton = <FlatButton
                                   onTouchTap={ logOut }
                                   label={ "LOG OUT" }
                                   className={ cx( 'log-out-button' ) } />

  const unauthenticatedTabs = (<Tabs value={ tab }>
                                 <Tab
                                      value=""
                                      label="PR"
                                      containerElement={ <Link to="" /> }>
                                 </Tab>
                                 <Tab
                                      value="about"
                                      label="ABOUT"
                                      containerElement={ <Link to="/about" /> }>
                                 </Tab>
                                 { logInTab }
                                 { registerTab }
                               </Tabs>);

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
