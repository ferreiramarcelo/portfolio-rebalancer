import { combineReducers } from 'redux';
import * as types from '../types';
import * as constants from '../constants';

const message = (state = {
    value: '',
    type: constants.NONE
  },
  action
) => {
  switch (action.type) {
    case types.CHANGE_AUTHENTICATION_MODE:
    case types.CHANGE_TAB:
    case types.LOGOUT_USER:
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
      return {
        value: '',
        type: constants.NONE
      };
    case types.LOGIN_ERROR_USER:
      switch (action.response) {
        case constants.RESPONSE_LOG_IN_NOT_FOUND:
          return {
            value: 'Invalid email and password comination.',
            type: constants.MESSAGE_FAILURE
          };
        case constants.RESPONSE_LOG_IN_FAILURE_IS_GOOGLE:
          return {
            value: 'This account was registered through Google Sign In. Choose Continue with Google instead.  ',
            type: constants.MESSAGE_FAILURE
          };
        default:
          return {
            value: 'Log in failed. Please try again later.',
            type: constants.MESSAGE_FAILURE
          };
      }
    case types.SIGNUP_ERROR_USER:
      switch (action.response) {
        case constants.RESPONSE_REGISTER_CONFLICT:
          return {
            value: 'Account already exists for ' + action.email + '.',
            type: constants.MESSAGE_FAILURE
          };
        default:
          return {
            value: 'Failed to register. Please try again later.',
            type: constants.MESSAGE_FAILURE
          };
      }
    case types.SEND_PASSWORD_RESET_ERROR_USER:
      switch (action.response) {
        case constants.RESPONSE_SEND_PASSWORD_NOT_FOUND:
          return {
            value: 'No account found for ' + action.email + '.',
            type: constants.MESSAGE_FAILURE
          };
        case constants.RESPONSE_SEND_PASSWORD_RESET_IS_GOOGLE:
          return {
            value: action.email + ' was registered through Google Sign In. Continue with Google instead.',
            type: constants.MESSAGE_FAILURE
          };
        default:
          return {
            value: 'Failed to send the password reset email. Please try again later.',
            type: constants.MESSAGE_FAILURE
          };
      }
    case types.PASSWORD_CHANGE_ERROR_USER:
      switch (action.response) {
        case constants.RESPONSE_PASSWORD_RESET_INVALID_PASSWORD:
          return {
            value: 'Current password is invalid.',
            type: constants.MESSAGE_FAILURE
          };
        default:
          return {
            value: 'Password change failed. Please try again later.',
            type: constants.MESSAGE_FAILURE
          };
      }
    case types.PASSWORD_CHANGE_SUCCESS_USER:
      switch (action.response) {
        case constants.RESPONSE_PASSWORD_RESET_INVALID_PASSWORD:
        default:
          return {
            value: 'Password successfully changed!',
            type: constants.MESSAGE_SUCCESS
          };
      }
    case types.LOGIN_HASTY_USER:
    case types.SIGNUP_HASTY_USER:
    case types.SEND_PASSWORD_RESET_HASTY_USER:
    case types.PASSWORD_CHANGE_HASTY_USER:
      return {
        value: 'Please fill in the fields.',
        type: constants.MESSAGE_FAILURE
      };
    default:
      return state;
  }
};

const authenticated = (state = false,
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

const verified = (state = false,
  action
) => {
  switch (action.type) {
    case types.VERIFY_SUCCESS_USER:
      return true;
    default:
      return state;
  }
};

const email = (state = '',
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

const accountType = (state = constants.ACCOUNT_TYPE_INTERNAL,
  action
) => {
  switch (action.type) {
    default:
      return state;
  }
};

const userReducer = combineReducers({
  message,
  authenticated,
  verified,
  email,
  accountType
});

export default userReducer;
