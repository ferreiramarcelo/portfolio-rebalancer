import { combineReducers } from 'redux';
import * as types from '../types';
import * as constants from '../constants'

function validateEmailAddress( emailAddress ) {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test( emailAddress );
}

const isLoginMode = (state = true, action) => {
  switch (action.type) {
    case types.CHANGE_AUTHENTICATION_MODE:
      return !state;
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
    case types.PASSWORD_RESET_SUCCESS_USER:
      return true;
    default:
      return state;
  }
};

const emailTextField = (state = {
    value: '',
    dirty: false,
    timeout: null,
    validationStatus: constants.NOT_VALIDATING,
    validatedOnce: false
  } , action) => {
  switch (action.type) {
    case types.LOGIN_HASTY_USER:
    case types.SIGNUP_HASTY_USER:
    case types.PASSWORD_RESET_HASTY_USER:
      return {
        ...state,
        dirty: true,
      };
    case types.EMAIL_TEXT_FIELD_CHANGE:
      return {
        ...state,
        value: action.value,
        dirty: true,
        validationStatus: constants.NOT_VALIDATING
      };
    case types.BEGIN_EMAIL_ADDRESS_VALIDATION:
      return {
        ...state,
        validationStatus: constants.IS_VALIDATING
      };
    case types.FINISH_EMAIL_ADDRESS_VALIDATION:
      return {
        ...state,
        validationStatus: action.validationStatus,
        validatedOnce: true
      };
    case types.EMAIL_TEXT_FIELD_SET_VALIDATION_TIMEOUT:
      return {
        ...state,
        timeout: action.timeout
      };
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
      return {
          value: '',
          dirty: false,
          timeout: null,
          validationStatus: constants.NOT_VALIDATING,
          validatedOnce: false
        };
    default:
      return state;
  }
};

const passwordTextField = (state = {
    value: '',
    dirty: 0
  }, action) => {
  switch (action.type) {
    case types.LOGIN_HASTY_USER:
    case types.SIGNUP_HASTY_USER:
      return {
        ...state,
        dirty: true,
      };
    case types.PASSWORD_TEXT_FIELD_CHANGE:
      return {
        value: action.value,
        dirty: 1
      };
      case types.LOGIN_SUCCESS_USER:
      case types.SIGNUP_SUCCESS_USER:
      return {
        value: '',
        dirty: 0
      };
    default:
      return state;
  }
};

const passwordConfirmationTextField = (state = {
    value: '',
    dirty: 0
  }, action) => {
  switch (action.type) {
    case types.SIGNUP_HASTY_USER:
      return {
        ...state,
        dirty: true,
      };
    case types.PASSWORD_CONFIRMATION_TEXT_FIELD_CHANGE:
      return {
        value: action.value,
        dirty: 1
      };
      case types.LOGIN_SUCCESS_USER:
      case types.SIGNUP_SUCCESS_USER:
      return {
        value: '',
        dirty: 0
      };
    default:
      return state;
  }
};


/*
const passwordTextField = (state = {
    value: '',
    dirty: false,
    valid: false,
    errorText: 'Required'
  } , action) => {
  switch (action.type) {
    case types.SIGNUP_HASTY_USER:
      return {
        ...state,
        dirty: true,
      };
    case types.PASSWORD_TEXT_FIELD_CHANGE:
      return {
        ...state,
        value: action.value,
        dirty: true,
        valid: action.valid,
        errorText: action.errorText
      };
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
      return {
        ...state,
        value: '',
        dirty: false,
        valid: false,
        errorText: 'Required'
      };
    default:
      return state;
  }
};

const passwordConfirmationTextField = (state = {
    value: '',
    dirty: false,
    valid: false,
    errorText: 'Required'
  } , action) => {
  switch (action.type) {
    case types.SIGNUP_HASTY_USER:
      return {
        ...state,
        dirty: true,
      };
    case types.PASSWORD_CONFIRMATION_TEXT_FIELD_CHANGE:
      return {
        ...state,
        value: action.value,
        dirty: true,
        valid: action.valid,
        errorText: action.errorText
      };
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
      return {
        ...state,
        value: '',
        dirty: false,
        valid: false,
        errorText: 'Required'
      };
    default:
      return state;
  }
}; */

const registrationStatus = (state = constants.NOT_PROCESSING, action) => {
  switch (action.type) {
    case types.SIGNUP_USER:
      return constants.IS_PROCESSING;
    case types.SIGNUP_SUCCESS_USER:
      return constants.NOT_PROCESSING;
    case types.SIGNUP_ERROR_USER:
      return constants.NOT_PROCESSING;
    default:
      return state;
  }
}

const loginStatus = (state = constants.NOT_PROCESSING, action) => {
  switch (action.type) {
    case types.MANUAL_LOGIN_USER:
      return constants.IS_PROCESSING;
    case types.LOGIN_SUCCESS_USER:
      return constants.NOT_PROCESSING;
    case types.LOGIN_ERROR_USER:
      return constants.NOT_PROCESSING;
    default:
      return state;
  }
}

const sendPasswordResetStatus = (state = constants.NOT_PROCESSING, action) => {
  switch (action.type) {
    case types.PASSWORD_RESET_USER:
      return constants.IS_PROCESSING;
    case types.PASSWORD_RESET_SUCCESS_USER:
      return constants.NOT_PROCESSING;
    case types.PASSWORD_RESET_ERROR_USER:
      return constants.NOT_PROCESSING;
    default:
      return state;
  }
}

const authenticationReducer = combineReducers( {
  isLoginMode,
  emailTextField,
  passwordTextField,
  passwordConfirmationTextField,
  registrationStatus,
  loginStatus,
  sendPasswordResetStatus
} );

export default authenticationReducer;
