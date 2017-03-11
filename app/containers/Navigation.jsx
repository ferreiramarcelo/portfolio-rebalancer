import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import { Tabs, Tab } from 'material-ui/Tabs';
import classNames from 'classnames/bind';
import { changeTab } from '../actions/views';
import { logOut } from '../actions/users';
import styles from '../css/containers/navigation';

const cx = classNames.bind(styles);

const Navigation = ({tab, user, changeTab, logOut}) => {
  const logInTab = (<Tab
                         value="login"
                         containerElement={<Link to="/login" />}
                         label={'LOG IN'} />);

  const registerTab = (<Tab
                            value="register"
                            containerElement={<Link to="/register" />}
                            label={'REGISTER'} />);

  const logOutButton = (<FlatButton
                                    onTouchTap={logOut}
                                    label={'LOG OUT'}
                                    className={cx('log-out-button')} />);

  const unauthenticatedTabs = (<Tabs
                                     value={tab}
                                     onChange={changeTab}>
    <Tab
                                      value=""
                                      label="PR"
                                      containerElement={<Link to="" />} />
    <Tab
                                      value="about"
                                      label="ABOUT"
                                      containerElement={<Link to="/about" />} />
    { logInTab }
    { registerTab }
  </Tabs>);

  const authenticatedNav = (
    <div className={cx('authenticated-container')}>
      <div className={cx('authenticated-container-tabs')}>
        <Tabs
            value={tab}
            onChange={changeTab}>
          <Tab
             value=""
             label="PR"
             containerElement={<Link to="" />} />
          <Tab
             value="about"
             label="ABOUT"
             containerElement={<Link to="/about" />} />
          <Tab
             value="account"
             label="ACCOUNT"
             containerElement={<Link to="/account" />} />
        </Tabs>
      </div>
      <div className={cx('authenticated-container-log-out')}>
        { logOutButton }
      </div>
    </div>);

  const getNavigation = function getNavigation(givenAuthenticated) {
    if (givenAuthenticated) {
      return authenticatedNav;
    }
    return unauthenticatedTabs;
  };
  const navigation = getNavigation(user.authenticated);

  return (
    <nav
       className={cx('navigation')}
       role="navigation">
      { navigation }
    </nav>
  );
};

Navigation.propTypes = {
  user: PropTypes.object,
  changeTab: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, {
  changeTab,
  logOut
})(Navigation);
