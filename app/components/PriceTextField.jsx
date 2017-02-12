import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import PriceProgress from '../components/PriceProgress';

import classNames from 'classnames/bind';
import styles from '../css/components/portfolio-table/price-cell';
const cx = classNames.bind( styles );

const PriceTextField = ({index, price, priceSelect, securityTextFieldChange}) => {

    const getDisplayValue = (price) => {
      if (!price.setOnce) {
        return '';
      }
      return price.value;
    }

    const displayValue = getDisplayValue(price);

  const handleOnChange = (event, value) => {
    securityTextFieldChange( index, 'price', value );
  }

  return (

  <div>
      <TextField
                 className={ cx( 'PriceTextField' ) }
                 id={ 'priceTextField' + index }
                 value={ displayValue }
                 errorText={ priceSelect.errorText }
                 hintText={ priceSelect.hintText }
                 onChange={ handleOnChange } />
      <PriceProgress price={price} />
  </div>
  );
};

PriceTextField.propTypes = {
  index: PropTypes.number.isRequired,
  price: PropTypes.object.isRequired,
  securityTextFieldChange: PropTypes.func.isRequired,
};

export default PriceTextField;
