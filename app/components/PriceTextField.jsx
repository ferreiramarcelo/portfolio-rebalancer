import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import PriceProgress from '../components/PriceProgress';

import classNames from 'classnames/bind';
import styles from '../css/components/portfolio-table/price-cell';
const cx = classNames.bind( styles );

const PriceTextField = ({index, price, securityTextFieldChange}) => {

  const handleOnChange = (event, value) => {
    securityTextFieldChange( index, 'price', value );
  }

  return (
  <div style={ { display: 'table', } }>
    <div style={ { paddingRight: '5px', display: 'table-cell', } }>
      <TextField
                 id={ 'priceTextField' + index }
                 value={ price.value }
                 errorText={ price.errorText }
                 onChange={ handleOnChange } />
    </div>
    <PriceProgress price={ price } />
  </div>
  );
};

PriceTextField.propTypes = {
  index: PropTypes.number.isRequired,
  price: PropTypes.object.isRequired,
  securityTextFieldChange: PropTypes.func.isRequired,
};

export default PriceTextField;
