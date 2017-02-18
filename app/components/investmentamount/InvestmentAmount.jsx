import React, { Component, PropTypes } from 'react';
import InvestmentAmountTextField from './InvestmentAmountTextField';

import classNames from 'classnames/bind';
import styles from '../../css/components/investment-amount';

const cx = classNames.bind( styles );

const InvestmentAmount = ({investmentAmount, investmentAmountSelect, investmentAmountTextFieldChange}) => {

  return (
  <div>
    <p className={ cx( 'InvestmentAmountText' ) }>
      How much cash are you investing? (Negative to take out)
    </p>
    <InvestmentAmountTextField
                               investmentAmount={ investmentAmount }
                               investmentAmountSelect={ investmentAmountSelect }
                               investmentAmountTextFieldChange={ investmentAmountTextFieldChange } />
  </div>
  );
};

InvestmentAmount.propTypes = {
  investmentAmount: PropTypes.object.isRequired,
  investmentAmountSelect: PropTypes.object.isRequired,
  investmentAmountTextFieldChange: PropTypes.func.isRequired,
};

export default InvestmentAmount;
