import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import NumberInput from 'material-ui-number-input';
import CircularProgress from 'material-ui/CircularProgress';

const PriceTextFieldImmutable = ({index, value, errorText, onSecurityTextFieldChange, onSecurityTextFieldValid, onSecurityTextFieldError}) => {

	const handleOnChange = (event, value) => {
	    onSecurityTextFieldChange(index, 'price', value);
	}
	
	const handleOnValid = () => {
	    onSecurityTextFieldValid(index, 'price');
	}
	
	const handleOnError = (error) => {
	    onSecurityTextFieldError(index, 'price', error);
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
	onSecurityTextFieldChange: PropTypes.func.isRequired,
	onSecurityTextFieldValid: PropTypes.func.isRequired,
    onSecurityTextFieldError: PropTypes.func.isRequired,
};

export default PriceTextFieldImmutable;