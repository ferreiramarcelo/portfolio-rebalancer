import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';

const AllocationTextFieldImmutable = ({index, allocation, allocationSelect, securityTextFieldChange}) => {
  const getDisplayValue = (allocation) => {
    if (!allocation.setOnce) {
      return '';
    }
    return allocation.value;
  };

  const displayValue = getDisplayValue(allocation);

  const handleOnChange = (event, value) => {
    securityTextFieldChange(index, 'allocation', value);
  };

  return (
    <TextField
             errorStyle={{ float: 'left' }}
             id={'allocationTextField' + index}
             value={displayValue}
             errorText={allocationSelect.errorText}
             hintText={allocationSelect.hintText}
             onChange={handleOnChange} />
  );
};

AllocationTextFieldImmutable.propTypes = {
  index: PropTypes.number.isRequired,
  allocation: PropTypes.object.isRequired,
  securityTextFieldChange: PropTypes.func.isRequired,
};

export default AllocationTextFieldImmutable;
