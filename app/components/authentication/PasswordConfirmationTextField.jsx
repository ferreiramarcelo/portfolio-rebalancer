import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';

const PasswordConfirmationTextField = ({value, errorText, onChange}) => {
  const handleOnChange = (event, value) => {
    onChange(value);
  };

  return (
    <TextField
             value={value}
             errorText={errorText}
             floatingLabelText="Password confirmation"
             primary
             fullWidth
             type="password"
             onChange={handleOnChange}
             errorStyle={{ float: 'left' }} />
  );
};

PasswordConfirmationTextField.propTypes = {
  value: PropTypes.string.isRequired,
  errorText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PasswordConfirmationTextField;
