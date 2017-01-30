import React, { Component, PropTypes } from 'react';
import InvestmentAmountTextField from '../components/InvestmentAmountTextField';

import classNames from 'classnames/bind';
import styles from '../css/components/investment-amount';

const cx = classNames.bind(styles);

const InvestmentAmount = ({investmentAmount, investmentAmountTextFieldChange, investmentAmountTextFieldValid, investmentAmountTextFieldError}) => {

	return (
	<div>
		 <p className={cx('InvestmentAmountText')}>
			How much cash are you investing? (Negative to take out)</p>
            <InvestmentAmountTextField
                    value={investmentAmount.value}
                    investmentAmountTextFieldChange={investmentAmountTextFieldChange}
                    investmentAmountTextFieldValid={investmentAmountTextFieldValid}
                    investmentAmountTextFieldError={investmentAmountTextFieldError} />
					</div>
    );
};

InvestmentAmount.propTypes = {
    investmentAmount: PropTypes.object.isRequired,
    errorText: PropTypes.string.isRequired,
    investmentAmountTextFieldChange: PropTypes.func.isRequired,
    investmentAmountTextFieldValid: PropTypes.func.isRequired,
    investmentAmountTextFieldError: PropTypes.func.isRequired,
};

export default InvestmentAmount;