import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import {logOut} from '../actions/users';
import styles from '../css/components/navigation';

import FlatButton from 'material-ui/FlatButton';

const cx = classNames.bind(styles);

const Navigation = ({user, logOut}) => {

    return (
        <nav className={cx('Navigation')} role="navigation">

            <FlatButton className={cx('NavigationButtonLeft')} labelStyle={{
                color: 'white',
                fontSize: '16px'
            }} containerElement={< Link to = "/" />} label='PORTFOLIO REBALANCER'/>
            {user.authenticated
                ? <span className={cx('LoggedInAsIdentifier')}>Logged in as {user.email}</span>
                : ''}

            <FlatButton labelStyle={{
                color: 'white',
                fontSize: '16px'
            }} className={cx('NavigationButtonRight')} onTouchTap={user.authenticated
                ? logOut
                : ''} containerElement={user.authenticated
                ? (
                    <Link to="/"></Link>
                )
                : (
                    <Link to="/login"></Link>
                )} label={user.authenticated
                ? 'LOG OUT'
                : 'LOG IN'}/>
            <FlatButton labelStyle={{
                color: 'white',
                fontSize: '16px'
            }} className={cx('NavigationButtonRight')} containerElement={< Link to = "/about" />} label='ABOUT'/>
            <FlatButton labelStyle={{
                color: 'white',
                fontSize: '16px'
            }} className={cx('NavigationButtonRight')} containerElement={< Link to = "/about" />} label='GITHUB'/>
        </nav>
    );
};

Navigation.propTypes = {
    user: PropTypes.object,
    logOut: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {user: state.user};
}

export default connect(mapStateToProps, {logOut})(Navigation);
