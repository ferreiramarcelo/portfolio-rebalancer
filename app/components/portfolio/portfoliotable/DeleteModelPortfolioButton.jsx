import React, { PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';
import ReactTooltip from 'react-tooltip';
import classNames from 'classnames/bind';
import styles from '../../../css/components/portfolio-table/delete-model-portfolio-button';

const cx = classNames.bind(styles);

const DeleteModelPortfolioButton = ({id, deleteModelPortfolio, visibility}) => {
  const handleOnClick = () => {
    deleteModelPortfolio(id);
  };

  const getDeleteModelPortfolioButton = function getDeleteModelPortfolioButtonFunc(givenVisbility) {
    switch (givenVisbility) {
      case 'visible':
        return (<div>
          <IconButton
                              onTouchTap={handleOnClick}
                              touch
                              className={cx('DeleteModelPortfolioButton')}>
            <ActionDeleteForever />
          </IconButton>
          <ReactTooltip id="deleteModelPortfolioButtonTooltip">
            <p>
                      Delete model portfolio
                    </p>
          </ReactTooltip>
        </div>);
      case 'disabled':
        return (<div>
          <IconButton
                              disabled
                              onTouchTap={handleOnClick}
                              touch
                              className={cx('DeleteModelPortfolioButton')}>
            <ActionDeleteForever />
          </IconButton>
          <ReactTooltip id="deleteModelPortfolioButtonTooltip">
            <p>
                      Delete model portfolio
                    </p>
          </ReactTooltip>
        </div>);
      case 'hidden':
      default:
        return null;
    }
  };

  const deleteModelPortfolioButton = getDeleteModelPortfolioButton(visibility);

  return (
    <div
       data-tip
       data-for="deleteModelPortfolioButtonTooltip"
       className={cx('DeleteModelPortfolioDiv')}>
      { deleteModelPortfolioButton }
    </div>
  );
};

DeleteModelPortfolioButton.propTypes = {
  id: PropTypes.string.isRequired,
  deleteModelPortfolio: PropTypes.func.isRequired,
  visibility: PropTypes.string.isRequired
};

export default DeleteModelPortfolioButton;
