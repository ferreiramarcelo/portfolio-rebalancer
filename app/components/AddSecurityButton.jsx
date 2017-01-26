import React, { Component, PropTypes } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const AddSecurityButton = ({addSecurity}) => {

    return (
            <FloatingActionButton
                mini={true}
                onClick={addSecurity} >
              <ContentAdd />
            </FloatingActionButton>
    );
};

AddSecurityButton.propTypes = {
    addSecurity: PropTypes.func.isRequired,
};

export default AddSecurityButton;