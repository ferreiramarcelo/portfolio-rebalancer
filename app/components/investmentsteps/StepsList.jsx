import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from '../../css/components/investmentsteps/steps-list';

const cx = classNames.bind(styles);

const StepsList = ({rebalancingSteps, showWholeUnits, showPartialUnits, showCashAmounts}) => {
  const formatMoneyAmount = function formatMoneyAmount(moneyAmount) {
    return moneyAmount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  };

  const formatUnitsAmount = function formatUnitsAmount(unitsAmount) {
    return unitsAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const formatPartialUnitsAmount = function formatUnitsAmount(unitsAmount) {
    const parts = unitsAmount.toFixed(4).split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  const getInstruction = function getInstruction(stepNumber, index, symbol, wholeUnits, partialUnits, cashAmount, isBuy, numColumns) {
    const instruction = [];
    let displayClass = '';
    let wholeUnitsDisplayClass = '';
    let partialUnitsDisplayClass = '';
    let cashAmountDisplayClass = '';
    if (numColumns === 2) {
      displayClass = 'instruction-line-start';
    } else if (numColumns === 3) {
      wholeUnitsDisplayClass = 'instruction-line-start';
      if (showCashAmounts) {
        cashAmountDisplayClass = 'instruction-line-end';
      } else {
        partialUnitsDisplayClass = 'instruction-line-end';
      }
    } else {
      wholeUnitsDisplayClass = 'instruction-line-start';
      partialUnitsDisplayClass = 'instruction-line-center';
      cashAmountDisplayClass = 'instruction-line-end';
    }

    instruction.push(<span className={ cx('instruction-number', 'instruction-line-start') }>{ stepNumber }. { symbol } </span>);
    if (showWholeUnits) {
      instruction.push(<span key={ 'investmentWholeUnits' + index } className={ cx('instruction-line', displayClass, wholeUnitsDisplayClass) }>
                                                    { isBuy ? 'Buy ' : 'Sell ' }
                                                    { isBuy ? formatUnitsAmount(wholeUnits) : formatUnitsAmount(-wholeUnits) } unit
                                                    { wholeUnits > 1 || wholeUnits < 1 ? 's' : '' }
                                                  </span>

      );
    }
    if (showPartialUnits) {
      instruction.push(<span key={ 'investmentPartialUnits' + index } className={ cx('instruction-line', displayClass, partialUnitsDisplayClass) }>
                                                    { isBuy ? 'Buy ' : 'Sell ' }
                                                    { isBuy ? formatPartialUnitsAmount(partialUnits) : formatPartialUnitsAmount(-partialUnits) } unit
                                                    { partialUnits > 1 || partialUnits < 1 ? 's' : '' }
                                                  </span>

      );
    }
    if (showCashAmounts) {
      instruction.push(<span key={ 'investmentCashAmount' + index } className={ cx('instruction-line', displayClass, cashAmountDisplayClass) }>
                               { isBuy ? 'Spend $' : 'Get $' }
                               { isBuy ? formatMoneyAmount(cashAmount) : formatMoneyAmount(-cashAmount) }
                                                  </span>

      );
    }
    return instruction;
  };

  const generateStepsList = function genereateStepsLists(givenRebalancingSteps) {
    if (givenRebalancingSteps.balanceByInvesting) {
      const stepsList = [];
      const investmentSteps = [];
      const disvestmentSteps = [];
      const adjustmentSteps = [];

      let invested = false;
      let disvested = false;
      let adjusted = false;
      let stepNumber = 1;
      let numColumns = 1;
      if (showWholeUnits) {
        numColumns++;
      }
      if (showPartialUnits) {
        numColumns++;
      }
      if (showCashAmounts) {
        numColumns++;
      }
      if (givenRebalancingSteps.cashStillMissing) {
        stepsList.push(<p key="sellEverythingStep">
                         Sell the entire portfolio. You will still be missing $
                         { formatMoneyAmount(givenRebalancingSteps.cashStillMissing) }.
                       </p>);
        return stepsList;
      }
      if (givenRebalancingSteps.balanceByInvesting.length > 0) {
        for (let i = 0; i < givenRebalancingSteps.portfolio.length; i++) {
          if (givenRebalancingSteps.balanceByInvesting[i] > 0) {
            const instruction = getInstruction(
              stepNumber,
              i,
              givenRebalancingSteps.portfolio[i].symbol,
              givenRebalancingSteps.balanceByInvesting[i],
              givenRebalancingSteps.balanceByInvestingPartial[i],
              givenRebalancingSteps.valueAdditionPerSecurity[i],
              true,
              numColumns
            );
            investmentSteps.push(<div className={ cx('instruction-container', 'instruction-container-' + numColumns + '-columns') }>
                                   { instruction }
                                 </div>);
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
          if (givenRebalancingSteps.balanceByDisvesting[i] < 0) {
            const instruction = getInstruction(
              stepNumber,
              i,
              givenRebalancingSteps.portfolio[i].symbol,
              givenRebalancingSteps.balanceByDisvesting[i],
              givenRebalancingSteps.balanceByDisvestingPartial[i],
              givenRebalancingSteps.valueReductionPerSecurity[i],
              false,
              numColumns
            );
            disvestmentSteps.push(<div className={ cx('instruction-container', 'instruction-container-' + numColumns + '-columns') }>
                                    { instruction }
                                  </div>);
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
            const instruction = getInstruction(
              stepNumber,
              i,
              givenRebalancingSteps.portfolio[i].symbol,
              givenRebalancingSteps.balanceByAdjusting[i],
              givenRebalancingSteps.balanceByAdjustingPartial[i],
              givenRebalancingSteps.valueAdjustmentsPerSecurity[i],
              false,
              numColumns
            );
            adjustmentSteps.push(<div className={ cx('instruction-container', 'instruction-container-' + numColumns + '-columns') }>
                                   { instruction }
                                 </div>);
            stepNumber++;
          }
        }
        for (let i = 0; i < givenRebalancingSteps.portfolio.length; i++) {
          if (givenRebalancingSteps.balanceByAdjusting[i] > 0) {
            const instruction = getInstruction(
              stepNumber,
              i,
              givenRebalancingSteps.portfolio[i].symbol,
              givenRebalancingSteps.balanceByAdjusting[i],
              givenRebalancingSteps.balanceByAdjustingPartial[i],
              givenRebalancingSteps.valueAdjustmentsPerSecurity[i],
              true,
              numColumns
            );
            adjustmentSteps.push(<div className={ cx('instruction-container', 'instruction-container-' + numColumns + '-columns') }>
                                   { instruction }
                                 </div>);
            stepNumber++;
          }
        }
        if (stepNumber > 1) {
          adjusted = true;
        }
      }

      if (!invested && !disvested && !adjusted) {
        stepsList.push(<p key="noInvNoDisNoAdjStep">Not enough capital to rebalance or invest further.</p>);
      } else if (invested && !adjusted) {
        stepsList.push(investmentSteps);
      } else if (disvested && !adjusted) {
        stepsList.push(disvestmentSteps);
      } else if (!invested && !disvested && adjusted) {
        stepsList.push(adjustmentSteps);
      } else if (invested && adjusted) {
        stepsList.push(<h4 key="rebalanceByBuyingHeader">Part 1: Rebalance by buying</h4>);
        stepsList.push(investmentSteps);
        stepsList.push(<h4 key="rebalancingByAdjustingheader">Part 2: Rebalance by selling and buying</h4>);
        stepsList.push(adjustmentSteps);
      } else if (disvested && adjusted) {
        stepsList.push(<h4 key="rebalanceBySellingHeader">Part 1: Rebalance by selling</h4>);
        stepsList.push(disvestmentSteps);
        stepsList.push(<h4 key="rebalancingByAdjustingHeader">Part 2: Rebalance by selling and buying</h4>);
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
