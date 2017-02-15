import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { manualLogin, register } from '../actions/users';
import styles from '../css/components/authentication';

const cx = classNames.bind( styles );

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import FontAwesome from 'react-fontawesome';
import TextField from 'material-ui/TextField';

import { emailTextFieldChange, passwordTextFieldChange, passwordConfirmationTextFieldChange, toggleAuthenticationMode } from '../actions/authentications';
import EmailTextField from '../components/authentication/EmailTextField'
import PasswordTextField from '../components/authentication/PasswordTextField'
import PasswordConfirmationTextField from '../components/authentication/PasswordConfirmationTextField'
import { getAuthenticationSelect } from '../selectors/index'

class Authentication extends Component {

  constructor( props ) {
    super( props );
    this.handleOnSubmit = this.handleOnSubmit.bind( this );
  }

  handleOnSubmit( event ) {
    event.preventDefault();

    const {manualLogin, signUp, user: {isLogin}} = this.props;
    const email = ReactDOM.findDOMNode( this.refs.email ).value;
    const password = ReactDOM.findDOMNode( this.refs.password ).value;

    if ( isLogin ) {
      manualLogin( {
        email,
        password
      } );
    } else {
      signUp( {
        email,
        password
      } );
    }
  }

  renderHeader() {
    const {user: {isLogin}, toggleLoginMode, emailTextFieldChange} = this.props;
    if ( isLogin ) {
      return (
      <div className={ cx( 'header' ) }>
        <h1 className={ cx( 'heading' ) }>Login with Email</h1>
        <div className={ cx( 'alternative' ) }>
          Not what you want?
          <a
             className={ cx( 'alternative-link' ) }
             onClick={ toggleLoginMode }>Register an Account</a>
        </div>
      </div>
      );
    }

    return (
    <div className={ cx( 'header' ) }>
      <h1 className={ cx( 'heading' ) }>Register with Email</h1>
      <div className={ cx( 'alternative' ) }>
        Already have an account?
        <a
           className={ cx( 'alternative-link' ) }
           onClick={ toggleLoginMode }>Login</a>
      </div>
    </div>
    );
  }

  getAuthenticationForm() {
    const {authentication} = this.props;
    if ( authentication.isLoginMode ) {
      return this.getLoginForm();
    }
    return this.getRegistrationForm();
  }

  handleOnLogin = (event) => {
    const {manualLogin} = this.props;
    event.preventDefault();
    manualLogin();
  }

  getLoginForm() {
    const {user, manualLogin, authentication, authenticationSelect, emailTextFieldChange, passwordTextFieldChange, passwordConfirmationTextFieldChange, toggleAuthenticationMode} = this.props;
    return (
    <div className={ cx( 'CardInsides' ) }>
      Login with Email
      <form onSubmit={ this.handleOnLogin }>
        <EmailTextField
                        value={ authentication.emailTextField.value }
                        errorText={ authenticationSelect.emailTextFieldSelect.errorText }
                        onChange={ emailTextFieldChange } />
        <PasswordTextField
                           value={ authentication.passwordTextField.value }
                           errorText={ authenticationSelect.passwordTextFieldSelect.errorText }
                           onChange={ passwordTextFieldChange } />
        <br/>
        <p className={ cx( 'message', {
                         'message-show': user.message && user.message.length > 0
                       } ) }>
          { user.message }
        </p>
        <RaisedButton
                      className={ cx( 'SubmitButton' ) }
                      label="Log In"
                      fullWidth={ true }
                      primary={ true }
                      disabled={ authenticationSelect.loginButtonVisibility === 'disabled' }
                      type="submit" />
      </form>
      <br/> Don't have an account?&nbsp;
      <FlatButton
                  label="Register"
                  secondary={ true }
                  onTouchTap={ toggleAuthenticationMode } />
    </div>
    );
  }

  handleOnRegister = (event) => {
    const {register} = this.props;
    event.preventDefault();
    register();
  }

  getRegistrationForm() {
    const {user, register, authentication, authenticationSelect, emailTextFieldChange, passwordTextFieldChange, passwordConfirmationTextFieldChange, toggleAuthenticationMode} = this.props;
    return (
    <div className={ cx( 'CardInsides' ) }>
      <form onSubmit={ this.handleOnRegister }>
        Register
        <EmailTextField
                        value={ authentication.emailTextField.value }
                        errorText={ authenticationSelect.emailTextFieldSelect.errorText }
                        onChange={ emailTextFieldChange } />
        <PasswordTextField
                           value={ authentication.passwordTextField.value }
                           errorText={ authenticationSelect.passwordTextFieldSelect.errorText }
                           onChange={ passwordTextFieldChange } />
        <PasswordConfirmationTextField
                                       value={ authentication.passwordConfirmationTextField.value }
                                       errorText={ authenticationSelect.passwordConfirmationTextFieldSelect.errorText }
                                       onChange={ passwordConfirmationTextFieldChange } />
        <br/>
        <p className={ cx( 'message', {
                         'message-show': user.message && user.message.length > 0
                       } ) }>
          { user.message }
        </p>
        <RaisedButton
                      className={ cx( 'SubmitButton' ) }
                      label="Register"
                      fullWidth={ true }
                      primary={ true }
                      disabled={ authenticationSelect.registerButtonVisibility === 'disabled' }
                      type="submit" />
      </form>
      <br/> Already have an account?&nbsp;
      <FlatButton
                  label="Login"
                  secondary={ true }
                  onTouchTap={ toggleAuthenticationMode } />
    </div>
    );
  }

  render() {
    const {message} = this.props.user;
    return (
    <div>
      <div className={ cx( 'GoogleLoginButtonContainer' ) }>
        <RaisedButton
                      label=" Continue with Google"
                      href="/auth/google"
                      primary={ true }
                      fullWidth={ true }
                      icon={ <FontAwesome
                                          name='google'
                                          className={ cx( 'GoogleIcon' ) } /> } />
      </div>
      <Card className={ cx( 'Card' ) }>
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

function mapStateToProps( state ) {
  return {
    user: state.user,
    authentication: state.authentication,
    authenticationSelect: getAuthenticationSelect( state )
  };
}

export default connect( mapStateToProps, {
  manualLogin,
  register,
  emailTextFieldChange,
  passwordTextFieldChange,
  passwordConfirmationTextFieldChange,
  toggleAuthenticationMode
} )( Authentication );
