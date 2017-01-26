import React, { Component, PropTypes } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import classNames from 'classnames/bind';
import styles from '../css/components/portfolio-table';

const cx = classNames.bind(styles);

const RemoveSecurityButton = ({index, removeSecurity}) => {

    const handleRemoveSecurity = () => {
        removeSecurity(index);
    }

    return (
            <FloatingActionButton className={cx('SecurityButton')}
                mini={true}
                onClick={handleRemoveSecurity} >
              <ContentRemove />
            </FloatingActionButton>

    );
};

RemoveSecurityButton.propTypes = {
    removeSecurity: PropTypes.func.isRequired,
};

export default RemoveSecurityButton;