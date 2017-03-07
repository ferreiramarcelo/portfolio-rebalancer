import { combineReducers } from 'redux';
import * as types from '../types';
import * as constants from '../constants';

const verificationEmailSendingStatus = (state = constants.NOT_FETCHING,
  action
) => {
  switch (action.type) {
    case types.CHANGE_TAB:
      return constants.NOT_FETCHING;
    case types.SEND_VERIFICATION_EMAIL_USER:
      return constants.IS_FETCHING;
    case types.SEND_VERIFICATION_EMAIL_SUCCESS_USER:
      return constants.FETCH_SUCCEEDED
    case types.SEND_VERIFICATION_EMAIL_ERROR_USER:
      switch (action.response) {
        case types.RESPONSE_SEND_VERIFICATION_EMAIL_NOT_FOUND:
          return constants.FETCH_FAILED_NOT_FOUND;
        case types.RESPONSE_SEND_VERIFICATION_EMAIL_FAILURE:
        default:
          return constants.FETCH_FAILED;
      }
    default:
      return state;
  }
};

const accontReducer = combineReducers( {
  verificationEmailSendingStatus
} );

export default accontReducer;
