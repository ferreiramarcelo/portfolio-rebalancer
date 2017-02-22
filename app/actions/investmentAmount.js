/* eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import * as types from '../types';

polyfill();

export default function investmentAmountTextFieldChange(value) {
  return {
    type: types.INVESTMENT_AMOUNT_TEXT_FIELD_CHANGE,
    value
  };
}
