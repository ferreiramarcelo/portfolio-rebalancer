import React, { PropTypes } from 'react';
import Checkbox from 'material-ui/Checkbox';
import classNames from 'classnames/bind';
import StepsList from './StepsList';
import styles from '../../css/components/investmentsteps/steps-list-header';

const cx = classNames.bind(styles);

const StepsListHeader = ({showWholeUnits, showPartialUnits, showCashAmounts, changeShowWholeUnits, changeShowPartialUnits, changeShowCashAmounts, rebalancingSteps}) => {

  const getStepsListHeader = function getStepsListHeader(givenRebalancingSteps, givenShowWholeUnits, givenShowPartialUnits, givenShowCashAmounts) {
    if (!rebalancingSteps.balanceByInvesting) {
      return null;
    }
    return (<div>
              <div className={ cx('steps-list-header') }>
                <div className={ cx('steps-list-header-text-container') }>
                  <span className={ cx('steps-list-header-text') }>Steps List</span>
                </div>
                <div className={ cx('steps-list-header-checkboxes') }>
                  <Checkbox checked={ givenShowWholeUnits } onCheck={ changeShowWholeUnits } label="Whole units" className={ cx('checkbox') } />
                  <Checkbox checked={ givenShowPartialUnits } onCheck={ changeShowPartialUnits } label="Partial units" className={ cx('checkbox') } />
                  <Checkbox checked={ givenShowCashAmounts } onCheck={ changeShowCashAmounts } label="Cash amounts" className={ cx('checkbox') } />
                </div>
              </div>
              <StepsList rebalancingSteps={ givenRebalancingSteps } showWholeUnits={ givenShowWholeUnits } showPartialUnits={ givenShowPartialUnits } showCashAmounts={ givenShowCashAmounts } />
            </div>);
  };
  const stepsListHeader = getStepsListHeader(rebalancingSteps, showWholeUnits, showPartialUnits, showCashAmounts);

  return (
    <div>
      { stepsListHeader }
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
