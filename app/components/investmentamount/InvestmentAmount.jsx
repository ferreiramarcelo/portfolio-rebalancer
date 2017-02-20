import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import InvestmentAmountTextField from './InvestmentAmountTextField';
import styles from '../../css/components/investmentamount/investment-amount';

const cx = classNames.bind(styles);

const InvestmentAmount = ({investmentAmount, investmentAmountSelect, investmentAmountTextFieldChange}) => {
  return (
    <div className={cx('investment-amount')}>
      <p className={cx('investment-amount-prompt')}>
      How much cash are you investing? (Negative to take out)
    </p>
      <InvestmentAmountTextField
                               value={investmentAmount.value}
                               setOnce={investmentAmount.setOnce}
                               errorText={investmentAmountSelect.errorText}
                               hintText={investmentAmountSelect.hintText}
                               onChange={investmentAmountTextFieldChange} />
    </div>
  );
};

InvestmentAmount.propTypes = {
  investmentAmount: PropTypes.object.isRequired,
  investmentAmountSelect: PropTypes.object.isRequired,
  investmentAmountTextFieldChange: PropTypes.func.isRequired,
};

export default InvestmentAmount;
