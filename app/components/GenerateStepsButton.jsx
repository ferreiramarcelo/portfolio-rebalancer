import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ActionBuild from 'material-ui/svg-icons/action/build';



const GenerateStepsButton = ({isDisabled, generateSteps}) => {

  const handleOnClick = () => {
    generateSteps(portfolio, investmentAmount);
  }

  return (
    <RaisedButton onTouchTap={ handleOnClick } disabled={ isDisabled } primary={ true } fullWidth={ true } label="GENERATE STEPS" labelPosition="before"
      icon={ <ActionBuild /> } />
    );
};

GenerateStepsButton.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  generateSteps: PropTypes.func.isRequired,
};

export default GenerateStepsButton;
