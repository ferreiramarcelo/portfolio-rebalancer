import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import classNames from 'classnames/bind';
import styles from '../../css/components/portfolioselection/new-portfolio-button';

const cx = classNames.bind(styles);

const NewPortfolioButton = ({createNewModelPortfolio}) => {
  return (
    <div className={cx('new-portfolio-button-container')}>
      <FlatButton onClick={createNewModelPortfolio} label="NEW" labelPosition="before" secondary />
    </div>

    );
};

NewPortfolioButton.propTypes = {
  createNewModelPortfolio: PropTypes.func.isRequired,
};

export default NewPortfolioButton;
