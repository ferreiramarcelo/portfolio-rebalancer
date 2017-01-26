import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { logOut } from '../actions/users';
import styles from '../css/components/navigation';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import injectTapEventPlugin from 'react-tap-event-plugin'; injectTapEventPlugin();



const cx = classNames.bind(styles);

const Navigation = ({ user, logOut }) => {

    /*return (
		<MuiThemeProvider>		
			<Toolbar >
				<ToolbarGroup firstChild={true}>
					<FlatButton labelStyle={{ fontSize: '16px' }}
					  containerElement={<Link to="/" />}
					  label='PORTFOLIO REBALANCER' />
				</ToolbarGroup>
				<ToolbarGroup>	
					<FlatButton labelStyle={{ fontSize: '16px' }}
					  containerElement={<Link to="/about" />}
					  label='GITHUB' />
					<FlatButton labelStyle={{ fontSize: '16px' }}
					  containerElement={<Link to="/about" />}
					  label='ABOUT' />
					<FlatButton labelStyle={{ fontSize: '16px' }}
						onClick={user.authenticated ? logOut : ''}
					  containerElement={ user.authenticated ? (<Link to="/"></Link>) : (<Link to="/login"></Link> )}
						label={ user.authenticated ? 'LOG OUT' : 'LOG IN'} />
				</ToolbarGroup>
			  </Toolbar>
		</MuiThemeProvider>
    ); */
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

export default connect(mapStateToProps, { logOut })(Navigation);
