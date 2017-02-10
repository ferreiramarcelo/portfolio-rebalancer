import { createSelector } from 'reselect';

const getAuthentication = (state) => state.authentication;

function validateEmailAddress(emailAddress) {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(emailAddress);
}

const getEmailTextFieldSelect = (emailTextField) => {
  let errorText = '';
  let valid = 1;
  let hintText = '';
  if (emailTextField.setOnce === 0) {
   valid = 0;
   hintText = 'Email';
  }
  else if (!emailTextField.value) {
    errorText = 'Required';
    valid = 0;
  }
  else if (!validateEmailAddress(emailTextField.value)) {
    errorText = 'Invalid email address';
    valid = 0;
  }
  return {errorText, valid, hintText};
}

const getPasswordTextFieldSelect = (passwordTextField) => {
  let errorText = '';
  let valid = 1;
  let hintText = '';
  if (passwordTextField.setOnce === 0) {
   valid = 0;
   hintText = 'Password';
  }
  else if (!passwordTextField.value) {
    errorText = 'Required';
    valid = 0;
  }
  return {errorText, valid, hintText};
}

const getLoginButtonVisibility = (emailTextFieldSelect, passwordTextFieldSelect) => {
  if (emailTextFieldSelect.valid === 1 && passwordTextFieldSelect.valid === 1) {
    return 'visible';
  }
  return 'disabled';
}

export const getAuthenticationSelect = createSelector( [
  getAuthentication,
], (authentication) => {
  let emailTextFieldSelect = getEmailTextFieldSelect( authentication.emailTextField );
  let passwordTextFieldSelect = getPasswordTextFieldSelect( authentication.passwordTextField );
  let loginButtonVisibility = getLoginButtonVisibility( emailTextFieldSelect, passwordTextFieldSelect );
  return {
    emailTextFieldSelect,
    passwordTextFieldSelect,
    loginButtonVisibility
  };
} );
