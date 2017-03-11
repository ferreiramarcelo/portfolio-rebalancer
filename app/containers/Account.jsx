import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import FontAwesome from 'react-fontawesome';
import LinearProgress from 'material-ui/LinearProgress';
import classNames from 'classnames/bind';
import { emailTextFieldChange, passwordTextFieldChange, currentPasswordTextFieldChange, passwordConfirmationTextFieldChange, toggleAuthenticationMode, changePasswordPress } from '../actions/authentications';
import { sendVerificationEmail } from '../actions/users';
import PasswordTextField from '../components/authentication/PasswordTextField';
import LoginPasswordTextField from '../components/authentication/LoginPasswordTextField';
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

  getEmailInfo() {
    if ( this.props.user.accountType === constants.ACCOUNT_TYPE_GOOGLE ) {
      return (<div className={ cx( 'paper-insides', 'flex' ) }>
                <FontAwesome
                             name="google"
                             className={ cx( 'google-icon' ) } />
                <span>Logged in through Google Sign-In</span>
              </div>);
    }
    if ( !this.props.user.verified ) {
      return (<div className={ cx( 'paper-insides', 'flex' ) }>
                <div className={ cx( 'flex-left' ) }>
                  <span>Not verified</span>
                </div>
                <div className={ cx( 'flex-right' ) }>
                  <SendVerificationEmailProgress fetchStatus={ this.props.account.verificationEmailSendingStatus } />
                  <FlatButton
                              label="RESEND EMAIL"
                              secondary
                              onTouchTap={ this.props.sendVerificationEmail } />
                </div>
              </div>);
    }
    return null;
  }

  getChangePasswordButton() {
    switch (this.props.authentication.passwordChangeStatus) {
      case constants.IS_PROCESSING:
        return (<div>
                  <RaisedButton
                                type="submit"
                                label="CHANGING PASSWORD..."
                                fullWidth
                                primary
                                disabled
                                className={ cx( 'submit-button') } />
                  <LinearProgress mode="indeterminate" />
                </div>);
      case constants.NOT_PROCESSING:
      default:
        return (<RaisedButton
                              type="submit"
                              label="CHANGE PASSWORD"
                              fullWidth
                              primary
                              className={ cx( 'submit-button', 'submit-button-not-loading' ) } />);
    }
  }

  handleOnChangePassword( event ) {
    event.preventDefault();
    this.props.changePasswordPress();
  }

  getChangePasswordForm() {
    if ( this.props.user.accountType === constants.ACCOUNT_TYPE_INTERNAL ) {
      return (<Paper className={ cx( 'paper' ) }>
                <form
                      onSubmit={ this.handleOnChangePassword }
                      className={ cx( 'paper-insides' ) }>
                  <span className={ cx( 'section-header' ) }>Change password</span>
                  <LoginPasswordTextField
                                          passwordTextField={ this.props.authentication.currentPasswordTextField }
                                          passwordTextFieldSelect={ this.props.authenticationSelect.currentPasswordTextFieldSelect }
                                          onChange={ this.props.currentPasswordTextFieldChange }
                                          label={ 'Current password' } />
                  <PasswordTextField
                                     passwordTextField={ this.props.authentication.passwordTextField }
                                     passwordTextFieldSelect={ this.props.authenticationSelect.passwordTextFieldSelect }
                                     onChange={ this.props.passwordTextFieldChange }
                                     label={ 'New password' } />
                  <PasswordTextField
                                     passwordTextField={ this.props.authentication.passwordConfirmationTextField }
                                     passwordTextFieldSelect={ this.props.authenticationSelect.passwordConfirmationTextFieldSelect }
                                     onChange={ this.props.passwordConfirmationTextFieldChange }
                                     label={ 'Confirm new password' } />
                  <span className={ cx('message', this.props.user.message.type) }>{ this.props.user.message.value }</span>
                  { this.getChangePasswordButton() }
                </form>
              </Paper>);
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
      { this.getChangePasswordForm() }
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
  changePasswordPress: PropTypes.func.isRequired,
  emailTextFieldChange: PropTypes.func.isRequired,
  passwordTextFieldChange: PropTypes.func.isRequired,
  passwordConfirmationTextFieldChange: PropTypes.func.isRequired,
  currentPasswordTextFieldChange: PropTypes.func.isRequired,
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
  changePasswordPress,
  emailTextFieldChange,
  passwordTextFieldChange,
  passwordConfirmationTextFieldChange,
  currentPasswordTextFieldChange,
  toggleAuthenticationMode
} )( Account );
