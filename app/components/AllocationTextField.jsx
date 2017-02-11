import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';

const AllocationTextFieldImmutable = ({index, allocation, securityTextFieldChange}) => {

  const handleOnChange = (event, value) => {
    securityTextFieldChange( index, 'allocation', value );
  }

  return (
  <TextField
             errorStyle={ { float: "left" } }
             id={ 'allocationTextField' + index }
             hintText='0'
             value={ allocation.value }
             errorText={ allocation.errorText }
             onChange={ handleOnChange } />
  );
};

AllocationTextFieldImmutable.propTypes = {
  index: PropTypes.number.isRequired,
  allocation: PropTypes.object.isRequired,
  securityTextFieldChange: PropTypes.func.isRequired,
};

export default AllocationTextFieldImmutable;
