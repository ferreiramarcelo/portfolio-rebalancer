import { polyfill } from 'es6-promise';
import request from 'axios';
import { push } from 'react-router-redux';
import * as types from '../types';
import * as constants from '../constants';

polyfill();

function makeUserRequest(method, data, api = '/login') {
  return request[method](api, data);
}

function beginLogin() {
  return {
    type: types.MANUAL_LOGIN_USER
  };
}

function loginSuccess(response, email) {
  return {
    type: types.LOGIN_SUCCESS_USER,
    response,
    email
  };
}

function loginError(response, email) {
  return {
    type: types.LOGIN_ERROR_USER,
    response,
    email
  };
}

function beginSignUp() {
  return {
    type: types.SIGNUP_USER
  };
}

function signUpSuccess(response, email) {
  return {
    type: types.SIGNUP_SUCCESS_USER,
    response,
    email
  };
}

function signUpError(response, email) {
  return {
    type: types.SIGNUP_ERROR_USER,
    response,
    email
  };
}

function beginLogout() {
  return {
    type: types.LOGOUT_USER
  };
}

function logoutSuccess() {
  return {
    type: types.LOGOUT_SUCCESS_USER
  };
}

function logoutError() {
  return {
    type: types.LOGOUT_ERROR_USER
  };
}

function beginSendVerificationEmail() {
  return {
    type: types.SEND_VERIFICATION_EMAIL_USER
  };
}

function sendVerificationEmailSuccess(response, email) {
  return {
    type: types.SEND_VERIFICATION_EMAIL_SUCCESS_USER,
    response,
    email
  };
}

function sendVerificationEmailError(response) {
  return {
    type: types.SEND_VERIFICATION_EMAIL_ERROR_USER,
    response
  };
}

function beginVerify() {
  return {
    type: types.VERIFY_USER
  };
}

function verifySuccess(response, email) {
  return {
    type: types.VERIFY_SUCCESS_USER,
    response,
    email
  };
}

function verifyError(response) {
  return {
    type: types.VERIFY_ERROR_USER,
    response
  };
}

function beginResetPassword() {
  return {
    type: types.SEND_PASSWORD_RESET_USER
  };
}

function resetPasswordSuccess(response) {
  return {
    type: types.SEND_PASSWORD_RESET_SUCCESS_USER,
    response
  };
}

function resetPasswordError(response, email) {
  return {
    type: types.SEND_PASSWORD_RESET_ERROR_USER,
    response,
    email
  };
}

function beginChangePassword() {
  return {
    type: types.PASSWORD_CHANGE_USER
  };
}

function changePasswordSuccess(response) {
  return {
    type: types.PASSWORD_CHANGE_SUCCESS_USER,
    response
  };
}

function changePasswordError(response) {
  return {
    type: types.PASSWORD_CHANGE_ERROR_USER,
    response
  };
}

function beginGetPasswordResetTokenValidity() {
  return {
    type: types.GET_PASSWORD_RESET_TOKEN_VALIDITY_USER
  };
}

function getPasswordResetTokenValiditySuccess(response) {
  return {
    type: types.GET_PASSWORD_RESET_TOKEN_VALIDITY_SUCCESS_USER,
    response
  };
}

function getPasswordResetTokenValidityError(response) {
  return {
    type: types.GET_PASSWORD_RESET_TOKEN_VALIDITY_ERROR_USER,
    response
  };
}

export function isEmailAddressAvailable(email, callback) {
  return () => {
    return makeUserRequest('get', null, '/isemailaddressavailable/' + email)
      .then(response => {
        if (response.status === 200) {
          return callback(true);
        }
        return callback(false);
      })
      .catch(() => {
        return callback(false);
      });
  };
}

export function sendVerificationEmail() {
  return (dispatch, getState) => {
    dispatch(beginSendVerificationEmail());
    const {user} = getState();
    const data = {
      email: user.email
    };
    return makeUserRequest('post', data, '/sendverify')
      .then(response => {
        if (response.status === 200) {
          dispatch(sendVerificationEmailSuccess(response.data.response, data.email));
        } else {
          dispatch(sendVerificationEmailError(response.data.response));
        }
      })
      .catch(err => {
        dispatch(sendVerificationEmailError(err.response.data.response));
      });
  };
}

export function manualLogin() {
  return (dispatch, getState) => {
    dispatch(beginLogin());
    const {authentication} = getState();
    const data = {
      email: authentication.emailTextField.value,
      password: authentication.currentPasswordTextField.value
    };
    return makeUserRequest('post', data, '/login')
      .then(response => {
        if (response.status === 200) {
          dispatch(loginSuccess(response.data.response, data.email));
          dispatch(push('/'));
        } else {
          dispatch(loginError(response.data.response, data.email));
        }
      })
      .catch(err => {
        dispatch(loginError(err.response.data.response, data.email));
      });
  };
}

export function register() {
  return (dispatch, getState) => {
    dispatch(beginSignUp());
    const {authentication} = getState();
    const data = {
      email: authentication.emailTextField.value,
      password: authentication.passwordTextField.value
    };
    return makeUserRequest('post', data, '/register')
      .then(response => {
        if (response.status === 200) {
          dispatch(signUpSuccess(response.data.response, data.email));
          dispatch(push('/'));
          dispatch(sendVerificationEmail());
        } else {
          dispatch(signUpError(response.data.response, data.email));
        }
      })
      .catch(err => {
        dispatch(signUpError(err.response.data.response, data.email));
      });
  };
}

export function logOut() {
  return dispatch => {
    dispatch(beginLogout());
    return makeUserRequest('post', null, '/logout')
      .then(response => {
        if (response.status === 200) {
          dispatch(logoutSuccess());
          dispatch(push('/'));
        } else {
          dispatch(logoutError());
        }
      });
  };
}

export function verify(token) {
  return (dispatch) => {
    dispatch(beginVerify());
    const data = {
      token
    };
    return makeUserRequest('post', data, '/dbverify')
      .then(response => {
        if (response.status === 200) {
          dispatch(verifySuccess(response.data.response, response.data.email));
          dispatch(push('/'));
        } else {
          dispatch(verifyError(response.data.response));
        }
      })
      .catch(err => {
        dispatch(verifyError(err.response.data.response));
      });
  };
}

export function sendPasswordReset() {
  return (dispatch, getState) => {
    dispatch(beginResetPassword());
    const {authentication} = getState();
    const data = {
      email: authentication.emailTextField.value
    };
    return makeUserRequest('post', data, '/sendpasswordreset')
      .then(response => {
        if (response.status === 200) {
          dispatch(resetPasswordSuccess(response.data.response));
        } else {
          dispatch(resetPasswordError(response.data.response, data.email));
        }
      })
      .catch(err => {
        dispatch(resetPasswordError(err.response.data.response, data.email));
      });
  };
}

export function isPasswordResetTokenValid(token) {
  return (dispatch) => {
    dispatch(beginGetPasswordResetTokenValidity());
    return makeUserRequest('get', null, '/ispasswordresettokenvalid/' + token)
      .then(response => {
        if (response.status === 200) {
          dispatch(getPasswordResetTokenValiditySuccess(response.data.response));
        } else {
          dispatch(getPasswordResetTokenValidityError(response.data.response));
        }
      })
      .catch(err => {
        dispatch(getPasswordResetTokenValidityError(err.response.data.response));
      });
  };
}

export function changePassword() {
  return (dispatch, getState) => {
    dispatch(beginChangePassword());
    const {authentication, user} = getState();
    const data = {
      email: user.email,
      currentPassword: authentication.currentPasswordTextField.value,
      newPassword: authentication.passwordTextField.value
    };
    return makeUserRequest('post', data, '/changepassword')
      .then(response => {
        if (response.status === 200) {
          dispatch(changePasswordSuccess(response.data.response));
        } else {
          dispatch(changePasswordError(response.data.response));
        }
      })
      .catch(err => {
        dispatch(changePasswordError(err.response.data.response));
      });
  };
}

export function changePasswordWithToken(token) {
  return (dispatch, getState) => {
    dispatch(beginChangePassword());
    const {authentication} = getState();
    const data = {
      token,
      newPassword: authentication.passwordTextField.value
    };
    return makeUserRequest('post', data, '/changepasswordwithtoken')
      .then(response => {
        if (response.status === 200) {
          dispatch(changePasswordSuccess(response.data.response));
          dispatch(push('/'));
        } else {
          dispatch(changePasswordError(response.data.response));
        }
      })
      .catch(err => {
        dispatch(changePasswordError(err.response.data.response));
      });
  };
}
