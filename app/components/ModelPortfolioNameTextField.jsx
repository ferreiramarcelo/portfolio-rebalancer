import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import classNames from 'classnames/bind';
import styles from '../css/components/security-text-field';

const cx = classNames.bind(styles);


const ModelPortfolioNameTextField = ({selectedModelPortfolio, selectedModelPortfolioTextFieldChange}) => {

    const handleOnChange = (event, value) => {
        selectedModelPortfolioTextFieldChange(value);
    }

    return (
		<TextField className={cx('textfield')}
                errorStyle={{
                    float: "left"}}
                type='text'
                value={selectedModelPortfolio.name}
                errorText={selectedModelPortfolio.errorText}
                onChange={handleOnChange}
				      fullWidth={true}
				inputStyle={{
			  textAlign: 'center',
				}}
        />
    );
};

ModelPortfolioNameTextField.propTypes = {
  selectedModelPortfolio: PropTypes.object.isRequired,
    ModelPortfolioNameTextField: PropTypes.func.isRequired,

};

export default ModelPortfolioNameTextField;
