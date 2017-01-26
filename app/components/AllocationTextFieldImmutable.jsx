import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import NumberInput from 'material-ui-number-input';

const AllocationTextFieldImmutable = ({index, value, errorText, onSecurityTextFieldChange, onSecurityTextFieldValid, onSecurityTextFieldError}) => {

	const handleOnChange = (event, value) => {
	    onSecurityTextFieldChange(index, 'allocation', value);
	}
	
	const handleOnValid = () => {
	    onSecurityTextFieldValid(index, 'allocation');
	}
	
	const handleOnError = (error) => {
	    onSecurityTextFieldError(index, 'allocation', error);
	}

    return (
		 <NumberInput
                    errorStyle={{
                        float: "left"
                    }}
					id={'allocationTextField'+index}
					value={value}
                    errorText={errorText}					
					onChange={handleOnChange}
					onValid={handleOnValid}
					onError={handleOnError}
                    strategy="allow"
                    required
					min={0}
					max={100}
                />
    );
};

AllocationTextFieldImmutable.propTypes = {
    index: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    errorText: PropTypes.string.isRequired,
	onSecurityTextFieldChange: PropTypes.func.isRequired,
	onSecurityTextFieldValid: PropTypes.func.isRequired,
    onSecurityTextFieldError: PropTypes.func.isRequired,
};

export default AllocationTextFieldImmutable;