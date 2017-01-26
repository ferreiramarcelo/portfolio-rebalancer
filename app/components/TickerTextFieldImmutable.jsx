import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import classNames from 'classnames/bind';
import styles from '../css/components/security-text-field';

const cx = classNames.bind(styles);


const TickerTextFieldImmutable = ({index, value, onSecurityTextFieldChange}) => {

    const getErrorText = (value) => {
        if (value)
            return '';
        else
            return 'Required';
    }

    const errorText = getErrorText(value);

    const handleOnChange = (event, value) => {       
        onSecurityTextFieldChange(index, 'ticker', value);
    }

    return (
		<TextField className={cx('textfield')}
                errorStyle={{
                    float: "left"
                }}
                id={'tickerTextField'+index}
                type='text'
                value={value}
                errorText={errorText}
                onChange={handleOnChange}
        />
    );
};

TickerTextFieldImmutable.propTypes = {
    index: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    onSecurityTextFieldChange: PropTypes.func.isRequired,
};

export default TickerTextFieldImmutable;