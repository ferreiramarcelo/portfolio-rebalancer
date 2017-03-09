import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import ActionDone from 'material-ui/svg-icons/action/done';
import classNames from 'classnames/bind';
import styles from '../../css/components/authentication/authentication-field';

const cx = classNames.bind(styles);

const LoginPasswordTextField = ({passwordTextField, passwordTextFieldSelect, onChange, label}) => {
  const handleOnChange = function handleOnChange(event, newValue) {
    onChange(newValue);
  };

  return (
    <TextField
             value={passwordTextField.value}
             errorText={passwordTextFieldSelect.errorText}
             onChange={handleOnChange}
             type="password"
             floatingLabelText={label}
             fullWidth
             errorStyle={{ float: 'left' }} />
  );
};

LoginPasswordTextField.propTypes = {
  value: PropTypes.string.isRequired,
  errorText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default LoginPasswordTextField;
