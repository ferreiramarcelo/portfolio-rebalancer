import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import LinearProgress from 'material-ui/LinearProgress';
import Paper from 'material-ui/Paper';
import FontAwesome from 'react-fontawesome';
import classNames from 'classnames/bind';
import { emailTextFieldChange, passwordTextFieldChange, currentPasswordTextFieldChange, passwordConfirmationTextFieldChange, toggleAuthenticationMode, loginPress, sendPasswordResetPress } from '../actions/authentications';
import LoginEmailTextField from '../components/authentication/LoginEmailTextField';
import LoginPasswordTextField from '../components/authentication/LoginPasswordTextField';
import { getAuthenticationSelect } from '../selectors/index';
import styles from '../css/containers/authentication';
import * as constants from '../constants';

const cx = classNames.bind(styles);

class Authentication extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnLogin = this.handleOnLogin.bind(this);
    this.handleOnSendPasswordReset = this.handleOnSendPasswordReset.bind(this);
  }

  getAuthenticationForm() {
    if (this.props.authentication.isLoginMode) {
      return this.getLoginForm();
    }
    return this.getPasswordResetForm();
  }

  getLoginButton() {
    switch (this.props.authentication.loginStatus) {
      case constants.IS_PROCESSING:
        return (<div>
          <RaisedButton type="submit" label="LOGGING IN..." fullWidth primary disabled className={cx('submit-button')} />
          <LinearProgress mode="indeterminate" className={cx('loading-indicator')} />
        </div>);
      case constants.NOT_PROCESSING:
      default:
        return (<RaisedButton type="submit" label="LOG IN" fullWidth primary className={cx('submit-button', 'submit-button-not-loading')} />);
    }
  }

  getLoginForm() {
    return (
      <div className={cx('paper-insides')}>
        <span className={cx('sub-header-2')}>Log in with email</span>
        <form onSubmit={this.handleOnLogin}>
          <LoginEmailTextField emailTextField={this.props.authentication.emailTextField} emailTextFieldSelect={this.props.authenticationSelect.loginEmailTextFieldSelect} onChange={this.props.emailTextFieldChange} />
          <LoginPasswordTextField
passwordTextField={this.props.authentication.currentPasswordTextField} passwordTextFieldSelect={this.props.authenticationSelect.currentPasswordTextFieldSelect} onChange={this.props.currentPasswordTextFieldChange} label={'Current password'}
          />
          <span className={cx('message')}>{ this.props.user.message.value }</span>
          { this.getLoginButton() }
          <span>Forgot your password?</span>
          <FlatButton label="RESET PASSWORD" secondary onTouchTap={this.props.toggleAuthenticationMode} />
        </form>
      </div>
      );
  }

  getPasswordResetButton() {
    switch (this.props.authentication.sendPasswordResetStatus) {
      case constants.IS_PROCESSING:
        return (<div>
          <RaisedButton type="submit" label="SENDING EMAIL..." fullWidth primary disabled className={cx('submit-button')} />
          <LinearProgress mode="indeterminate" className={cx('loading-indicator')} />
        </div>);
      case constants.NOT_PROCESSING:
      default:
        return (<RaisedButton type="submit" label="SEND RESET EMAIL" fullWidth primary className={cx('submit-button', 'submit-button-not-loading')} />);
    }
  }

  getPasswordResetForm() {
    return (
      <div className={cx('paper-insides')}>
        <form onSubmit={this.handleOnSendPasswordReset}>
          <span className={cx('sub-header-2')}>Reset password</span>
          <LoginEmailTextField emailTextField={this.props.authentication.emailTextField} emailTextFieldSelect={this.props.authenticationSelect.loginEmailTextFieldSelect} onChange={this.props.emailTextFieldChange} />
          <span className={cx('message')}>{ this.props.user.message.value }</span>
          { this.getPasswordResetButton() }
          <span>Have your password?</span>
          <FlatButton label="LOG IN" secondary onTouchTap={this.props.toggleAuthenticationMode} />
        </form>
      </div>
      );
  }

  handleOnLogin(event) {
    event.preventDefault();
    this.props.loginPress();
  }

  handleOnSendPasswordReset(event) {
    event.preventDefault();
    this.props.sendPasswordResetPress();
  }

  render() {
    return (
      <div>
        <div className={cx('google-login-button-container')}>
          <RaisedButton href="/auth/google" label="LOG IN WITH GOOGLE" primary fullWidth icon={<FontAwesome name="google" className={cx('google-icon')} />} />
        </div>
        <p className={cx('or-prompt')}>
          OR
        </p>
        <Paper className={cx('paper')}>
          { this.getAuthenticationForm() }
        </Paper>
      </div>
      );
  }
}

Authentication.propTypes = {
  user: PropTypes.object.isRequired,
  authentication: PropTypes.object.isRequired,
  authenticationSelect: PropTypes.object.isRequired,
  loginPress: PropTypes.func.isRequired,
  sendPasswordResetPress: PropTypes.func.isRequired,
  emailTextFieldChange: PropTypes.func.isRequired,
  passwordTextFieldChange: PropTypes.func.isRequired,
  passwordConfirmationTextFieldChange: PropTypes.func.isRequired,
  currentPasswordTextFieldChange: PropTypes.func.isRequired,
  toggleAuthenticationMode: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
    authentication: state.authentication,
    authenticationSelect: getAuthenticationSelect(state)
  };
}

export default connect(mapStateToProps, {
  loginPress,
  sendPasswordResetPress,
  emailTextFieldChange,
  passwordTextFieldChange,
  passwordConfirmationTextFieldChange,
  currentPasswordTextFieldChange,
  toggleAuthenticationMode
})(Authentication);
