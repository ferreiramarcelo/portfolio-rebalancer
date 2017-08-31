import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import EditorMoneyOff from 'material-ui/svg-icons/editor/money-off';
import ReactTooltip from 'react-tooltip';
import IconButton from 'material-ui/IconButton';
import classNames from 'classnames/bind';
import PriceProgress from './PriceProgress';
import styles from '../../../css/components/portfolio/portfolio-table/price-cell';

const cx = classNames.bind(styles);

const PriceCell = ({currencies, fetchPrice, index, price, priceSelect, securityTextFieldChange, symbol}) => {
  const getDisplayValue = function getDisplayValue(givenValue, givenSetOnce) {
    if (givenSetOnce) {
      return givenValue;
    }
    return '';
  };
  const displayValue = getDisplayValue(price.value, price.dirty);

  const handleOnChange = function handleOnChange(event, newValue) {
    securityTextFieldChange(index, 'price', newValue);
  };

  const getConvertedIndicator = function getConvertedIndicator(price, givenCurrencies) {
    if (!price.currency || price.currency === givenCurrencies.tradingCurrency) {
      return null;
    }
    return (
      <div className={cx('conversion-indicator-container')}>
        <div className={cx('price-progress')}>
          <EditorMoneyOff data-tip="data-tip" data-for={'tooltipSecurityConverted' + price.index} />
          <ReactTooltip id={'tooltipSecurityConverted' + price.index}>
            <span>Price converted from { price.currency } to { givenCurrencies.tradingCurrency } at a { currencies.listOfDistinctCurrencies[price.currency] } exchange rate</span>
          </ReactTooltip>
        </div>
      </div>
      );
  };
  const convertedIndicator = getConvertedIndicator(price, currencies);

  return (
    <div className={cx('price-text-field')}>
      <TextField
id={'priceTextField' + index} value={displayValue} errorText={priceSelect.errorText} onChange={handleOnChange} hintText={priceSelect.hintText} errorStyle={{ float: 'left' }}
      />
      <PriceProgress index={index} fetchStatus={price.fetchStatus} onClick={fetchPrice} symbol={symbol} />
      { convertedIndicator }
    </div>
    );
};

PriceCell.propTypes = {
  fetchPrice: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  price: PropTypes.object.isRequired,
  priceSelect: PropTypes.object.isRequired,
  securityTextFieldChange: PropTypes.func.isRequired
};

export default PriceCell;
