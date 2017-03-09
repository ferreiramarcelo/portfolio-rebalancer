/* eslint no-useless-escape: 0*/
import { createSelector } from 'reselect';
import * as constants from '../constants';
const getAuthentication = (state) => state.authentication;

function validateEmailAddress(emailAddress) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(emailAddress);
}

const getRegistrationEmailTextFieldSelect = function getEmailTextFieldSelect(emailTextField) {
  let valid = true;
  let errorText = '';
  if (!emailTextField.dirty) {
    valid = false;
    errorText = '';
  }
  else if (!emailTextField.value) {
    valid = false;
    errorText = 'Required';
  }
  else if (emailTextField.validationStatus) {
    switch (emailTextField.validationStatus) {
      case constants.VALIDATION_CONFLICT:
        valid = false;
        errorText = 'Already in use';
        break;
      case constants.VALIDATION_INVALID_FORMAT:
        valid = false;
        errorText = 'Invalid format';
    }
  }
  return {valid, errorText};
};

const getLoginEmailTextFieldSelect = function getLoginEmailTextFieldSelect(emailTextField) {
  let valid = true;
  let errorText = '';
  if (!emailTextField.dirty) {
    valid = false;
    errorText = '';
  }
  else if (!emailTextField.value) {
    valid = false;
    errorText = 'Required';
  }
  else if (emailTextField.validationStatus) {
    switch (emailTextField.validationStatus) {
      case constants.VALIDATION_NO_CONFLICT:
        valid = false;
        errorText = 'No account found for ' + emailTextField.value;
        break;
      case constants.VALIDATION_INVALID_FORMAT:
        valid = false;
        errorText = 'Invalid format';
    }
  }
  return {valid, errorText};
};


const getPasswordTextFieldSelect = function getPasswordTextFieldSelect(passwordTextField) {
  let errorText = '';
  let valid = true;
  if (!passwordTextField.dirty) {
   valid = false;
  }
  else if (!passwordTextField.value) {
    errorText = 'Required';
    valid = 0;
  }
  else if (passwordTextField.value.length < 6) {
    errorText = '6 characters min';
    valid = 0;
  }
  return {errorText, valid};
};

const getPasswordConfirmationTextFieldSelect = function getPasswordConfirmationTextFieldSelect(passwordTextField, passwordConfirmationTextField) {
  let errorText = '';
  let valid = true;
  if (!passwordConfirmationTextField.dirty) {
   valid = false;
  }
   else if (!passwordConfirmationTextField.value) {
    errorText = 'Required';
    valid = 0;
  } else if (passwordTextField.value !== passwordConfirmationTextField.value) {
    errorText = 'Passwords do not match';
    valid = 0;
  }
  return {errorText, valid};
};

const getLoginButtonVisibility = function getLoginButtonVisibility(emailTextFieldSelect, passwordTextFieldSelect) {
  if (emailTextFieldSelect.valid === 1 && passwordTextFieldSelect.valid === 1) {
    return 'visible';
  }
  return 'disabled';
};

const getRegisterButtonVisibility = function getRegisterButtonVisibility(emailTextFieldSelect, passwordTextFieldSelect, passwordConfirmationTextFieldSelect) {
  if (emailTextFieldSelect.valid === 1 && passwordTextFieldSelect.valid === 1 && passwordConfirmationTextFieldSelect.valid === 1) {
    return 'visible';
  }
  return 'disabled';
};

export const getAuthenticationSelect = createSelector([
  getAuthentication,
], (authentication) => {
  const registrationEmailTextFieldSelect = getRegistrationEmailTextFieldSelect(authentication.emailTextField);
  const loginEmailTextFieldSelect = getLoginEmailTextFieldSelect(authentication.emailTextField);
  const passwordTextFieldSelect = getPasswordTextFieldSelect(authentication.passwordTextField);
  const passwordConfirmationTextFieldSelect = getPasswordConfirmationTextFieldSelect(authentication.passwordTextField, authentication.passwordConfirmationTextField);
  const loginButtonVisibility = getLoginButtonVisibility(loginEmailTextFieldSelect, passwordTextFieldSelect);
  const registerButtonVisibility = getRegisterButtonVisibility(registrationEmailTextFieldSelect, passwordTextFieldSelect, passwordConfirmationTextFieldSelect);
  return {
    registrationEmailTextFieldSelect,
    loginEmailTextFieldSelect,
    passwordTextFieldSelect,
    passwordConfirmationTextFieldSelect,
    loginButtonVisibility,
    registerButtonVisibility
  };
});
