import React, { PropTypes } from 'react';
import StepsList from './StepsList';
import Checkbox from 'material-ui/Checkbox';
import classNames from 'classnames/bind';
import styles from '../../css/components/investmentsteps/steps-list-header';

const cx = classNames.bind(styles);

const StepsListHeader = ({showWholeUnits, showPartialUnits, showCashAmounts, changeShowWholeUnits, changeShowPartialUnits, changeShowCashAmounts, rebalancingSteps}) => {
  return (
    <div>
      <div className={ cx('steps-list-header') }>
        <div className={ cx('steps-list-header-text-container') }>
          <span className={ cx('steps-list-header-text') }>Steps List</span>
        </div>
        <div className={ cx('steps-list-header-checkboxes') }>
          <Checkbox checked={showWholeUnits} onCheck={changeShowWholeUnits} label="Whole units" className={ cx('checkbox') } />
          <Checkbox checked={showPartialUnits} onCheck={changeShowPartialUnits} label="Partial units" className={ cx('checkbox') } />
          <Checkbox checked={showCashAmounts} onCheck={changeShowCashAmounts} label="Cash amounts" className={ cx('checkbox') } />
        </div>
      </div>
      <StepsList rebalancingSteps={ rebalancingSteps } />
    </div>
    );
};

StepsListHeader.propTypes = {
};

export default StepsListHeader;
