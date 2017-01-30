import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { logOut } from '../actions/users';
import styles from '../css/components/navigation';

import FlatButton from 'material-ui/FlatButton';

const cx = classNames.bind(styles);

const Navigation = ({ user, logOut }) => {

    return (
<nav className={cx('Navigation')} role="navigation">

					<FlatButton
					  labelStyle={{ color: 'white', fontSize: '16px'}}
					  containerElement={<Link to="/" />}
					  label='PORTFOLIO REBALANCER' />
					  <FlatButton
					labelStyle={{ color: 'white', fontSize: '16px'}}
					className={cx('NavigationButtonRight')}
						onTouchTap={user.authenticated ? logOut : ''}
					  containerElement={ user.authenticated ? (<Link to="/"></Link>) : (<Link to="/login"></Link> )}
						label={ user.authenticated ? 'LOG OUT' : 'LOG IN'} />
						<FlatButton
					labelStyle={{ color: 'white', fontSize: '16px'}}
					className={cx('NavigationButtonRight')}
					  containerElement={<Link to="/about" />}
					  label='ABOUT' />
					<FlatButton
					labelStyle={{ color: 'white', fontSize: '16px'}}
					className={cx('NavigationButtonRight')}
					  containerElement={<Link to="/about" />}
					  label='GITHUB' />
</nav>
    );
	/*
    return (
      <nav className={cx('navigation')} role="navigation">
        <Link
to="/"
className={cx('item', 'logo')}
activeClassName={cx('active')}>Ninja Ocean</Link>
{ user.authenticated ? (
  <Link
    onClick={logOut}
className={cx('item')} to="/">Logout</Link>
          ) : (
            <Link className={cx('item')} to="/login">Log in</Link>
          )}
<Link className={cx('item')} to="/dashboard">Dashboard</Link>
<Link to="/about" className={cx('item')} activeClassName={cx('active')}>About</Link>
</nav>
    ); */
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

export default connect(mapStateToProps, { logOut })(Navigation);
