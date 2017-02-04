import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ActionBuild from 'material-ui/svg-icons/action/build';

import styles from '../css/components/steps-list';


const StepsList = ({investmentSteps, portfolio}) => {

  const generateStepsList = (investmentSteps, portfolio) => {
    var stepsList = [];
    /*if (!investmentSteps) {
    	stepsList.push(<p>No steps</p>);
    	return stepsList;
    } */
    stepsList.push(<h3> Instructions List</h3>);
    var stepNumber = 1;
    if (investmentSteps.cashStillMissing) {
      stepsList.push(<p>Sell the entire portfolio. You will still be missing $
                       { investmentSteps.cashStillMissing }. </p>);
    }
    if (investmentSteps.balanceByInvesting != null) {
      stepsList.push(<h4>Balance by investing</h4>);
      for (var i = 0; i < portfolio.length; i++) {
        if (investmentSteps.balanceByInvesting[i] > 0) {
          stepsList.push(<p>
                           { stepNumber }. Purchase
                           { investmentSteps.balanceByInvesting[i] } units of
                           { portfolio[i].ticker.value }
                         </p>);
          stepNumber++;
        }
      }
      stepNumber = 1;
    }
    if (investmentSteps.balanceByTakingOut != null) {
      stepsList.push(<h4>Balance by taking out</h4>);
      for (var i = 0; i < portfolio.length; i++) {
        if (investmentSteps.balanceByTakingOut[i] < 0) {
          stepsList.push(<p>
                           { stepNumber }. Sell
                           { -1 * investmentSteps.balanceByTakingOut[i] } units of
                           { portfolio[i].ticker.value }
                         </p>);
          stepNumber++;
        }
      }
      stepNumber = 1;
    }
    if (investmentSteps.balanceByTakingOutAndInvesting != null) {
      stepsList.push(<h4>Balance by taking out and investing</h4>);
      for (var i = 0; i < portfolio.length; i++) {
        if (investmentSteps.balanceByTakingOutAndInvesting[i] > 0) {
          stepsList.push(<p>
                           { stepNumber }. Purchase
                           { investmentSteps.balanceByTakingOutAndInvesting[i] } units of
                           { portfolio[i].ticker.value }
                         </p>);
          stepNumber++;
        } else if (investmentSteps.balanceByTakingOutAndInvesting[i] < 0) {
          stepsList.push(<p>
                           { stepNumber }. Sell
                           { -1 * investmentSteps.balanceByTakingOutAndInvesting[i] } units of
                           { portfolio[i].ticker.value }
                         </p>);
          stepNumber++;
        }
      }
    }
    return stepsList;
  }

  const stepsListElements = generateStepsList(investmentSteps, portfolio);


  return (
    <div>
      { stepsListElements }
    </div>

    );
};

StepsList.propTypes = {
  investmentSteps: PropTypes.object.isRequired,
  portfolio: PropTypes.object.isRequired,
};

export default StepsList;