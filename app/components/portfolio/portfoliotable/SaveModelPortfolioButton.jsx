import React, { PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import ContentSave from 'material-ui/svg-icons/content/save';
import ReactTooltip from 'react-tooltip';
import classNames from 'classnames/bind';
import styles from '../../../css/components/portfolio-table/save-model-portfolio-button';

const cx = classNames.bind(styles);

const SaveModelPortfolioButton = ({visibility, portfolio, selectedModelPortfolio, saveModelPortfolio}) => {
  const handleOnClick = () => {
    saveModelPortfolio(selectedModelPortfolio, portfolio);
  };

  const getSaveModelPortfolioButton = function getSaveModelPortfolioButtonFunc(givenVisibility) {
    switch (givenVisibility) {
      case 'visible':
        return (<div>
          <IconButton
                             className={cx('SaveModelPortfolioButton')}
                             touch
                             onTouchTap={handleOnClick}>
            <ContentSave />
          </IconButton>
          <ReactTooltip id="saveModelPortfolioButtonTooltip">
            <p>
                     Save model portfolio
                   </p>
          </ReactTooltip>
        </div>);
      case 'disabled':
        return (<div>
          <IconButton
                             disabled
                             className={cx('SaveModelPortfolioButton')}
                             touch
                             onTouchTap={handleOnClick}>
            <ContentSave />
          </IconButton>
          <ReactTooltip id="saveModelPortfolioButtonTooltip">
            <p>
                     Save model portfolio
                   </p>
          </ReactTooltip>
        </div>);
      case 'hidden':
      default:
        return null;
    }
  };

  const saveModelPortfolioButton = getSaveModelPortfolioButton(visibility);

  return (
    <div
       className={cx('SaveModelPortfolioDiv')}
       data-tip
       data-for="saveModelPortfolioButtonTooltip">
      { saveModelPortfolioButton }
    </div>

  );
};

SaveModelPortfolioButton.propTypes = {
  visibility: PropTypes.string.isRequired,
  portfolio: PropTypes.array.isRequired,
  selectedModelPortfolio: PropTypes.object.isRequired,
  saveModelPortfolio: PropTypes.func.isRequired,
};

export default SaveModelPortfolioButton;
