import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Card from 'material-ui/Card';
import FontAwesome from 'react-fontawesome';
import LinearProgress from 'material-ui/LinearProgress';
import classNames from 'classnames/bind';
import { emailTextFieldChange, passwordTextFieldChange, passwordConfirmationTextFieldChange, toggleAuthenticationMode, registerPress } from '../actions/authentications';
import { register } from '../actions/users';
import RegistrationEmailTextField from '../components/authentication/RegistrationEmailTextField';
import PasswordTextField from '../components/authentication/PasswordTextField';
import { getAuthenticationSelect } from '../selectors/index';
import styles from '../css/containers/authentication';
import * as constants from '../constants';

const cx = classNames.bind( styles );

class Register extends React.Component {
  constructor( props ) {
    super( props );
    this.handleOnRegister = this.handleOnRegister.bind( this );
  }

  handleOnRegister( event ) {
    event.preventDefault();
    this.props.registerPress();
  }

  getRegisterButton() {
    switch (this.props.authentication.registrationStatus) {
      case constants.IS_PROCESSING:
        return (<div>
                  <RaisedButton
                                type="submit"
                                label="REGISTERING..."
                                fullWidth
                                primary
                                disabled
                                className={ cx( 'submit-button' ) } />
                  <LinearProgress mode="indeterminate" />
                </div>);
      case constants.NOT_PROCESSING:
      default:
        return <RaisedButton
                             type="submit"
                             label="REGISTER"
                             fullWidth
                             primary
                             className={ cx( 'submit-button' ) } />;
    }
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
        <div className={ cx( 'card-insides' ) }>
          <form onSubmit={ this.handleOnRegister }>
            <span>Register with email</span>
            <RegistrationEmailTextField
                            emailTextField={ this.props.authentication.emailTextField }
                            emailTextFieldSelect={this.props.authenticationSelect.registrationEmailTextFieldSelect}
                            onChange={ this.props.emailTextFieldChange } />
            <PasswordTextField
                               passwordTextField={ this.props.authentication.passwordTextField }
                               passwordTextFieldSelect={ this.props.authenticationSelect.passwordTextFieldSelect }
                               onChange={ this.props.passwordTextFieldChange }
                               label={ 'Password' } />
            <PasswordTextField
                               passwordTextField={ this.props.authentication.passwordConfirmationTextField }
                               passwordTextFieldSelect={ this.props.authenticationSelect.passwordConfirmationTextFieldSelect }
                               onChange={ this.props.passwordConfirmationTextFieldChange }
                               label={ 'Confirm password' } />
            <p className={ cx( 'message', {
                             'message-show': this.props.user.message && this.props.user.message.length > 0
                           } ) }>
              { this.props.user.message }
            </p>
            { this.getRegisterButton() }
          </form>
        </div>
      </Card>
    </div>
    );
  }
}

Register.propTypes = {
  user: PropTypes.object.isRequired,
  authentication: PropTypes.object.isRequired,
  authenticationSelect: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  emailTextFieldChange: PropTypes.func.isRequired,
  passwordTextFieldChange: PropTypes.func.isRequired,
  passwordConfirmationTextFieldChange: PropTypes.func.isRequired,
  toggleAuthenticationMode: PropTypes.func.isRequired,
  registerPress: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    user: state.user,
    authentication: state.authentication,
    authenticationSelect: getAuthenticationSelect( state )
  };
}

export default connect( mapStateToProps, {
  register,
  emailTextFieldChange,
  passwordTextFieldChange,
  passwordConfirmationTextFieldChange,
  toggleAuthenticationMode,
  registerPress
} )( Register );
