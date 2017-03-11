import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import ActionDone from 'material-ui/svg-icons/action/done';
import classNames from 'classnames/bind';
import styles from '../../css/components/authentication/authentication-field';

const cx = classNames.bind(styles);

const PasswordTextField = ({passwordTextField, passwordTextFieldSelect, onChange, label}) => {
  const handleOnChange = function handleOnChange(event, newValue) {
    onChange(newValue);
  };

  const getIndicator = function getIndicator() {
    switch (passwordTextFieldSelect.valid) {
      case true:
        return <ActionDone className={cx('indicator')} />;
      default:
        return null;
    }
  };
  const indicator = getIndicator();

  return (
    <div className={cx('flex')}>
      <TextField
             value={passwordTextField.value}
             errorText={passwordTextFieldSelect.errorText}
             onChange={handleOnChange}
             floatingLabelText={label}
             type="password"
             fullWidth
             errorStyle={{ float: 'left' }} />
      { indicator }
    </div>
  );
};

PasswordTextField.propTypes = {
  passwordTextField: PropTypes.object.isRequired,
  passwordTextFieldSelect: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default PasswordTextField;
