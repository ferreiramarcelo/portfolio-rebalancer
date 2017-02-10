import { createSelector } from 'reselect';

const getAuthentication = (state) => state.authentication;

function validateEmailAddress(emailAddress) {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(emailAddress);
}

const getEmailTextFieldSelect = (emailTextField) => {
  let errorText = '';
  let valid = 1;
  if (emailTextField.setOnce === 0) {
   valid = 0;
  }
  else if (!emailTextField.value) {
    errorText = 'Required';
    valid = 0;
  }
  else if (!validateEmailAddress(emailTextField.value)) {
    errorText = 'Invalid email address';
    valid = 0;
  }
  return {errorText, valid};
}

const getPasswordTextFieldSelect = (passwordTextField) => {
  let errorText = '';
  let valid = 1;
  if (passwordTextField.setOnce === 0) {
   valid = 0;
  }
  else if (!passwordTextField.value) {
    errorText = 'Required';
    valid = 0;
  }
  return {errorText, valid};
}

const getPasswordConfirmationTextFieldSelect = (passwordTextField, passwordConfirmationTextField) => {
  let errorText = '';
  let valid = 1;
  if (passwordConfirmationTextField.setOnce === 0) {
   valid = 0;
  }
  else if (!passwordConfirmationTextField.value) {
    errorText = 'Required';
    valid = 0;
  }
  else if (passwordTextField.value !== passwordConfirmationTextField.value) {
    errorText = 'Passwords do not match';
    valid = 0;
  }
  return {errorText, valid};
}

const getLoginButtonVisibility = (emailTextFieldSelect, passwordTextFieldSelect) => {
  if (emailTextFieldSelect.valid === 1 && passwordTextFieldSelect.valid === 1) {
    return 'visible';
  }
  return 'disabled';
}

const getRegisterButtonVisibility = (emailTextFieldSelect, passwordTextFieldSelect, passwordConfirmationTextFieldSelect) => {
  if (emailTextFieldSelect.valid === 1 && passwordTextFieldSelect.valid === 1 && passwordConfirmationTextFieldSelect.valid === 1) {
    return 'visible';
  }
  return 'disabled';
}

export const getAuthenticationSelect = createSelector( [
  getAuthentication,
], (authentication) => {
  let emailTextFieldSelect = getEmailTextFieldSelect( authentication.emailTextField );
  let passwordTextFieldSelect = getPasswordTextFieldSelect( authentication.passwordTextField );
  let passwordConfirmationTextFieldSelect = getPasswordConfirmationTextFieldSelect( authentication.passwordTextField, authentication.passwordConfirmationTextField );
  let loginButtonVisibility = getLoginButtonVisibility( emailTextFieldSelect, passwordTextFieldSelect );
  let registerButtonVisibility = getRegisterButtonVisibility( emailTextFieldSelect, passwordTextFieldSelect, passwordConfirmationTextFieldSelect );
  return {
    emailTextFieldSelect,
    passwordTextFieldSelect,
    passwordConfirmationTextFieldSelect,
    loginButtonVisibility,
    registerButtonVisibility
  };
} );
