import React, { Component, PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const AddSecurityButton = ({addSecurity}) => {

  return (
    <IconButton onClick={ addSecurity } touch={ true }>
      <ContentAdd />
    </IconButton>
    );
};

AddSecurityButton.propTypes = {
  addSecurity: PropTypes.func.isRequired,
};

export default AddSecurityButton;
