import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';

const PasswordTextField = ({value, errorText, onChange}) => {
  const handleOnChange = function handleOnChange(event, newValue) {
    onChange(newValue);
  };

  return (
    <TextField
             value={value}
             errorText={errorText}
             onChange={handleOnChange}
             type="password"
             floatingLabelText="Password"
             primary
             fullWidth
             errorStyle={{ float: 'left' }} />
  );
};

PasswordTextField.propTypes = {
  value: PropTypes.string.isRequired,
  errorText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PasswordTextField;
