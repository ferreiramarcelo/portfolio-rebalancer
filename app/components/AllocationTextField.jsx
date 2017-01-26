import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import NumberInput from 'material-ui-number-input';


export default class AllocationTextfield extends React.Component {
	constructor(props) {
        super(props);
        this.state = { value: '', valid: 0, errorText: '' };
    }
	
	setValue(value) {
        this.setState({ value: value });
    }

    onChange(event, value) {
        this.setValue(value);
    }

    onValid(valid) {
        this.setState({ valid: valid });
    }

    onError(error) {
        let errorText;
		console.log(error);
		switch (error) {
			  case 'required':
					errorText = 'This field is required';
					break;
			  case 'invalidSymbol':
					errorText = 'Allocation must be a number';
					break;
			  case 'incompleteNumber':
					errorText = 'Number is incomplete';
					break;
			  case 'singleMinus':
					errorText = 'Allocation cannot be below 0';
					break;
			  case 'singleFloatingPoint':
					errorText = 'There is already a floating point';
					break;
			  case 'singleZero':
					errorText = 'Floating point is expected';
					break;
			  case 'min':
					errorText = 'Allocation must be at least 0';
					break;
			  case 'max':
					errorText = 'Allocation must be at most 100';
					break;
		  }
		this.setState({ errorText: errorText });
    }

    render() {
        const { value, valid, errorText } = this.state;
        return (
            <div>
                <NumberInput
                    value={value}
					onChange={(event, value) => this.onChange(event, value)}
					onValid={(valid) => this.onValid(valid)}
                    errorText={errorText}
					onError={(error) => this.onError(error)}
                    strategy="allow"
                    required
					min={0}
					max={100}
                />
            </div>
        );
    }
}

AllocationTextfield.propTypes = {
	allocation: PropTypes.number,
};