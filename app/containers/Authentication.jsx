import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Card from 'material-ui/Card';
import FontAwesome from 'react-fontawesome';
import classNames from 'classnames/bind';
import { emailTextFieldChange, passwordTextFieldChange, passwordConfirmationTextFieldChange, toggleAuthenticationMode } from '../actions/authentications';
import { manualLogin, register } from '../actions/users';
import EmailTextField from '../components/authentication/EmailTextField';
import PasswordTextField from '../components/authentication/PasswordTextField';
import PasswordConfirmationTextField from '../components/authentication/PasswordConfirmationTextField';
import { getAuthenticationSelect } from '../selectors/index';
import styles from '../css/containers/authentication';

const cx = classNames.bind(styles);

class Authentication extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnLogin = this.handleOnLogin.bind(this);
    this.handleOnRegister = this.handleOnRegister.bind(this);
  }

  getAuthenticationForm() {
    if (this.props.authentication.isLoginMode) {
      return this.getLoginForm();
    }
    return this.getRegistrationForm();
  }

  getLoginForm() {
    return (
      <div className={cx('CardInsides')}>
      Login with Email
      <form onSubmit={this.handleOnLogin}>
        <EmailTextField
                        value={this.props.authentication.emailTextField.value}
                        errorText={this.props.authenticationSelect.emailTextFieldSelect.errorText}
                        onChange={this.props.emailTextFieldChange} />
        <PasswordTextField
                           value={this.props.authentication.passwordTextField.value}
                           errorText={this.props.authenticationSelect.passwordTextFieldSelect.errorText}
                           onChange={this.props.passwordTextFieldChange} />
        <p
className={cx('message', {
                         'message-show': this.props.user.message && this.props.user.message.length > 0
                       })}>
          { this.props.user.message }
        </p>
        <RaisedButton
                      className={cx('SubmitButton')}
                      label="Log In"
                      fullWidth
                      primary
                      disabled={this.props.authenticationSelect.loginButtonVisibility === 'disabled'}
                      type="submit" />
      </form>
        <p>
        Don't have an account?&nbsp;
      </p>
        <FlatButton
                  label="Register"
                  secondary
                  onTouchTap={this.props.toggleAuthenticationMode} />
      </div>
    );
  }

  getRegistrationForm() {
    return (
      <div className={cx('CardInsides')}>
        <form onSubmit={this.handleOnRegister}>
        Register
        <EmailTextField
                        value={this.props.authentication.emailTextField.value}
                        errorText={this.props.authenticationSelect.emailTextFieldSelect.errorText}
                        onChange={this.props.emailTextFieldChange} />
          <PasswordTextField
                           value={this.props.authentication.passwordTextField.value}
                           errorText={this.props.authenticationSelect.passwordTextFieldSelect.errorText}
                           onChange={this.props.passwordTextFieldChange} />
          <PasswordConfirmationTextField
                                       value={this.props.authentication.passwordConfirmationTextField.value}
                                       errorText={this.props.authenticationSelect.passwordConfirmationTextFieldSelect.errorText}
                                       onChange={this.props.passwordConfirmationTextFieldChange} />
          <p
className={cx('message', {
                         'message-show': this.props.user.message && this.props.user.message.length > 0
                       })}>
            { this.props.user.message }
          </p>
          <RaisedButton
                      className={cx('SubmitButton')}
                      label="Register"
                      fullWidth
                      primary
                      disabled={this.props.authenticationSelect.registerButtonVisibility === 'disabled'}
                      type="submit" />
        </form>
        <p>
        Already have an account?&nbsp;
      </p>
        <FlatButton
                  label="Login"
                  secondary
                  onTouchTap={this.props.toggleAuthenticationMode} />
      </div>
    );
  }

  handleOnLogin(event) {
    event.preventDefault();
    this.props.manualLogin();
  }

  handleOnRegister(event) {
    event.preventDefault();
    this.props.register();
  }

  render() {
    return (
      <div>
        <div className={cx('GoogleLoginButtonContainer')}>
          <RaisedButton
                      label=" Continue with Google"
                      href="/auth/google"
                      primary
                      fullWidth
                      icon={<FontAwesome
                                          name="google"
                                          className={cx('GoogleIcon')} />} />
        </div>
        <Card className={cx('Card')}>
          { this.getAuthenticationForm() }
        </Card>
      </div>
    );
  }
}

Authentication.propTypes = {
  user: PropTypes.object.isRequired,
  manualLogin: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  emailTextField: PropTypes.object.isRequired,
  emailTextFieldSelect: PropTypes.object.isRequired,
  passwordTextFieldChange: PropTypes.func.isRequired,
  passwordConfirmationTextFieldChange: PropTypes.func.isRequired,
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
  manualLogin,
  register,
  emailTextFieldChange,
  passwordTextFieldChange,
  passwordConfirmationTextFieldChange,
  toggleAuthenticationMode
})(Authentication);
