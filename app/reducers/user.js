import { combineReducers } from 'redux';
import * as types from '../types';
import * as constants from '../constants';

const message = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.CHANGE_AUTHENTICATION_MODE:
    case types.LOGOUT_USER:
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
      return '';
    case types.LOGIN_ERROR_USER:
      switch (action.response) {
        case constants.RESPONSE_LOG_IN_NOT_FOUND:
          return 'No account found for ' + action.email +'.';
        default:
          return 'Log in failed. Please try again later.'
      }
    case types.SIGNUP_ERROR_USER:
    case types.PASSWORD_RESET_ERROR_USER:
    switch (action.response) {
      case constants.RESPONSE_SEND_PASSWORD_NOT_FOUND:
        return 'No account found for ' + action.email +'.';
      default:
        return 'Failed to send the password reset email. Please try again later.'
    }
      return action.response;
    default:
      return state;
  }
};

const authenticated = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
    case types.LOGOUT_ERROR_USER:
    case types.VERIFY_SUCCESS_USER:
      return true;
    case types.LOGIN_ERROR_USER:
    case types.SIGNUP_ERROR_USER:
    case types.LOGOUT_SUCCESS_USER:
      return false;
    default:
      return state;
  }
};

const verified = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.VERIFY_SUCCESS_USER:
      return true;
    default:
      return state;
  }
};

const email = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
    case types.VERIFY_SUCCESS_USER:
      return action.email;
    case types.LOGIN_ERROR_USER:
    case types.SIGNUP_ERROR_USER:
    case types.LOGOUT_SUCCESS_USER:
      return '';
    default:
      return state;
  }
};

const userReducer = combineReducers({
  message,
  authenticated,
  verified,
  email
});

export default userReducer;
