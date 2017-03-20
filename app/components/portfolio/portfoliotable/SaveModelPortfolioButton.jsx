import React, { PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import ContentSave from 'material-ui/svg-icons/content/save';
import ReactTooltip from 'react-tooltip';
import classNames from 'classnames/bind';
import styles from '../../../css/components/portfolio/portfolio-table/save-model-portfolio-button';

const cx = classNames.bind(styles);

const SaveModelPortfolioButton = ({visibility, tooltip, portfolio, selectedModelPortfolio, saveModelPortfolio}) => {
  const handleOnClick = function handleOnClick() {
    saveModelPortfolio(selectedModelPortfolio, portfolio);
  };

  const getSaveModelPortfolioButton = function getSaveModelPortfolioButton(givenVisibility, onClicktion) {
    switch (givenVisibility) {
      case 'visible':
        return (<div>
                  <IconButton onClick={ onClicktion } touch className={ cx('save-model-portfolio-button') }>
                    <ContentSave />
                  </IconButton>
                </div>);
      case 'disabled':
        return (<div>
                  <IconButton disabled onClick={ onClicktion } touch className={ cx('save-model-portfolio-button') }>
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
    <div data-tip data-for="saveModelPortfolioButtonTooltip" className={ cx('save-model-portfolio-button-container') }>
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
