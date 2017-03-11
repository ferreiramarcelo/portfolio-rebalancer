import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';

const LoginPasswordTextField = ({passwordTextField, passwordTextFieldSelect, onChange, label}) => {
  const handleOnChange = function handleOnChange(event, newValue) {
    onChange(newValue);
  };

  return (
    <TextField
             value={passwordTextField.value}
             errorText={passwordTextFieldSelect.errorText}
             onChange={handleOnChange}
             floatingLabelText={label}
             type="password"
             fullWidth
             errorStyle={{ float: 'left' }} />
  );
};

LoginPasswordTextField.propTypes = {
  passwordTextField: PropTypes.object.isRequired,
  passwordTextFieldSelect: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default LoginPasswordTextField;
