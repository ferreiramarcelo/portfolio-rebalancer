import React, { Component, PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import ContentSave from 'material-ui/svg-icons/content/save';

import classNames from 'classnames/bind';
import styles from '../css/components/portfolio-table/save-model-portfolio-button';

const cx = classNames.bind(styles);

const SaveModelPortfolioButton = ({isDisabled, portfolio, selectedModelPortfolio, saveModelPortfolio}) => {

	const handleOnClick = () => {
		saveModelPortfolio(selectedModelPortfolio, portfolio);
	}

    return (
	<IconButton
		className={cx('SaveModelPortfolioButton')}
		tooltipPosition={'bottom-left'}
		disabled={isDisabled}
		tooltip={'Save model portfolio'}
		touch={true}
		onTouchTap={handleOnClick}>
      <ContentSave />
</IconButton>

    );
};

SaveModelPortfolioButton.propTypes = {
	isDisabled: PropTypes.bool.isRequired,
	portfolio: PropTypes.array.isRequired,
	selectedModelPortfolio: PropTypes.object.isRequired,
    saveModelPortfolio: PropTypes.func.isRequired,
};

export default SaveModelPortfolioButton;
