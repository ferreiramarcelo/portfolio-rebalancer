import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import classNames from 'classnames/bind';
import styles from '../css/components/security-text-field';

const cx = classNames.bind( styles );


const SymbolTextField = ({index, symbol, symbolSelect, securityTextFieldChange}) => {

  const handleOnChange = (event, value) => {
    securityTextFieldChange( index, 'symbol', value );
  }

  return (
  <TextField
             className={ cx( 'textfield' ) }
             errorStyle={ { float: "left" } }
             id={ 'symbolTextField' + index }
             value={ symbol.value }
             errorText={ symbolSelect.errorText }
             hintText={ symbolSelect.hintText }
             onChange={ handleOnChange } />
  );
};

SymbolTextField.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  securityTextFieldChange: PropTypes.func.isRequired,
};

export default SymbolTextField;
