import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ActionBuild from 'material-ui/svg-icons/action/build';
import ReactTooltip from 'react-tooltip'

const GenerateStepsButton = ({visibility, generateSteps, investmentAmount, portfolio}) => {

  const handleOnClick = () => {
    generateSteps( portfolio, investmentAmount );
  }

  const getGenerateStepsButton = (visibility) => {
    switch (visibility) {
      case 'visible':
        return <RaisedButton
                             onTouchTap={ handleOnClick }
                             primary={ true }
                             fullWidth={ true }
                             label="GENERATE STEPS"
                             labelPosition="before"
                             icon={ <ActionBuild /> } />;
      case 'disabled':
        return <RaisedButton
                             onTouchTap={ handleOnClick }
                             disabled={ true }
                             primary={ true }
                             fullWidth={ true }
                             label="GENERATE STEPS"
                             labelPosition="before"
                             icon={ <ActionBuild /> } />;
      case 'hidden':
      default:
        return null;
    }
  }

  const generateStepsButton = getGenerateStepsButton( visibility );

  return (
  <div>
    { generateStepsButton }
  </div>
  );
};

GenerateStepsButton.propTypes = {
  visibility: PropTypes.object.isRequired,
  generateSteps: PropTypes.func.isRequired,
  investmentAmount: PropTypes.object.isRequired,
  portfolio: PropTypes.array.isRequired
};

export default GenerateStepsButton;
