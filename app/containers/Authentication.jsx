import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Card from 'material-ui/Card';
import FontAwesome from 'react-fontawesome';
import classNames from 'classnames/bind';
import { emailTextFieldChange, passwordTextFieldChange, passwordConfirmationTextFieldChange, toggleAuthenticationMode, loginPress } from '../actions/authentications';
import { sendPasswordReset } from '../actions/users';
import LoginEmailTextField from '../components/authentication/LoginEmailTextField';
import LoginPasswordTextField from '../components/authentication/LoginPasswordTextField';
import { getAuthenticationSelect } from '../selectors/index';
import styles from '../css/containers/authentication';

const cx = classNames.bind( styles );

class Authentication extends React.Component {
  constructor( props ) {
    super( props );
    this.handleOnLogin = this.handleOnLogin.bind( this );
    this.handleOnSendPasswordReset = this.handleOnSendPasswordReset.bind( this );
  }

  getAuthenticationForm() {
    if ( this.props.authentication.isLoginMode ) {
      return this.getLoginForm();
    }
    return this.getPasswordResetForm();
  }

  getLoginForm() {
    return (
    <div className={ cx( 'card-insides' ) }>
      <span>Log in with email</span>
      <form onSubmit={ this.handleOnLogin }>
        <LoginEmailTextField
          emailTextField={ this.props.authentication.emailTextField }
          emailTextFieldSelect={this.props.authenticationSelect.loginEmailTextFieldSelect}
          onChange={ this.props.emailTextFieldChange } />
          <LoginPasswordTextField
                             passwordTextField={ this.props.authentication.passwordTextField }
                             passwordTextFieldSelect={ this.props.authenticationSelect.passwordTextFieldSelect }
                             onChange={ this.props.passwordTextFieldChange }
                             label={ 'Password' } />
        <p className={ cx( 'message', {
                         'message-show': this.props.user.message && this.props.user.message.length > 0
                       } ) }>
          <span>{ this.props.user.message }</span>
        </p>
        <RaisedButton
                      label="Log In"
                      fullWidth
                      primary
                      type="submit"
                      className={ cx( 'submit-button' ) } />
                      <span>
                        Forgot your password?
                      </span>
                      <FlatButton
                                  label="RESET PASSWORD"
                                  secondary
                                  onTouchTap={ this.props.toggleAuthenticationMode } />
      </form>
    </div>
    );
  }

  getPasswordResetForm() {
    return (
    <div className={ cx( 'card-insides' ) }>
      <form onSubmit={ this.handleOnSendPasswordReset }>
        Reset password
        <LoginEmailTextField
                        value={ this.props.authentication.emailTextField.value }
                        errorText={ this.props.authenticationSelect.emailTextFieldSelect.errorText }
                        onChange={ this.props.emailTextFieldChange } />
        <p className={ cx( 'message', {
                         'message-show': this.props.user.message && this.props.user.message.length > 0
                       } ) }>
          <span>{ this.props.user.message }</span>
        </p>
        <RaisedButton
                      disabled={ !this.props.authenticationSelect.emailTextFieldSelect.valid }
                      label="SEND RESET EMAIL"
                      fullWidth
                      primary
                      type="submit"
                      className={ cx( 'submit-button' ) } />
        <p>
          Have your password?&nbsp;
        </p>
        <FlatButton
                    label="LOG IN"
                    secondary
                    onTouchTap={ this.props.toggleAuthenticationMode } />
      </form>
    </div>
    );
  }

  handleOnLogin( event ) {
    event.preventDefault();
    this.props.loginPress();
  }

  handleOnSendPasswordReset( event ) {
    event.preventDefault();
    this.props.sendPasswordReset();
  }

  render() {
    return (
    <div>
      <div className={ cx( 'google-login-button-container' ) }>
        <RaisedButton
                      href="/auth/google"
                      label="LOG IN WITH GOOGLE"
                      primary
                      fullWidth
                      icon={ <FontAwesome
                                          name="google"
                                          className={ cx( 'google-icon' ) } /> } />
      </div>
      <p className={ cx( 'or-prompt' ) }>
        OR
      </p>
      <Card className={ cx( 'card' ) }>
        { this.getAuthenticationForm() }
      </Card>
    </div>
    );
  }
}

Authentication.propTypes = {
  user: PropTypes.object.isRequired,
  authentication: PropTypes.object.isRequired,
  authenticationSelect: PropTypes.object.isRequired,
  loginPress: PropTypes.func.isRequired,
  sendPasswordReset: PropTypes.func.isRequired,
  emailTextFieldChange: PropTypes.func.isRequired,
  passwordTextFieldChange: PropTypes.func.isRequired,
  passwordConfirmationTextFieldChange: PropTypes.func.isRequired,
  toggleAuthenticationMode: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    user: state.user,
    authentication: state.authentication,
    authenticationSelect: getAuthenticationSelect( state )
  };
}

export default connect( mapStateToProps, {
  loginPress,
  sendPasswordReset,
  emailTextFieldChange,
  passwordTextFieldChange,
  passwordConfirmationTextFieldChange,
  toggleAuthenticationMode
} )( Authentication );
