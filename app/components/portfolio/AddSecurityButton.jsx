import React, { PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const AddSecurityButton = ({addSecurity}) => {
  return (
    <IconButton
              onTouchTap={addSecurity}
              touch>
      <ContentAdd />
    </IconButton>
  );
};

AddSecurityButton.propTypes = {
  addSecurity: PropTypes.func.isRequired,
};

export default AddSecurityButton;
