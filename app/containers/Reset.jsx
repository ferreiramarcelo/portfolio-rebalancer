import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Card from 'material-ui/Card';
import FontAwesome from 'react-fontawesome';
import classNames from 'classnames/bind';
import { emailTextFieldChange, passwordTextFieldChange, passwordConfirmationTextFieldChange, toggleAuthenticationMode } from '../actions/authentications';
import { manualLogin, register, sendPasswordReset } from '../actions/users';
import EmailTextField from '../components/authentication/EmailTextField';
import PasswordTextField from '../components/authentication/PasswordTextField';
import { getAuthenticationSelect } from '../selectors/index';
import styles from '../css/containers/authentication';

const cx = classNames.bind( styles );

class Reset extends React.Component {
  constructor( props ) {
    super( props );
    this.handleOnPasswordReset = this.handleOnPasswordReset.bind( this );
  }

  handleOnPasswordReset( event ) {
    event.preventDefault();
    this.props.manualLogin();
  }

  render() {
    return (
    <div>
      <Card className={ cx( 'card' ) }>
        <form onSubmit={ this.handleOnLogin }>

        <span>Reset your password</span>
        <PasswordTextField
                           value={ this.props.authentication.passwordTextField.value }
                           errorText={ this.props.authenticationSelect.passwordTextFieldSelect.errorText }
                           onChange={ this.props.passwordTextFieldChange }
                           label="Password" />
        <PasswordTextField
                                       value={ this.props.authentication.passwordConfirmationTextField.value }
                                       errorText={ this.props.authenticationSelect.passwordConfirmationTextFieldSelect.errorText }
                                       onChange={ this.props.passwordConfirmationTextFieldChange }
                                       label="Confirm password" />
                                       <RaisedButton
                                                     disabled={ this.props.authenticationSelect.loginButtonVisibility === 'disabled' }
                                                     label="RESET"
                                                     fullWidth
                                                     primary
                                                     type="submit"
                                                     className={ cx( 'submit-button' ) } />
                                     </form>
      </Card>
    </div>
    );
  }
}

Reset.propTypes = {
  user: PropTypes.object.isRequired,
  authentication: PropTypes.object.isRequired,
  authenticationSelect: PropTypes.object.isRequired,
  manualLogin: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  sendPasswordReset: PropTypes.func.isRequired,
  emailTextFieldChange: PropTypes.func.isRequired,
  passwordTextFieldChange: PropTypes.func.isRequired,
  passwordConfirmationTextFieldChange: PropTypes.func.isRequired,
  toggleAuthenticationMode: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    user: state.user,
    authentication: state.authentication,
    authenticationSelect: getAuthenticationSelect( state )
  };
}

export default connect( mapStateToProps, {
  manualLogin,
  register,
  sendPasswordReset,
  emailTextFieldChange,
  passwordTextFieldChange,
  passwordConfirmationTextFieldChange,
  toggleAuthenticationMode
} )( Reset );
