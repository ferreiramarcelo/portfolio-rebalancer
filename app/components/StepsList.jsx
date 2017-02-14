import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ActionBuild from 'material-ui/svg-icons/action/build';

import styles from '../css/components/steps-list';


const StepsList = ({investmentSteps}) => {

  const generateStepsList = (investmentSteps) => {
    if ( investmentSteps.balanceByInvesting ) {
      var stepsList = [];
      stepsList.push( <h3>Instructions List</h3> );

      let stepNumber = 1;
      if ( investmentSteps.cashStillMissing ) {
        stepsList.push( <p>
                          Sell the entire portfolio. You will still be missing $
                          { investmentSteps.cashStillMissing }.
                        </p> );
      }
      if ( investmentSteps.balanceByInvesting.length > 0 ) {
        stepsList.push( <h4>Rebalance by buying</h4> );
        for (var i = 0; i < investmentSteps.portfolio.length; i++) {
          if ( investmentSteps.balanceByInvesting[ i ] > 0 ) {
            stepsList.push( <p>
                              { stepNumber }. Purchase&nbsp;
                              { investmentSteps.balanceByInvesting[ i ] } units of&nbsp;
                              { investmentSteps.portfolio[ i ].symbol }
                            </p> );
            stepNumber++;
          }
        }
        stepNumber = 1;
      }
      if ( investmentSteps.balanceByDisvesting.length > 0 ) {
        stepsList.push( <h4>Rebalance by selling</h4> );
        for (var i = 0; i < investmentSteps.portfolio.length; i++) {
          if ( investmentSteps.balanceByDisvesting[ i ] < 0 ) {
            stepsList.push( <p>
                              { stepNumber }. Sell&nbsp;
                              { -1 * investmentSteps.balanceByDisvesting[ i ] } units of&nbsp;
                              { investmentSteps.portfolio[ i ].symbol }
                            </p> );
            stepNumber++;
          }
        }
        stepNumber = 1;
      }
      if ( investmentSteps.balanceByAdjusting.length > 0 ) {
        stepsList.push( <h4>Rebalance by selling and buying</h4> );
        for (var i = 0; i < investmentSteps.portfolio.length; i++) {
          if ( investmentSteps.balanceByAdjusting[ i ] < 0 ) {
            stepsList.push( <p>
                              { stepNumber }. Sell&nbsp;
                              { -1 * investmentSteps.balanceByAdjusting[ i ] } units of&nbsp;
                              { investmentSteps.portfolio[ i ].symbol }
                            </p> );
            stepNumber++;
          }
        }
        for (var i = 0; i < investmentSteps.portfolio.length; i++) {
          if ( investmentSteps.balanceByAdjusting[ i ] > 0 ) {
            stepsList.push( <p>
                              { stepNumber }. Purchase&nbsp;
                              { investmentSteps.balanceByAdjusting[ i ] } units of&nbsp;
                              { investmentSteps.portfolio[ i ].symbol }
                            </p> );
            stepNumber++;
          }
        }

      } else {
        return null;
      }
    }
    return stepsList;
  }

  const stepsListElements = generateStepsList( investmentSteps );


  return (
  <div>
    { stepsListElements }
  </div>

  );
};

StepsList.propTypes = {
  investmentSteps: PropTypes.object.isRequired,
};

export default StepsList;
