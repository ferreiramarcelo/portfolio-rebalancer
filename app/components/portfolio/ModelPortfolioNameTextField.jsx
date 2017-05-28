import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';

const ModelPortfolioNameTextField = ({value, errorText, onChange}) => {
  const handleOnChange = function handleOnChange(event, newValue) {
    onChange(newValue);
  };

  return (
    <TextField
value={value} errorText={errorText} onChange={handleOnChange} hintText="Model Portfolio Name" fullWidth errorStyle={{ float: 'left' }}
      inputStyle={{ textAlign: 'center', }} hintStyle={{ textAlign: 'center', }} />
    );
};

ModelPortfolioNameTextField.propTypes = {
  value: PropTypes.string.isRequired,
  errorText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default ModelPortfolioNameTextField;
