import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import classNames from 'classnames/bind';
import { logOut } from '../actions/users';
import styles from '../css/containers/navigation';

const cx = classNames.bind(styles);

const Navigation = ({user, logOut}) => {
  return (
    <nav
       className={cx('navigation')}
       role="navigation">
      <FlatButton
                className={cx('navigation-button-left')}
                labelStyle={{ color: 'white', fontSize: '16px' }}
                containerElement={< Link to="/" />}
                label="PORTFOLIO REBALANCER" />
      { user.authenticated
        ? <span className={cx('logged-in-as-identifier')}>Logged in as { user.email }</span>
        : '' }
      <FlatButton
                labelStyle={{ color: 'white', fontSize: '16px' }}
                className={cx('navigation-button-right')}
                onTouchTap={user.authenticated
                               ? logOut
                               : null}
                containerElement={user.authenticated
                                     ? (
                                       <Link to="/" />
                                     )
                                     : (
                                       <Link to="/login" />
                                     )}
                label={user.authenticated
                          ? 'LOG OUT'
                          : 'LOG IN'} />
      <FlatButton
                labelStyle={{ color: 'white', fontSize: '16px' }}
                className={cx('navigation-button-right')}
                containerElement={<Link to="/about" />}
                label="ABOUT" />
      <FlatButton
                labelStyle={{ color: 'white', fontSize: '16px' }}
                className={cx('navigation-button-right')}
                href="https://github.com/AlexisDeschamps/portfolio-rebalancer/"
                target="_blank"
                label="GITHUB" />
    </nav>
  );
};

Navigation.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, {
  logOut
})(Navigation);
