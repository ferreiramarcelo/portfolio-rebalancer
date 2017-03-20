import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import classNames from 'classnames/bind';
import { requestClose } from '../actions/messages';
import { sendVerificationEmail, sendPasswordReset } from '../actions/users';
import * as constants from '../constants';
import styles from '../css/containers/message';

const cx = classNames.bind(styles);

const Message = ({open, response, email, requestClose, sendVerificationEmail, sendPasswordReset}) => {
  const getMessage = function getMessage() {
    switch (response) {
      case constants.RESPONSE_SEND_VERIFICATION_EMAIL_SUCCESS:
        return 'Verification email sent to ' + email;
      case constants.RESPONSE_SEND_VERIFICATION_EMAIL_FAILURE:
        return 'Failed to send verification email to ' + email;
      case constants.RESPONSE_LOG_IN_EMAIL_NOT_VERIFIED:
        return 'Email not verified';
      case constants.RESPONSE_VERIFY_INVALID_VERIFICATION_TOKEN:
        return 'Invalid verification token';
      case constants.RESPONSE_VERIFY_FAILURE:
        return 'Failed to verify email';
      case constants.RESPONSE_VERIFY_SUCCESS:
        return 'Email successfuly verified';
      case constants.RESPONSE_SEND_PASSWORD_RESET_SUCCESS:
        return 'Password reset email sent';
      case constants.RESPONSE_SEND_PASSWORD_RESET_FAILURE:
        return 'Failed to send password reset email';
      case constants.RESPONSE_SEND_VERIFICATION_EMAIL_NOT_FOUND:
        return 'Account not found';
      case constants.RESPONSE_PASSWORD_RESET_SUCCESS:
        return 'Password change successful';
      default:
        return '';
    }
  };
  const message = getMessage();

  const getActionLabel = function getActionLabel() {
    switch (response) {
      case constants.RESPONSE_LOG_IN_EMAIL_NOT_VERIFIED:
      case constants.RESPONSE_REGISTER_VERIFICATION_EMAIL_NOT_SENT:
      case constants.RESPONSE_VERIFY_INVALID_VERIFICATION_TOKEN:
      case constants.RESPONSE_VERIFY_FAILURE:
      case constants.RESPONSE_SEND_PASSWORD_RESET_FAILURE:
        return 'RESEND VERIFICATION EMAIL';
      default:
        return '';
    }
  };
  const actionLabel = getActionLabel();

  const getAction = function getAction() {
    switch (response) {
      case constants.RESPONSE_LOG_IN_EMAIL_NOT_VERIFIED:
      case constants.RESPONSE_REGISTER_VERIFICATION_EMAIL_NOT_SENT:
      case constants.RESPONSE_VERIFY_INVALID_VERIFICATION_TOKEN:
      case constants.RESPONSE_VERIFY_FAILURE:
        return sendVerificationEmail;
      case constants.RESPONSE_SEND_PASSWORD_RESET_FAILURE:
        return sendPasswordReset;
      default:
        return null;
    }
  };
  const action = getAction();

  const handleOnAction = function handleOnAction() {
    requestClose();
    action();
  };

  const getSnackbar = function getSnackbar() {
    if (message.length > 0) {
      return (<Snackbar open={ open } message={ message } autoHideDuration={ 4000 } onRequestClose={ requestClose } action={ actionLabel }
                onActionTouchTap={ handleOnAction } />);
    }
    return null;
  };
  const snackbar = getSnackbar();

  return (
    <div>
      { snackbar }
    </div>
    );
};

Message.propTypes = {
  open: PropTypes.bool.isRequired,
  response: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  requestClose: PropTypes.func.isRequired,
  sendVerificationEmail: PropTypes.func.isRequired,
  sendPasswordReset: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    open: state.message.open,
    response: state.message.response,
    email: state.user.email
  };
}

export default connect(mapStateToProps, {
  requestClose,
  sendVerificationEmail,
  sendPasswordReset
})(Message);
