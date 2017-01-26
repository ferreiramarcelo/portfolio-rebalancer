import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ActionBuild from 'material-ui/svg-icons/action/build';



const StepsList = ({investmentSteps}) => {

const generateStepsList = (investmentSteps) => {
		var stepsList = [];
		if (!investmentSteps) {
			stepsList.push(<p>No steps</p>);
			return stepsList;
		}
		stepsList.push(<h5> Instructions List</h5>);
		if (investmentSteps.balanceWithCash != null) {
			stepsList.push(<p>Balance by spending cash: {investmentSteps.balanceWithCash.toString()} </p>);
		}
		if (investmentSteps.balanceBySellingAndBuying != null) {
			stepsList.push(<p>Balance by selling and buying: {investmentSteps.balanceBySellingAndBuying.toString()} </p>);
		}
		return stepsList;
	}
	
	const stepsListElements = generateStepsList(investmentSteps);

	
    return (
	<div>
		<p>Test </p>
		{stepsListElements}
		</div>
		
    );
};

StepsList.propTypes = {
    investmentSteps: PropTypes.object.isRequired,
};

export default StepsList;