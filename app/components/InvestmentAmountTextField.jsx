import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';

const InvestmentAmountTextFieldImmutable = ({investmentAmount, investmentAmountSelect, investmentAmountTextFieldChange}) => {

  const getDisplayValue = (investmentAmount) => {
    if ( !investmentAmount.setOnce ) {
      return '';
    }
    return investmentAmount.value;
  }

  const displayValue = getDisplayValue( investmentAmount );

  const handleOnChange = (event, value) => {
    investmentAmountTextFieldChange( value );
  }

  return (
  <TextField
             errorStyle={ { float: "left" } }
             value={ displayValue }
             errorText={ investmentAmountSelect.errorText }
             hintText={ investmentAmountSelect.hintText }
             onChange={ handleOnChange } />
  );
};

InvestmentAmountTextFieldImmutable.propTypes = {
  investmentAmount: PropTypes.object.isRequired,
  investmentAmountSelect: PropTypes.object.isRequired,
  investmentAmountTextFieldChange: PropTypes.func.isRequired,
};

export default InvestmentAmountTextFieldImmutable;
