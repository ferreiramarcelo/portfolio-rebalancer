import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import FontAwesome from 'react-fontawesome';
import classNames from 'classnames/bind';
import { emailTextFieldChange, passwordTextFieldChange, passwordConfirmationTextFieldChange, toggleAuthenticationMode } from '../actions/authentications';
import { sendVerificationEmail, sendPasswordReset } from '../actions/users';
import PasswordTextField from '../components/authentication/PasswordTextField';
import SendVerificationEmailProgress from '../components/account/SendVerificationEmailProgress';
import { getAuthenticationSelect } from '../selectors/index';
import * as constants from '../constants';
import styles from '../css/containers/account';

const cx = classNames.bind( styles );

class Account extends React.Component {
  constructor( props ) {
    super( props );
    this.handleOnChangePassword = this.handleOnChangePassword.bind( this );
  }

  handleOnChangePassword( event ) {
    event.preventDefault();
  }

  getEmailInfo() {
    if ( this.props.user.accountType === constants.ACCOUNT_TYPE_GOOGLE ) {
      return (  <div className={ cx( 'paper-insides', 'flex' ) }>
                  <FontAwesome
                               name="google"
                               className={ cx( 'google-icon' ) } />
                  <span>Logged in through Google Sign-In</span>
                </div>);
    }
    if ( !this.props.user.verified ) {
      return (  <div className={ cx( 'paper-insides', 'flex' ) }>
                  <span>Not verified</span>
                  <FlatButton
                              label="RESEND VERIFICATION EMAIL"
                              secondary
                              onTouchTap={ this.props.sendVerificationEmail } />
                  <SendVerificationEmailProgress fetchStatus={ this.props.account.verificationEmailSendingStatus } />
                </div>);
    }
    return null;
  }

  render() {
    return (
    <div>
      <Paper className={ cx( 'paper' ) }>
        <div className={ cx( 'paper-insides', 'flex' ) }>
          <span className={ cx( 'section-header' ) }>Email</span>
          <span>{ this.props.user.email }</span>
        </div>
        { this.getEmailInfo() }
      </Paper>
      <Paper className={ cx( 'paper' ) }>
        <form
              onSubmit={ this.handleOnChangePassword }
              className={ cx( 'paper-insides' ) }>
          <span className={ cx( 'section-header' ) }>Change password</span>
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
      </Paper>
    </div>
    );
  }
}

Account.propTypes = {
  user: PropTypes.object.isRequired,
  authentication: PropTypes.object.isRequired,
  authenticationSelect: PropTypes.object.isRequired,
  account: PropTypes.object.isRequired,
  sendVerificationEmail: PropTypes.func.isRequired,
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
    authenticationSelect: getAuthenticationSelect( state ),
    account: state.account
  };
}

export default connect( mapStateToProps, {
  sendVerificationEmail,
  sendPasswordReset,
  emailTextFieldChange,
  passwordTextFieldChange,
  passwordConfirmationTextFieldChange,
  toggleAuthenticationMode
} )( Account );
