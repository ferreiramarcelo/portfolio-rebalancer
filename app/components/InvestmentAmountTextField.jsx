import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';

const InvestmentAmountTextFieldImmutable = ({investmentAmount, investmentAmountTextFieldChange}) => {

	const handleOnChange = (event, value) => {
	    investmentAmountTextFieldChange(value);
	}

    return (
		 <TextField
                    errorStyle={{
                        float: "left"
                    }}
					value={investmentAmount.value}
          errorText={investmentAmount.errorText}
					onChange={handleOnChange}

                />
    );
};

InvestmentAmountTextFieldImmutable.propTypes = {
    investmentAmount: PropTypes.object.isRequired,
		investmentAmountTextFieldChange: PropTypes.func.isRequired,

};

export default InvestmentAmountTextFieldImmutable;
