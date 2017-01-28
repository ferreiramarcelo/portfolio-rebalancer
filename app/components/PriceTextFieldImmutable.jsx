import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import NumberInput from 'material-ui-number-input';
import CircularProgress from 'material-ui/CircularProgress';

const PriceTextFieldImmutable = ({index, value, errorText, securityTextFieldChange, securityTextFieldValid, securityTextFieldError}) => {

	const handleOnChange = (event, value) => {
	    securityTextFieldChange(index, 'price', value);
	}
	
	const handleOnValid = () => {
	    securityTextFieldValid(index, 'price');
	}
	
	const handleOnError = (error) => {
	    securityTextFieldError(index, 'price', error);
	}

	return (
		 <NumberInput
                    errorStyle={{
                        float: "left"
                    }}
					id={'priceTextField'+index}
                    value={value}
                    errorText={errorText}					
					onChange={handleOnChange}
					onValid={handleOnValid}
					onError={handleOnError}
                    strategy="allow"
                    required
					min={0.01}
                />
    );
};

PriceTextFieldImmutable.propTypes = {
    index: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    errorText: PropTypes.string.isRequired,
	securityTextFieldChange: PropTypes.func.isRequired,
	securityTextFieldValid: PropTypes.func.isRequired,
    securityTextFieldError: PropTypes.func.isRequired,
};

export default PriceTextFieldImmutable;