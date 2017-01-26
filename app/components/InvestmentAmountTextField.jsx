import React, { Component, PropTypes } from 'react';
import NumberInput from 'material-ui-number-input';

const InvestmentAmountTextField = ({value, errorText, investmentAmountTextFieldChange, investmentAmountTextFieldValid, investmentAmountTextFieldError}) => {

	const handleOnChange = (event, value) => {
	    investmentAmountTextFieldChange(value);
	}
	
	const handleOnValid = () => {
	    investmentAmountTextFieldValid();
	}
	
	const handleOnError = (error) => {
	    investmentAmountTextFieldError(error);
	}

	return (
		 <NumberInput
                    errorStyle={{
                        float: "left"
                    }}
                    id="investmentAmountTextField"
                    value={value}
                    errorText={errorText}					
					onChange={handleOnChange}
					onValid={handleOnValid}
					onError={handleOnError}
                    strategy="allow"
                    required
                />
    );
};

InvestmentAmountTextField.propTypes = {
    value: PropTypes.string.isRequired,
    errorText: PropTypes.string.isRequired,
    investmentAmountTextFieldChange: PropTypes.func.isRequired,
    investmentAmountTextFieldValid: PropTypes.func.isRequired,
    investmentAmountTextFieldError: PropTypes.func.isRequired,
};

export default InvestmentAmountTextField;