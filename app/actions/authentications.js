/* eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from '../types';

polyfill();

export function emailTextFieldChange( value ) {
  return {
    type: types.EMAIL_TEXT_FIELD_CHANGE,
    value: value
  };
}

export function passwordTextFieldChange( value ) {
  return {
    type: types.PASSWORD_TEXT_FIELD_CHANGE,
    value: value
  };
}

export function passwordConfirmationTextFieldChange( value ) {
  return {
    type: types.PASSWORD_CONFIRMATION_TEXT_FIELD_CHANGE,
    value: value
  };
}

export function toggleAuthenticationMode() {
  return {
    type: types.CHANGE_AUTHENTICATION_MODE
  };
}
