import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const AddSecurityButton = ({addSecurity}) => {

    return (
            <FlatButton
				secondary={true}
                onClick={addSecurity} >
              <ContentAdd />
            </FlatButton>
    );
};

AddSecurityButton.propTypes = {
    addSecurity: PropTypes.func.isRequired,
};

export default AddSecurityButton;