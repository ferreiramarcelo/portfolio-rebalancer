import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import classNames from 'classnames/bind';
import styles from '../../../css/components/portfolio/portfolio-table/security-text-field';

const cx = classNames.bind(styles);

const UnitsTextField = ({index, value, setOnce, errorText, onChange}) => {
  const getDisplayValue = function getDisplayValueFunc(givenValue, givenSetOnce) {
    if (givenSetOnce) {
      return givenValue;
    }
    return '';
  };

  const displayValue = getDisplayValue(value, setOnce);

  const handleOnChange = function handleOnChangeFunc(event, newValue) {
    onChange(index, 'units', newValue);
  };

  return (
    <TextField
             value={displayValue}
             errorText={errorText}
             onChange={handleOnChange}
             hintText="0"
             errorStyle={{ float: 'left' }}
             className={cx('security-text-field')} />
  );
};

UnitsTextField.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  setOnce: PropTypes.bool.isRequired,
  errorText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default UnitsTextField;
