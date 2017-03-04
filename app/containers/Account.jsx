import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Card from 'material-ui/Card';
import FontAwesome from 'react-fontawesome';
import classNames from 'classnames/bind';
import { emailTextFieldChange, passwordTextFieldChange, passwordConfirmationTextFieldChange, toggleAuthenticationMode } from '../actions/authentications';
import { manualLogin, register, sendPasswordReset } from '../actions/users';
import EmailTextField from '../components/authentication/EmailTextField';
import PasswordTextField from '../components/authentication/PasswordTextField';
import { getAuthenticationSelect } from '../selectors/index';
import styles from '../css/containers/authentication';

const cx = classNames.bind( styles );

class Account extends React.Component {
  constructor( props ) {
    super( props );
    this.handleOnChangePassword = this.handleOnChangePassword.bind( this );
  }

  handleOnChangePassword( event ) {
    event.preventDefault();
  }

  render() {
    return (
    <div>
      Email: {this.props.user.email}
      {this.props.user.verified ? '' : 'NOT VERIFIED'}
      <form onSubmit={ this.handleOnChangePassword }>
      Change password
        <PasswordTextField
                         value={ this.props.authentication.passwordTextField.value }
                         errorText={ this.props.authenticationSelect.passwordTextFieldSelect.errorText }
                         onChange={ this.props.passwordTextFieldChange }
                         label="Current password" />
        <PasswordTextField
                           value={ this.props.authentication.passwordTextField.value }
                           errorText={ this.props.authenticationSelect.passwordTextFieldSelect.errorText }
                           onChange={ this.props.passwordTextFieldChange }
                           label="New password" />
        <PasswordTextField
                                       value={ this.props.authentication.passwordConfirmationTextField.value }
                                       errorText={ this.props.authenticationSelect.passwordConfirmationTextFieldSelect.errorText }
                                       onChange={ this.props.passwordConfirmationTextFieldChange }
                                     label="Confirm new password" />
        <p className={ cx( 'message', {
                         'message-show': this.props.user.message && this.props.user.message.length > 0
                       } ) }>
          { this.props.user.message }
        </p>
        <RaisedButton
                      disabled={ this.props.authenticationSelect.registerButtonVisibility === 'disabled' }
                      label="Change Password"
                      fullWidth
                      primary
                      disabled={ this.props.authenticationSelect.registerButtonVisibility === 'disabled' }
                      type="submit"
                      className={ cx( 'submit-button' ) } />
      </form>
    </div>
    );
  }
}

Account.propTypes = {
  user: PropTypes.object.isRequired,
  authentication: PropTypes.object.isRequired,
  authenticationSelect: PropTypes.object.isRequired,
  manualLogin: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
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
  manualLogin,
  register,
  sendPasswordReset,
  emailTextFieldChange,
  passwordTextFieldChange,
  passwordConfirmationTextFieldChange,
  toggleAuthenticationMode
} )( Account );
