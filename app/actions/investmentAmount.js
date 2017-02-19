/* eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import * as types from '../types';

polyfill();

export function investmentAmountTextFieldChange(value) {
  return {
    type: types.INVESTMENT_AMOUNT_TEXT_FIELD_CHANGE,
    value
  };
}

export function investmentAmountTextFieldValid() {
  return {
    type: types.INVESTMENT_AMOUNT_TEXT_FIELD_VALID
  };
}

export function investmentAmountTextFieldError(error) {
  return {
    type: types.INVESTMENT_AMOUNT_TEXT_FIELD_ERROR,
    error
  };
}
