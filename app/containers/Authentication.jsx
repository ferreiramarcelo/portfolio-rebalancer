import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { manualLogin, signUp, toggleLoginMode } from '../actions/users';
import styles from '../css/components/login';
import hourGlassSvg from '../images/hourglass.svg';

const cx = classNames.bind( styles );

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import FontAwesome from 'react-fontawesome';
import TextField from 'material-ui/TextField';

import { emailTextFieldChange, passwordTextFieldChange } from '../actions/authentications';
import EmailTextField from '../components/authentication/EmailTextField'
import PasswordTextField from '../components/authentication/PasswordTextField'
import { getAuthenticationSelect } from '../selectors/index'

class Authentication extends Component {
  /*
   * This replaces getInitialState. Likewise getDefaultProps and propTypes are just
   * properties on the constructor
   * Read more here: https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#es6-classes
   */
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
    const {user: {isLogin}, toggleLoginMode,
  emailTextFieldChange} = this.props;
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

  renderLogin() {
    const {isWaiting, message, isLogin, authentication, authenticationSelect, emailTextFieldChange, passwordTextFieldChange} = this.props;
    return (
    <div className={ cx( 'CardContainer' ) }>
      Login with Email
      <EmailTextField
                    value={authentication.emailTextField.value}
                    errorText={authenticationSelect.emailTextFieldSelect.errorText}
                    hintText={authenticationSelect.emailTextFieldSelect.hintText}
                    onChange={emailTextFieldChange} />
                    <PasswordTextField
                                  value={authentication.passwordTextField.value}
                                  errorText={authenticationSelect.passwordTextFieldSelect.errorText}
                                  hintText={authenticationSelect.passwordTextFieldSelect.hintText}
                                  onChange={passwordTextFieldChange} />
      <br/>
      <RaisedButton className={ cx( 'SubmitButton' ) }
                  label="Log In"
                  fullWidth={true}
                  primary={ true }
                  disabled={authenticationSelect.loginButtonVisibility === 'disabled'} />
      <br/> Don't have an account?&nbsp;
      <FlatButton
                  label="Register"
                  secondary={ true } />
    </div>
    );
  }

  renderRegister() {
    return (
    <div className={ cx( 'CardContainer' ) }>
      Register
      <TextField
                 hintText="Email"
                 fullWidth={ true } />
      <br/>
      <TextField
                 hintText="Password"
                 fullWidth={ true }
                 type='password' />
                 <TextField
                            hintText="Password confirmation"
                            fullWidth={ true }
                            type='password' />
      <br/>
      <RaisedButton className={ cx( 'RegisterButton' ) }
                  label="Register"
                  fullWidth={true}
                  primary={ true } />
      <br/> Already have an account?&nbsp;
      <FlatButton
                  label="Login"
                  secondary={ true } />
    </div>
    );
  }

  render() {
    const {isWaiting, message, isLogin, emailTextField, emailTextFieldSelect, emailTextFieldChange} = this.props;

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
        { this.renderLogin() }
      </Card>
      <Card className={ cx( 'Card' ) }>
        { this.renderRegister() }
      </Card>

      <div className={ cx( 'login', {
                         waiting: isWaiting
                       } ) }>
        <div className={ cx( 'container' ) }>
          { this.renderHeader() }
          <img
               className={ cx( 'loading' ) }
               alt="loading"
               src={ hourGlassSvg } />
          <div className={ cx( 'email-container' ) }>
            <form onSubmit={ this.handleOnSubmit }>
              <input
                     className={ cx( 'input' ) }
                     type="email"
                     ref="email"
                     placeholder="email" />
              <input
                     className={ cx( 'input' ) }
                     type="password"
                     ref="password"
                     placeholder="password" />
              <div className={ cx( 'hint' ) }>
                <div>
                  Hint
                </div>
                <div>
                  email: example@ninja.com password: ninja
                </div>
              </div>
              <p className={ cx( 'message', {
                               'message-show': message && message.length > 0
                             } ) }>
                { message }
              </p>
              <input
                     className={ cx( 'button' ) }
                     type="submit"
                     value={ isLogin ? 'Login' : 'Register' } />
            </form>
          </div>
          <div className={ cx( 'google-container' ) }>
            <h1 className={ cx( 'heading' ) }>Google Login Demo</h1>
            <a
               className={ cx( 'button' ) }
               href="/auth/google">Login with Google</a>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

Authentication.propTypes = {
  user: PropTypes.object.isRequired,
  manualLogin: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  toggleLoginMode: PropTypes.func.isRequired,
  emailTextField: PropTypes.object.isRequired,
  emailTextFieldSelect: PropTypes.object.isRequired
};

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps( state ) {
  return {
    user: state.user,
    authentication: state.authentication,
    authenticationSelect: getAuthenticationSelect(state)
  };
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.
export default connect( mapStateToProps, {
  manualLogin,
  signUp,
  toggleLoginMode,
  emailTextFieldChange,
  passwordTextFieldChange
} )( Authentication );
