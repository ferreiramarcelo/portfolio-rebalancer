import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ActionBuild from 'material-ui/svg-icons/action/build';

const GenerateStepsButton = ({visibility, generateSteps}) => {
  return (
    <RaisedButton
disabled={visibility === 'disabled'} onClick={generateSteps} primary fullWidth label="GENERATE STEPS" labelPosition="before" icon={<ActionBuild />}
    />
    );
};

GenerateStepsButton.propTypes = {
  visibility: PropTypes.string.isRequired,
  generateSteps: PropTypes.func.isRequired,
};

export default GenerateStepsButton;
