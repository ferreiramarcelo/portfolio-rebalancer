import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import classNames from 'classnames/bind';
import styles from '../css/components/security-text-field';

const cx = classNames.bind(styles);


const ModelPortfolioNameTextField = ({value, modelPortfolioNameTextFieldChange}) => {

    const getErrorText = (value) => {
        if (value)
            return '';
        else
            return 'Required';
    }

    const errorText = getErrorText(value);

    const handleOnChange = (event, value) => {       
        modelPortfolioNameTextFieldChange(value);
    }

    return (
		<TextField className={cx('textfield')}
                errorStyle={{
                    float: "left",
					textAlign: 'center',
                }}
                type='text'
                value={value}
                errorText={errorText}
                onChange={handleOnChange}
				      fullWidth={true}
				inputStyle={{
			  textAlign: 'center',
				}}
				style={{
					paddingRight: '5px',
					display: 'table-cell',
				}}
        />
    );
};

ModelPortfolioNameTextField.propTypes = {
    ModelPortfolioNameTextField: PropTypes.func.isRequired,
};

export default ModelPortfolioNameTextField;