import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';

const InvestmentAmountTextField = ({value, dirty, errorText, hintText, onChange}) => {
  const getDisplayValue = function getDisplayValue(givenValue, givenSetOnce) {
    if (givenSetOnce) {
      return givenValue;
    }
    return '';
  };

  const displayValue = getDisplayValue(value, dirty);

  const handleOnChange = function handleOnChange(event, newValue) {
    onChange(newValue);
  };

  return (
    <TextField
value={displayValue} errorText={errorText} hintText={hintText} onChange={handleOnChange} errorStyle={{ float: 'left' }}
    />
    );
};

InvestmentAmountTextField.propTypes = {
  value: PropTypes.string.isRequired,
  dirty: PropTypes.bool.isRequired,
  errorText: PropTypes.string.isRequired,
  hintText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default InvestmentAmountTextField;
