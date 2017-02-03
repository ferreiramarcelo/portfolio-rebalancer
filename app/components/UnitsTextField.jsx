import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';

const UnitsTextFieldImmutable = ({index, units, securityTextFieldChange}) => {

	const handleOnChange = (event, value) => {
	    securityTextFieldChange(index, 'units', value);
	}

    return (
		 <TextField
                    errorStyle={{
                        float: "left"
                    }}
					id={'unitsTextField'+index}
					value={units.value}
                    errorText={units.errorText}
					onChange={handleOnChange}

                />
    );
};

UnitsTextFieldImmutable.propTypes = {
    index: PropTypes.number.isRequired,
    units: PropTypes.object.isRequired,
	securityTextFieldChange: PropTypes.func.isRequired,

};

export default UnitsTextFieldImmutable;
