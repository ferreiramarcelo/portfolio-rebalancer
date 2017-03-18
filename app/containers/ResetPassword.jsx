import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import LinearProgress from 'material-ui/LinearProgress';
import CircularProgress from 'material-ui/CircularProgress';
import classNames from 'classnames/bind';
import { emailTextFieldChange, passwordTextFieldChange, passwordConfirmationTextFieldChange, toggleAuthenticationMode, changePasswordPressWithToken } from '../actions/authentications';
import { register } from '../actions/users';
import PasswordTextField from '../components/authentication/PasswordTextField';
import { getAuthenticationSelect } from '../selectors/index';
import styles from '../css/containers/authentication';
import * as constants from '../constants';

const cx = classNames.bind(styles);

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnChangePassword = this.handleOnChangePassword.bind(this);
  }

  getChangePasswordForm() {
    return (
      <Paper className={cx('paper')}>
        <div className={cx('paper-insides')}>
          <form onSubmit={this.handleOnChangePassword}>
            <span>Reset your password</span>
            <PasswordTextField
                             passwordTextField={this.props.authentication.passwordTextField}
                             passwordTextFieldSelect={this.props.authenticationSelect.passwordTextFieldSelect}
                             onChange={this.props.passwordTextFieldChange}
                             label={'New password'} />
            <PasswordTextField
                             passwordTextField={this.props.authentication.passwordConfirmationTextField}
                             passwordTextFieldSelect={this.props.authenticationSelect.passwordConfirmationTextFieldSelect}
                             onChange={this.props.passwordConfirmationTextFieldChange}
                             label={'Confirm new password'} />
            <span>{ this.props.user.message.value }</span>
            { this.getChangePasswordButton() }
          </form>
        </div>
      </Paper>);
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
                                className={cx('submit-button')} />
          <LinearProgress mode="indeterminate" />
        </div>);
      case constants.NOT_PROCESSING:
      default:
        return (<RaisedButton
                              type="submit"
                              label="CHANGE PASSWORD"
                              fullWidth
                              primary
                              className={cx('submit-button')} />);
    }
  }

  handleOnChangePassword(event) {
    event.preventDefault();
    this.props.changePasswordPressWithToken(this.props.params.token);
  }

  render() {
    switch (this.props.authentication.getPasswordResetTokenValidityStatus) {
      case constants.IS_PROCESSING:
        return (<Paper className={cx('paper')}>
          <div className={cx('paper-insides')}>
            <span className={cx('block')}>Verifying password reset token...</span>
            <CircularProgress
                                      size={100}
                                      thickness={6} />
          </div>
        </Paper>);
      case constants.PROCESS_FAILED:
        return (<Paper className={cx('paper')}>
          <div className={cx('paper-insides')}>
            <span>Password reset token appears to be expired.</span>
            <FlatButton
                                label="BACK TO LOGIN"
                                secondary
                                containerElement={<Link to="/login" />} />
          </div>
        </Paper>);
      case constants.PROCESS_SUCCEDEED:
        return this.getChangePasswordForm();
      case constants.NOT_PROCESSING:
      default:
        return null;
    }
  }
}

ResetPassword.propTypes = {
  user: PropTypes.object.isRequired,
  authentication: PropTypes.object.isRequired,
  authenticationSelect: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  emailTextFieldChange: PropTypes.func.isRequired,
  passwordTextFieldChange: PropTypes.func.isRequired,
  passwordConfirmationTextFieldChange: PropTypes.func.isRequired,
  toggleAuthenticationMode: PropTypes.func.isRequired,
  changePasswordPressWithToken: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
    authentication: state.authentication,
    authenticationSelect: getAuthenticationSelect(state)
  };
}

export default connect(mapStateToProps, {
  register,
  emailTextFieldChange,
  passwordTextFieldChange,
  passwordConfirmationTextFieldChange,
  toggleAuthenticationMode,
  changePasswordPressWithToken
})(ResetPassword);
