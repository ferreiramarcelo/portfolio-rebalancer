import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import classNames from 'classnames/bind';
import PriceProgress from './PriceProgress';
import styles from '../../../css/components/portfolio/portfolio-table/price-cell';

const cx = classNames.bind(styles);

const PriceCell = ({index, value, setOnce, fetchStatus, errorText, onChange}) => {
  const getDisplayValue = function getDisplayValueFunc(givenValue, givenSetOnce) {
    if (givenSetOnce) {
      return givenValue;
    }
    return '';
  };

  const displayValue = getDisplayValue(value, setOnce);

  const handleOnChange = function handleOnChangeFunc(event, newValue) {
    onChange(index, 'price', newValue);
  };

  return (

    <div>
      <TextField
               id={'priceTextField' + index}
               value={displayValue}
               errorText={errorText}
               onChange={handleOnChange}
               hintText="1.00"
               errorStyle={{ float: 'left' }}
               className={cx('price-text-field')} />
      <PriceProgress fetchStatus={fetchStatus} />
    </div>
  );
};

PriceCell.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  setOnce: PropTypes.bool.isRequired,
  fetchStatus: PropTypes.string.isRequired,
  errorText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PriceCell;
