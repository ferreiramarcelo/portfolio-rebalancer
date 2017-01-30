import React, { Component, PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import ContentSave from 'material-ui/svg-icons/content/save';

import classNames from 'classnames/bind';
import styles from '../css/components/portfolio-table/save-model-portfolio-button';

const cx = classNames.bind(styles);

const SaveModelPortfolioButton = ({modelPortfolioName, portfolio, saveModelPortfolio}) => {

	const handleOnClick = () => {
		saveModelPortfolio(modelPortfolioName, portfolio);
	}

    return (
	<IconButton
		className={cx('SaveModelPortfolioButton')}
		tooltipPosition={'bottom-left'}
		tooltip="Save model portfolio"
		touch={true}
		onTouchTap={handleOnClick}>
      <ContentSave />
</IconButton>

    );
};

SaveModelPortfolioButton.propTypes = {
	modelPortfolioName: PropTypes.object.isRequired,
	portfolio: PropTypes.array.isRequired,
    saveModelPortfolio: PropTypes.func.isRequired,
};

export default SaveModelPortfolioButton;