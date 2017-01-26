/* eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from '../types';

polyfill();

export function investmentAmountTextFieldChange(value) {
    return {
        type: types.INVESTMENT_AMOUNT_TEXT_FIELD_CHANGE,
        value: value
    };
}

export function investmentAmountTextFieldValid(valid) {
    return {
        type: types.INVESTMENT_AMOUNT_TEXT_FIELD_VALID,
        valid: valid
    };
}

export function investmentAmountTextFieldError(error) {
    return {
        type: types.INVESTMENT_AMOUNT_TEXT_FIELD_ERROR,
        error: error
    };
}
