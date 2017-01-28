import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import NumberInput from 'material-ui-number-input';

const UnitsTextFieldImmutable = ({index, value, errorText, securityTextFieldChange, securityTextFieldValid, securityTextFieldError}) => {

	const handleOnChange = (event, value) => {
	    securityTextFieldChange(index, 'units', value);
	}
	
	const handleOnValid = () => {
	    securityTextFieldValid(index, 'units');
	}
	
	const handleOnError = (error) => {
	    securityTextFieldError(index, 'units', error);
	}

    return (
		 <NumberInput
                    errorStyle={{
                        float: "left"
                    }}
					id={'unitsTextField'+index}
                    value={value}
                    errorText={errorText}					
					onChange={handleOnChange}
					onValid={handleOnValid}
					onError={handleOnError}
                    strategy="allow"
                    required
					min={0}
                />
    );
};

UnitsTextFieldImmutable.propTypes = {
    index: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    errorText: PropTypes.string.isRequired,
	securityTextFieldChange: PropTypes.func.isRequired,
	securityTextFieldValid: PropTypes.func.isRequired,
    securityTextFieldError: PropTypes.func.isRequired,
};

export default UnitsTextFieldImmutable;