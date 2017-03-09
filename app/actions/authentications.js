/* eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import { isEmailAddressAvailable, manualLogin, register, sendPasswordReset } from './users';
import * as types from '../types';
import * as constants from '../constants'
import { getAuthenticationSelect } from '../selectors/index';

polyfill();

function isValidEmailAddress( emailAddress ) {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test( emailAddress );
}

function emailTextFieldChangeDispatch( value ) {
  return {
    type: types.EMAIL_TEXT_FIELD_CHANGE,
    value
  };
}

function beginEmailAddressValidation() {
  return {
    type: types.BEGIN_EMAIL_ADDRESS_VALIDATION
  };
}

function finishEmailAddressValidation( validationStatus ) {
  return {
    type: types.FINISH_EMAIL_ADDRESS_VALIDATION,
    validationStatus
  };
}

function validateEmailTextField( value ) {
  return (dispatch, getState) => {
    dispatch( beginEmailAddressValidation() );
    let validationStatus = constants.VALIDATION_NO_CONFLICT;
    if ( isValidEmailAddress( value ) ) {
      dispatch( isEmailAddressAvailable( value, (isAvailable) => {
        if ( !isAvailable ) {
          validationStatus = constants.VALIDATION_CONFLICT;
        }
        dispatch( finishEmailAddressValidation( validationStatus ) );
      } ) );
    } else {
      validationStatus = constants.VALIDATION_INVALID_FORMAT;
      dispatch( finishEmailAddressValidation( validationStatus ) );
    }
  }
}

function setEmailTextFieldValidationTimeout( timeout ) {
  return {
    type: types.EMAIL_TEXT_FIELD_SET_VALIDATION_TIMEOUT,
    timeout
  };
}

export function emailTextFieldChange( value ) {
  if ( !value ) {
    return {
      type: types.EMAIL_TEXT_FIELD_CHANGE,
      value
    };
  }
  return (dispatch, getState) => {
    const {authentication} = getState();
    clearTimeout( authentication.emailTextField.timeout );
    dispatch( emailTextFieldChangeDispatch( value ) );

    const dispatchValidateEmail = function dispatchValidateEmail() {
      dispatch( validateEmailTextField( value ) );
    };
    if ( !authentication.emailTextField.validatedOnce ) {
      const validationTimeout = setTimeout( dispatchValidateEmail, 1000 );
      dispatch( setEmailTextFieldValidationTimeout( validationTimeout ) );
    } else {
      dispatch( validateEmailTextField( value ) );
    }
  }
}

export function passwordTextFieldChange( value ) {
  return {
    type: types.PASSWORD_TEXT_FIELD_CHANGE,
    value
  };
}

export function passwordConfirmationTextFieldChange( value ) {
  return {
    type: types.PASSWORD_CONFIRMATION_TEXT_FIELD_CHANGE,
    value
  };
}
/*
export function passwordTextFieldChange2( value ) {
  let valid = true;
  let errorText = '';
  if ( !value ) {
    valid = false;
    errorText = 'Required';
  } else if ( value.length < 6 ) {
    valid = false;
    errorText = '6 characters min';
  }
  return {
    type: types.PASSWORD_TEXT_FIELD_CHANGE,
    value,
    valid,
    errorText
  };
}

export function passwordConfirmationTextFieldDispatch( value, valid, errorText ) {
  return {
    type: types.PASSWORD_CONFIRMATION_TEXT_FIELD_CHANGE,
    value,
    valid,
    errorText
  }
}

export function passwordConfirmationTextFieldChange( value ) {
  return (dispatch, getState) => {
    let valid = true;
    let errorText = '';
    const {authentication} = getState();
    if ( authentication.passwordTextField.value !== value ) {
      valid = false;
      errorText = 'Passwords do not match';
    }
    dispatch( passwordConfirmationTextFieldDispatch( value, valid, errorText ) );
  }
}
 */
export function toggleAuthenticationMode() {
  return {
    type: types.CHANGE_AUTHENTICATION_MODE
  };
}

function hastyRegistration() {
  return {
    type: types.SIGNUP_HASTY_USER
  };
}

function hastyLogin() {
  return {
    type: types.LOGIN_HASTY_USER
  };
}

function hastySendPasswordReset() {
  return {
    type: types.PASSWORD_RESET_HASTY_USER
  };
}

export function registerPress() {
  return (dispatch, getState) => {
    const authenticationSelect = getAuthenticationSelect( getState() );
    if ( authenticationSelect.registrationEmailTextFieldSelect.valid && authenticationSelect.passwordTextFieldSelect.valid && authenticationSelect.passwordConfirmationTextFieldSelect.valid ) {
      dispatch( register() );
    } else {
      dispatch( hastyRegistration() );
    }
  }
}

export function loginPress() {
  return (dispatch, getState) => {
    const authenticationSelect = getAuthenticationSelect( getState() );
    if ( authenticationSelect.loginEmailTextFieldSelect.valid && authenticationSelect.passwordTextFieldSelect.valid ) {
      dispatch( manualLogin() );
    } else {
      dispatch( hastyLogin() );
    }
  }
}

export function sendPasswordResetPress() {
  return (dispatch, getState) => {
    const authenticationSelect = getAuthenticationSelect( getState() );
    if ( authenticationSelect.loginEmailTextFieldSelect.valid ) {
      dispatch( sendPasswordReset() );
    } else {
      dispatch( hastyLogin() );
    }
  }
}
