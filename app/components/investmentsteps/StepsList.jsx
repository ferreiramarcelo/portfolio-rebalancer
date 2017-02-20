import React, { PropTypes } from 'react';

const StepsList = ({rebalancingSteps}) => {
  const formatMoneyAmount = function formatMoneyAmountFunc(moneyAmount) {
    return moneyAmount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  };

  const formatUnitsAmount = function formatUnitsAmountFunc(unitsAmount) {
    return unitsAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const generateStepsList = function genereateStepsListsFunc(givenRebalancingSteps) {
    if (givenRebalancingSteps.balanceByInvesting) {
      const stepsList = [];
      const investmentSteps = [];
      const disvestmentSteps = [];
      const adjustmentSteps = [];
      stepsList.push(<h3>Steps List</h3>);

      let invested = false;
      let disvested = false;
      let adjusted = false;
      let stepNumber = 1;
      if (givenRebalancingSteps.cashStillMissing) {
        stepsList.push(<p>
                          Sell the entire portfolio. You will still be missing $
                          { formatMoneyAmount(givenRebalancingSteps.cashStillMissing) }.
                        </p>);
        return stepsList;
      }
      if (givenRebalancingSteps.balanceByInvesting.length > 0) {
        for (let i = 0; i < givenRebalancingSteps.portfolio.length; i++) {
          if (givenRebalancingSteps.balanceByInvesting[i] > 0) {
            investmentSteps.push(<p>
              { stepNumber }. Buy&nbsp;
                              { formatUnitsAmount(givenRebalancingSteps.balanceByInvesting[i]) } unit{givenRebalancingSteps.balanceByInvesting[i] > 1 ? 's' : ''} of&nbsp;
                              { givenRebalancingSteps.portfolio[i].symbol }
            </p>);
            stepNumber++;
          }
        }
        if (stepNumber > 1) {
          invested = true;
        }
        stepNumber = 1;
      }
      if (givenRebalancingSteps.balanceByDisvesting.length > 0) {
        for (let i = 0; i < givenRebalancingSteps.portfolio.length; i++) {
          if (givenRebalancingSteps.balanceByDisvesting[i] > 0) {
            disvestmentSteps.push(<p>
              { stepNumber }. Sell&nbsp;
                              { formatUnitsAmount(givenRebalancingSteps.balanceByDisvesting[i]) } unit{givenRebalancingSteps.balanceByDisvesting[i] > 1 ? 's' : ''} of&nbsp;
                              { givenRebalancingSteps.portfolio[i].symbol }
            </p>);
            stepNumber++;
          }
        }
        if (stepNumber > 1) {
          disvested = true;
        }
        stepNumber = 1;
      }
      if (givenRebalancingSteps.balanceByAdjusting.length > 0) {
        for (let i = 0; i < givenRebalancingSteps.portfolio.length; i++) {
          if (givenRebalancingSteps.balanceByAdjusting[i] < 0) {
            adjustmentSteps.push(<p>
              { stepNumber }. Sell&nbsp;
                              { formatUnitsAmount(-1 * givenRebalancingSteps.balanceByAdjusting[i]) } unit{givenRebalancingSteps.balanceByAdjusting[i] > 1 ? 's' : ''} of&nbsp;
                              { givenRebalancingSteps.portfolio[i].symbol }
            </p>);
            stepNumber++;
          }
        }
        for (let i = 0; i < givenRebalancingSteps.portfolio.length; i++) {
          if (givenRebalancingSteps.balanceByAdjusting[i] > 0) {
            adjustmentSteps.push(<p>
              { stepNumber }. Buy&nbsp;
                              { formatUnitsAmount(givenRebalancingSteps.balanceByAdjusting[i]) } unit{givenRebalancingSteps.balanceByAdjusting[i] > 1 ? 's' : ''} of&nbsp;
                              { givenRebalancingSteps.portfolio[i].symbol }
            </p>);
            stepNumber++;
          }
        }
        if (stepNumber > 1) {
          adjusted = true;
        }
      }

      if (!invested && !disvested && !adjusted) {
        stepsList.push(<p>Not enough capital to rebalance or invest further.</p>);
      } else if (invested && !adjusted) {
        stepsList.push(investmentSteps);
      } else if (disvested && !adjusted) {
        stepsList.push(disvestmentSteps);
      } else if (!invested && !disvested && adjusted) {
        stepsList.push(adjustmentSteps);
      } else if (invested && adjusted) {
        stepsList.push(<h4>Part 1: Rebalance by buying</h4>);
        stepsList.push(investmentSteps);
        stepsList.push(<h4>Part 2: Rebalance by selling and buying</h4>);
        stepsList.push(adjustmentSteps);
      } else if (disvested && adjusted) {
        stepsList.push(<h4>Part 1: Rebalance by selling</h4>);
        stepsList.push(disvestmentSteps);
        stepsList.push(<h4>Part 2: Rebalance by selling and buying</h4>);
        stepsList.push(adjustmentSteps);
      }
      return stepsList;
    }
    return null;
  };

  const stepsListElements = generateStepsList(rebalancingSteps);

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
