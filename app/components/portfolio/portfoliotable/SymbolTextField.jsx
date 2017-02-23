import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import classNames from 'classnames/bind';
import styles from '../../../css/components/portfolio/portfolio-table/price-cell';

const cx = classNames.bind(styles);

const SymbolTextField = ({index, value, setOnce, errorText, onChange}) => {
  const getDisplayValue = function getDisplayValueFunc(givenValue, givenSetOnce) {
    if (givenSetOnce) {
      return givenValue;
    }
    return '';
  };

  const displayValue = getDisplayValue(value, setOnce);

  const handleOnChange = function handleOnChangeFunc(event, newValue) {
    onChange(index, 'symbol', newValue);
  };

  return (
    <TextField
             id={'symbolTextField' + index}
             value={displayValue}
             errorText={errorText}
             onChange={handleOnChange}
             hintText="AAPL"
             errorStyle={{ float: 'left' }}
             className={cx('textfield')} />
  );
};

SymbolTextField.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  setOnce: PropTypes.bool.isRequired,
  errorText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SymbolTextField;
