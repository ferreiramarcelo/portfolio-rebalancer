import React, { PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import ContentSave from 'material-ui/svg-icons/content/save';
import ReactTooltip from 'react-tooltip';
import classNames from 'classnames/bind';
import styles from '../../../css/components/portfolio-table/save-model-portfolio-button';

const cx = classNames.bind(styles);

const SaveModelPortfolioButton = ({visibility, tooltip, portfolio, selectedModelPortfolio, saveModelPortfolio}) => {
  const handleOnClick = function handleOnClickFunc() {
    saveModelPortfolio(selectedModelPortfolio, portfolio);
  };

  const getSaveModelPortfolioButton = function getSaveModelPortfolioButtonFunc(givenVisibility, onClickFunction) {
    switch (givenVisibility) {
      case 'visible':
        return (<div>
          <IconButton
                              className={cx('SaveModelPortfolioButton')}
                              touch
                              onTouchTap={onClickFunction}>
            <ContentSave />
          </IconButton>
        </div>);
      case 'disabled':
        return (<div>
          <IconButton
                              disabled
                              className={cx('SaveModelPortfolioButton')}
                              touch
                              onTouchTap={onClickFunction}>
            <ContentSave />
          </IconButton>
        </div>);
      case 'hidden':
      default:
        return null;
    }
  };

  const saveModelPortfolioButton = getSaveModelPortfolioButton(visibility, handleOnClick);

  return (
    <div
       className={cx('SaveModelPortfolioDiv')}
       data-tip
       data-for="saveModelPortfolioButtonTooltip">
      { saveModelPortfolioButton }
      <ReactTooltip id="saveModelPortfolioButtonTooltip">
        <p>
          { tooltip }
        </p>
      </ReactTooltip>
    </div>
  );
};

SaveModelPortfolioButton.propTypes = {
  visibility: PropTypes.string.isRequired,
  tooltip: PropTypes.string.isRequired,
  portfolio: PropTypes.array.isRequired,
  selectedModelPortfolio: PropTypes.object.isRequired,
  saveModelPortfolio: PropTypes.func.isRequired,
};

export default SaveModelPortfolioButton;
