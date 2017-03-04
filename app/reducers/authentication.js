import { combineReducers } from 'redux';
import * as types from '../types';

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
    setOnce: 0
  }, action) => {
  switch (action.type) {
    case types.EMAIL_TEXT_FIELD_CHANGE:
      return {
        value: action.value,
        setOnce: 1
      };
      case types.LOGIN_SUCCESS_USER:
      case types.SIGNUP_SUCCESS_USER:
      return {
        value: '',
        setOnce: 0
      };
    default:
      return state;
  }
};

const passwordTextField = (state = {
    value: '',
    setOnce: 0
  }, action) => {
  switch (action.type) {
    case types.PASSWORD_TEXT_FIELD_CHANGE:
      return {
        value: action.value,
        setOnce: 1
      };
      case types.LOGIN_SUCCESS_USER:
      case types.SIGNUP_SUCCESS_USER:
      return {
        value: '',
        setOnce: 0
      };
    default:
      return state;
  }
};

const passwordConfirmationTextField = (state = {
    value: '',
    setOnce: 0
  }, action) => {
  switch (action.type) {
    case types.PASSWORD_CONFIRMATION_TEXT_FIELD_CHANGE:
      return {
        value: action.value,
        setOnce: 1
      };
      case types.LOGIN_SUCCESS_USER:
      case types.SIGNUP_SUCCESS_USER:
      return {
        value: '',
        setOnce: 0
      };
    default:
      return state;
  }
};

const authenticationReducer = combineReducers({
  isLoginMode,
  emailTextField,
  passwordTextField,
  passwordConfirmationTextField
});

export default authenticationReducer;
