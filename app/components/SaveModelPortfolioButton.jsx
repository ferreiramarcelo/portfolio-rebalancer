import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import ContentSave from 'material-ui/svg-icons/content/save';

const SaveModelPortfolioButton = ({saveModelPortfolio}) => {

    return (
		<FlatButton
		  label="SAVE"
            onClick={saveModelPortfolio}
		  labelPosition="before"
		  icon={<ContentSave />}
		  style={{
			  width: 'auto',
				}}
		/>

    );
};

SaveModelPortfolioButton.propTypes = {
    saveModelPortfolio: PropTypes.func.isRequired,
};

export default SaveModelPortfolioButton;