import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import ContentCreate from 'material-ui/svg-icons/content/create';

import classNames from 'classnames/bind';
import styles from '../css/components/new-portfolio-button';
const cx = classNames.bind( styles );

const NewPortfolioButton = ({createNewPortfolio}) => {

  return (
    <div className={ cx( 'new-portfolio-button-container' ) }>
  <FlatButton
              label="NEW"
              onTouchTap={ createNewPortfolio }
              labelPosition="before"
              secondary={ true } />
            </div>

  );
};

NewPortfolioButton.propTypes = {
  createNewPortfolio: PropTypes.func.isRequired,
};

export default NewPortfolioButton;
