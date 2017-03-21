import React, { PropTypes } from 'react';
import Checkbox from 'material-ui/Checkbox';
import classNames from 'classnames/bind';
import StepsList from './StepsList';
import styles from '../../css/components/investmentsteps/steps-list-header';

const cx = classNames.bind(styles);

const StepsListHeader = ({showWholeUnits, showPartialUnits, showCashAmounts, changeShowWholeUnits, changeShowPartialUnits, changeShowCashAmounts, rebalancingSteps}) => {

  const getStepsListHeaderElements = function getStepsListHeaderElements() {
    return "test";
  };
  const stepsListHeaderElements = getStepsListHeaderElements();

  return (
    <div>
      <span>Hey!</span>
    </div>
    );
};

StepsListHeader.propTypes = {
  showWholeUnits: PropTypes.bool.isRequired,
  showPartialUnits: PropTypes.bool.isRequired,
  showCashAmounts: PropTypes.bool.isRequired,
  changeShowWholeUnits: PropTypes.func.isRequired,
  changeShowPartialUnits: PropTypes.func.isRequired,
  changeShowCashAmounts: PropTypes.func.isRequired,
  rebalancingSteps: PropTypes.object.isRequired,
};

export default StepsListHeader;
