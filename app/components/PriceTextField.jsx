import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';

const PriceTextFieldImmutable = ({index, price, securityTextFieldChange}) => {

	const handleOnChange = (event, value) => {
	    securityTextFieldChange(index, 'price', value);
	}

    return (
		 <TextField
                    errorStyle={{
                        float: "left"
                    }}
					id={'priceTextField'+index}
					value={price.value}
                    errorText={price.errorText}
					onChange={handleOnChange}

                />
    );
};

PriceTextFieldImmutable.propTypes = {
    index: PropTypes.number.isRequired,
    price: PropTypes.object.isRequired,
	securityTextFieldChange: PropTypes.func.isRequired,

};

export default PriceTextFieldImmutable;
