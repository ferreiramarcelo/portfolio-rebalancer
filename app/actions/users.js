import { polyfill } from 'es6-promise';
import request from 'axios';
import { push } from 'react-router-redux';

import * as types from '../types';

polyfill();

const getMessage = res => res.response && res.response.data && res.response.data.message;

function makeUserRequest(method, data, api = '/login') {
  return request[method](api, data);
}


// Log In Action Creators
export function beginLogin() {
  return { type: types.MANUAL_LOGIN_USER };
}

export function loginSuccess(message, email) {
  return {
    type: types.LOGIN_SUCCESS_USER,
    message,
	email
  };
}

export function loginError(message) {
  return {
    type: types.LOGIN_ERROR_USER,
    message
  };
}

// Sign Up Action Creators
export function signUpError(message) {
  return {
    type: types.SIGNUP_ERROR_USER,
    message
  };
}

export function beginSignUp() {
  return { type: types.SIGNUP_USER };
}

export function signUpSuccess(message, email) {
  return {
    type: types.SIGNUP_SUCCESS_USER,
    message,
	email
  };
}

// Log Out Action Creators
export function beginLogout() {
  return { type: types.LOGOUT_USER};
}

export function logoutSuccess() {
  return { type: types.LOGOUT_SUCCESS_USER };
}

export function logoutError() {
  return { type: types.LOGOUT_ERROR_USER };
}

export function toggleLoginMode() {
  return { type: types.TOGGLE_LOGIN_MODE };
}

export function manualLogin() {
  return (dispatch, getState) => {
    dispatch(beginLogin());
    const { authentication } = getState();
    let data = {email: authentication.emailTextField.value, password: authentication.passwordTextField.value};
    return makeUserRequest('post', data, '/login')
      .then(response => {
        if (response.status === 200) {
          dispatch(loginSuccess(response.data.message, data.email));
          dispatch(push('/'));
        } else {
          dispatch(loginError('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(loginError(getMessage(err)));
      });
  };
}

export function register() {
  return (dispatch, getState) => {
    dispatch(beginSignUp());
    const { authentication } = getState();
    let data = {email: authentication.emailTextField.value, password: authentication.passwordTextField.value};
    return makeUserRequest('post', data, '/signup')
      .then(response => {
        if (response.status === 200) {
          dispatch(signUpSuccess(response.data.message, data.email));
          dispatch(push('/'));
        } else {
          dispatch(signUpError('Oops! Something went wrong'));
        }
      })
      .catch(err => {
        dispatch(signUpError(getMessage(err)));
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
        } else {
          dispatch(logoutError());
        }
      });
  };
}
