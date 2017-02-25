import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';

const EmailTextField = ({value, errorText, onChange}) => {
  const handleOnChange = function handleOnChange(event, newValue) {
    onChange(newValue);
  };

  return (
    <TextField
             value={value}
             errorText={errorText}
             onChange={handleOnChange}
             floatingLabelText="Email"
             primary
             fullWidth
             errorStyle={{ float: 'left' }}
            />
  );
};

EmailTextField.propTypes = {
  value: PropTypes.string.isRequired,
  errorText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default EmailTextField;
