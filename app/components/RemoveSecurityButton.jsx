import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconButton from 'material-ui/IconButton';
import ContentClear from 'material-ui/svg-icons/content/clear';
import classNames from 'classnames/bind';
import styles from '../css/components/portfolio-table';

const cx = classNames.bind(styles);

const RemoveSecurityButton = ({index, removeSecurity}) => {

    const handleRemoveSecurity = () => {
        removeSecurity(index);
    }

    return (
			<FlatButton
            onClick={handleRemoveSecurity}
			icon={<ContentClear />}
			style={{minWidth: '20px' }}
		/>

    );
};

RemoveSecurityButton.propTypes = {
    removeSecurity: PropTypes.func.isRequired,
};

export default RemoveSecurityButton;