import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import classNames from 'classnames/bind';
import styles from '../../css/components/new-portfolio-button';

const cx = classNames.bind(styles);

const NewPortfolioButton = ({createNewPortfolio}) => {
  return (
    <div className={cx('new-portfolio-button-container')}>
      <FlatButton
                onTouchTap={createNewPortfolio}
                label="NEW"
                labelPosition="before"
                secondary />
    </div>

  );
};

NewPortfolioButton.propTypes = {
  createNewPortfolio: PropTypes.func.isRequired,
};

export default NewPortfolioButton;
