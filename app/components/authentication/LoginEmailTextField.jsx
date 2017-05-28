import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import ActionDone from 'material-ui/svg-icons/action/done';
import AlertErrorOutline from 'material-ui/svg-icons/alert/error-outline';
import classNames from 'classnames/bind';
import * as constants from '../../constants';
import styles from '../../css/components/authentication/authentication-field';

const cx = classNames.bind(styles);

const LoginEmailTextField = ({emailTextField, emailTextFieldSelect, onChange}) => {
  const handleOnChange = function handleOnChange(event, newValue) {
    onChange(newValue);
  };

  const getIndicator = function getIndicator() {
    switch (emailTextField.validationStatus) {
      case constants.VALIDATION_CONFLICT:
        return <ActionDone className={cx('indicator')} />;
      case constants.VALIDATION_NO_CONFLICT:
        return <AlertErrorOutline className={cx('indicator')} />;
      case constants.IS_VALIDATING:
        return (<CircularProgress size={20} thickness={3} className={cx('indicator')} />);
      default:
        return null;
    }
  };
  const indicator = getIndicator();

  return (
    <div className={cx('flex')}>
      <TextField
value={emailTextField.value} errorText={emailTextFieldSelect.errorText} onChange={handleOnChange} floatingLabelText="Email" primary fullWidth errorStyle={{ float: 'left' }}
      />
      { indicator }
    </div>
    );
};

LoginEmailTextField.propTypes = {
  emailTextField: PropTypes.object.isRequired,
  emailTextFieldSelect: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default LoginEmailTextField;
