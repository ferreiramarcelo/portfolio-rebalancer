import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';

const UnitsTextFieldImmutable = ({index, units, unitsSelect, securityTextFieldChange}) => {

  const getDisplayValue = (units) => {
    if (!units.setOnce) {
      return '';
    }
    return units.value;
  }

  const displayValue = getDisplayValue(units);

  const handleOnChange = (event, value) => {
    securityTextFieldChange( index, 'units', value );
  }

  return (
  <TextField
             errorStyle={ { float: "left" } }
             id={ 'unitsTextField' + index }
             value={ displayValue }
             errorText={ unitsSelect.errorText }
             hintText={ unitsSelect.hintText }
             onChange={ handleOnChange } />
  );
};

UnitsTextFieldImmutable.propTypes = {
  index: PropTypes.number.isRequired,
  units: PropTypes.object.isRequired,
  securityTextFieldChange: PropTypes.func.isRequired,
};

export default UnitsTextFieldImmutable;
