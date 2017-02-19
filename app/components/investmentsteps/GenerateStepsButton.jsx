import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ActionBuild from 'material-ui/svg-icons/action/build';
import ReactTooltip from 'react-tooltip';

const GenerateStepsButton = ({visibility, generateSteps}) => {
  const handleOnClick = () => {
    generateSteps();
  };

  const getGenerateStepsButton = (visibility) => {
    switch (visibility) {
      case 'visible':
        return (<RaisedButton
                             onTouchTap={handleOnClick}
                             primary
                             fullWidth
                             label="GENERATE STEPS"
                             labelPosition="before"
                             icon={<ActionBuild />} />);
      case 'disabled':
        return (<RaisedButton
                             onTouchTap={handleOnClick}
                             disabled
                             primary
                             fullWidth
                             label="GENERATE STEPS"
                             labelPosition="before"
                             icon={<ActionBuild />} />);
      case 'hidden':
      default:
        return null;
    }
  };

  const generateStepsButton = getGenerateStepsButton(visibility);

  return (
    <div>
      { generateStepsButton }
    </div>
  );
};

GenerateStepsButton.propTypes = {
  visibility: PropTypes.object.isRequired,
  generateSteps: PropTypes.func.isRequired,
};

export default GenerateStepsButton;
