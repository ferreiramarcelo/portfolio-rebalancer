import React, { PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import ContentClear from 'material-ui/svg-icons/content/clear';
import classNames from 'classnames/bind';
import styles from '../../../css/components/portfolio/portfolio-table/remove-security-button';

const cx = classNames.bind(styles);

const RemoveSecurityButton = ({index, removeSecurity}) => {
  const handleRemoveSecurity = function handleRemoveSecurity() {
    removeSecurity(index);
  };

  return (
    <IconButton onClick={handleRemoveSecurity} touch className={cx('remove-security-button')}>
      <ContentClear />
    </IconButton>

    );
};

RemoveSecurityButton.propTypes = {
  index: PropTypes.number.isRequired,
  removeSecurity: PropTypes.func.isRequired,
};

export default RemoveSecurityButton;
