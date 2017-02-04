import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';

import classNames from 'classnames/bind';
import styles from '../css/components/portfolio-table/delete-model-portfolio-button';

const cx = classNames.bind(styles);

const DeleteModelPortfolioButton = ({id, deleteModelPortfolio, isDisabled}) => {

  const handleOnClick = () => {
    deleteModelPortfolio(id);
  }

  return (
    <IconButton className={ cx('DeleteModelPortfolioButton') } tooltipPosition={ 'bottom-left' } tooltip="Delete model portfolio" disabled={ isDisabled } touch={ true }
      onTouchTap={ handleOnClick }>
      <ActionDeleteForever />
    </IconButton>
    );
};

DeleteModelPortfolioButton.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  deleteModelPortfolio: PropTypes.func.isRequired,
};

export default DeleteModelPortfolioButton;
