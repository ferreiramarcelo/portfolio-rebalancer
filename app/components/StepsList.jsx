import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ActionBuild from 'material-ui/svg-icons/action/build';

import styles from '../css/components/steps-list';


const StepsList = ({rebalancingSteps}) => {

  const formatMoneyAmount = (amount) => {
    return amount.toFixed( 2 ).replace( /(\d)(?=(\d{3})+\.)/g, '$1,' );
  }

  const formatUnitsAmount = (amount) => {
    return amount.toString().replace( /\B(?=(\d{3})+(?!\d))/g, "," );
  }

  const generateStepsList = (rebalancingSteps) => {
    if ( rebalancingSteps.balanceByInvesting ) {
      var stepsList = [];
      let investmentSteps = [];
      let disvestmentSteps = [];
      let adjustmentSteps = [];
      stepsList.push( <h3>Instructions List</h3> );

      let stepNumber = 1;
      let invested = false;
      let disvested = false;
      let adjusted = false;
      if ( rebalancingSteps.cashStillMissing ) {
        stepsList.push( <p>
                          Sell the entire portfolio. You will still be missing $
                          { formatMoneyAmount( rebalancingSteps.cashStillMissing ) }.
                        </p> );
        return stepsList;
      }
      if ( rebalancingSteps.balanceByInvesting.length > 0 ) {
        for (var i = 0; i < rebalancingSteps.portfolio.length; i++) {
          if ( rebalancingSteps.balanceByInvesting[ i ] > 0 ) {
            investmentSteps.push( <p>
                              { stepNumber }. Buy&nbsp;
                              { formatUnitsAmount( rebalancingSteps.balanceByInvesting[ i ] ) } units of&nbsp;
                              { rebalancingSteps.portfolio[ i ].symbol }
                            </p> );
            stepNumber++;
          }
        }
        if (stepNumber > 1) {
          invested = true;
        }
        stepNumber = 1;
      }
      if ( rebalancingSteps.balanceByDisvesting.length > 0 ) {
        for (var i = 0; i < rebalancingSteps.portfolio.length; i++) {
          if ( rebalancingSteps.balanceByDisvesting[ i ] > 0 ) {
            disvestmentSteps.push( <p>
                              { stepNumber }. Sell&nbsp;
                              { formatUnitsAmount( rebalancingSteps.balanceByDisvesting[ i ] ) } units of&nbsp;
                              { rebalancingSteps.portfolio[ i ].symbol }
                            </p> );
            stepNumber++;
          }
        }
        if (stepNumber > 1) {
          disvested = true;
        }
        stepNumber = 1;
      }
      if ( rebalancingSteps.balanceByAdjusting.length > 0 ) {
        for (var i = 0; i < rebalancingSteps.portfolio.length; i++) {
          if ( rebalancingSteps.balanceByAdjusting[ i ] < 0 ) {
            adjustmentSteps.push( <p>
                              { stepNumber }. Sell&nbsp;
                              { formatUnitsAmount( -1 * rebalancingSteps.balanceByAdjusting[ i ] ) } units of&nbsp;
                              { rebalancingSteps.portfolio[ i ].symbol }
                            </p> );
            stepNumber++;
          }
        }
        for (var i = 0; i < rebalancingSteps.portfolio.length; i++) {
          if ( rebalancingSteps.balanceByAdjusting[ i ] > 0 ) {
            adjustmentSteps.push( <p>
                              { stepNumber }. Buy&nbsp;
                              { formatUnitsAmount( rebalancingSteps.balanceByAdjusting[ i ] ) } units of&nbsp;
                              { rebalancingSteps.portfolio[ i ].symbol }
                            </p> );
            stepNumber++;
          }
        }
        if (stepNumber > 1) {
          adjusted = true;
        }
      }

      if (!invested && !disvested && !adjusted) {
        stepsList.push(<p>Not enough capital to rebalance or invest further.</p> );
      }
      else if (invested && !adjusted) {
        stepsList.push( investmentSteps );
      }
      else if (disvested && !adjusted) {
        stepsList.push( disvestmentSteps );
      }
      else if (!invested && !disvested && adjusted) {
        stepsList.push( adjustmentSteps );
      }
      else if (invested && adjusted) {
        stepsList.push( <h4>Part 1: Rebalance by buying</h4> );
        stepsList.push( investmentSteps );
        stepsList.push( <h4>Part 2: Rebalance by selling and buying</h4> );
        stepsList.push( adjustmentSteps );
      }
      else if (disvested && adjusted) {
        stepsList.push( <h4>Part 1: Rebalance by selling</h4> );
        stepsList.push( disvestmentSteps );
        stepsList.push( <h4>Part 2: Rebalance by selling and buying</h4> );
        stepsList.push( adjustmentSteps );
      }
      return stepsList;
    }
    return null;
  }

  const stepsListElements = generateStepsList( rebalancingSteps );


  return (
  <div>
    { stepsListElements }
  </div>

  );
};

StepsList.propTypes = {
  rebalancingSteps: PropTypes.object.isRequired,
};

export default StepsList;
