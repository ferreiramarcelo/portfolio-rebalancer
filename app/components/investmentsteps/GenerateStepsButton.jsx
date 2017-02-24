import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ActionBuild from 'material-ui/svg-icons/action/build';

const GenerateStepsButton = ({visibility, generateSteps}) => {
  const handleOnClick = function handleOnClick() {
    generateSteps();
  };

  return (
    <RaisedButton
                disabled={visibility === 'disabled'}
                onTouchTap={handleOnClick}
                primary
                fullWidth
                label="GENERATE STEPS"
                labelPosition="before"
                icon={<ActionBuild />} />
  );
};

GenerateStepsButton.propTypes = {
  visibility: PropTypes.string.isRequired,
  generateSteps: PropTypes.func.isRequired,
};

export default GenerateStepsButton;
