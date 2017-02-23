import React, { PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import ContentClear from 'material-ui/svg-icons/content/clear';
import classNames from 'classnames/bind';
import styles from '../../../css/components/portfolio/portfolio-table/remove-security-button';

const cx = classNames.bind(styles);

const RemoveSecurityButton = ({index, removeSecurity}) => {
  const handleRemoveSecurity = () => {
    removeSecurity(index);
  };

  return (
    <IconButton
              className={cx('remove-security-button')}
              onClick={handleRemoveSecurity}
              touch>
      <ContentClear />
    </IconButton>

  );
};

RemoveSecurityButton.propTypes = {
  removeSecurity: PropTypes.func.isRequired,
};

export default RemoveSecurityButton;
