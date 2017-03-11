import { combineReducers } from 'redux';
import * as types from '../types';
import * as constants from '../constants';

const open = (state = false, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS_USER:
      switch (action.response) {
        case constants.RESPONSE_LOG_IN_EMAIL_NOT_VERIFIED:
          return true;
        default:
          return false;
      }
    case types.VERIFY_SUCCESS_USER:
    case types.SEND_PASSWORD_RESET_SUCCESS_USER:
    case types.VERIFY_ERROR_USER:
    case types.SEND_VERIFICATION_EMAIL_ERROR_USER:
    case types.SEND_VERIFICATION_EMAIL_SUCCESS_USER:
    case types.PASSWORD_RESET_SUCCESS_USER:
      return true;
    case types.DISMISS_MESSAGE:
      return false;
    default:
      return state;
  }
};

const response = (state = '', action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS_USER:
    case types.VERIFY_SUCCESS_USER:
    case types.SEND_PASSWORD_RESET_SUCCESS_USER:
    case types.VERIFY_ERROR_USER:
    case types.SEND_VERIFICATION_EMAIL_SUCCESS_USER:
    case types.SEND_VERIFICATION_EMAIL_ERROR_USER:
    case types.SEND_VERIFICATION_EMAIL_ERROR_USER:
    case types.PASSWORD_RESET_SUCCESS_USER:
      return action.response;
    default:
      return state;
  }
};

const messageReducer = combineReducers({
  open,
  response,
});

export default messageReducer;
