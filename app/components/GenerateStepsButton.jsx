import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ActionBuild from 'material-ui/svg-icons/action/build';



const GenerateStepsButton = ({portfolio, investmentAmount, generateSteps}) => {

    const handleOnClick = () => {
        generateSteps(portfolio, investmentAmount);
    }

    return (
		 <RaisedButton
            onClick={handleOnClick}
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