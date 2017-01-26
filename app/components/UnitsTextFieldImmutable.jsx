import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import NumberInput from 'material-ui-number-input';

const UnitsTextFieldImmutable = ({index, value, errorText, onSecurityTextFieldChange, onSecurityTextFieldValid, onSecurityTextFieldError}) => {

	const handleOnChange = (event, value) => {
	    onSecurityTextFieldChange(index, 'units', value);
	}
	
	const handleOnValid = () => {
	    onSecurityTextFieldValid(index, 'units');
	}
	
	const handleOnError = (error) => {
	    onSecurityTextFieldError(index, 'units', error);
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
	onSecurityTextFieldChange: PropTypes.func.isRequired,
	onSecurityTextFieldValid: PropTypes.func.isRequired,
    onSecurityTextFieldError: PropTypes.func.isRequired,
};

export default UnitsTextFieldImmutable;