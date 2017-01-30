import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ActionBuild from 'material-ui/svg-icons/action/build';



const GenerateStepsButton = ({portfolio, investmentAmount, generateSteps}) => {

	const determineIfIsDisabled = (portfolio) => {
		if (investmentAmount.valid == 0) {
			return true;
		}
		for (var security of portfolio) {
			if (security.allocation.valid == 0 || security.price.valid == 0 || security.units.valid == 0) {
				return true;
			}
		}
		return false;
	}
	
	const isDisabled = determineIfIsDisabled(portfolio);
	
    const handleOnClick = () => {
        generateSteps(portfolio, investmentAmount);
    }

    return (
		 <RaisedButton
            onTouchTap={handleOnClick}
			disabled={isDisabled}
            primary={true}
            fullWidth={true}
              label="GENERATE STEPS"
            labelPosition="before"
              icon={<ActionBuild />}
        />
    );
};

GenerateStepsButton.propTypes = {
    portfolio: PropTypes.array.isRequired,
    investmentAmount: PropTypes.object.isRequired,
    generateSteps: PropTypes.func.isRequired,
};

export default GenerateStepsButton;