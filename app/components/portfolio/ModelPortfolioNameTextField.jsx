import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import classNames from 'classnames/bind';
import styles from '../../css/components/security-text-field';

const cx = classNames.bind(styles);


const ModelPortfolioNameTextField = ({value, errorText, onChange}) => {
  const handleOnChange = function handleOnChangeFunc(event, newValue) {
    onChange(newValue);
  };

  return (
    <TextField
             value={value}
             errorText={errorText}
             onChange={handleOnChange}
             hintText="Model Portfolio Name"
             type="text"
             fullWidth
             errorStyle={{ float: 'left' }}
             inputStyle={{ textAlign: 'center', }}
             className={cx('textfield')} />
  );
};

ModelPortfolioNameTextField.propTypes = {
  value: PropTypes.string.isRequired,
  errorText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default ModelPortfolioNameTextField;
