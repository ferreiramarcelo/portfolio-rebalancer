import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';

const PasswordTextField = ({value, errorText, onChange}) => {

  const handleOnChange = (event, value) => {
    onChange( value );
  }

  return (
  <TextField
             value={ value }
             errorText={ errorText }
             floatingLabelText='Password'
             primary={ true }
             fullWidth={ true }
             type="password"
             onChange={ handleOnChange }
             errorStyle={ { float: "left" } } />
  );
};

PasswordTextField.propTypes = {
  value: PropTypes.string.isRequired,
  errorText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PasswordTextField;
