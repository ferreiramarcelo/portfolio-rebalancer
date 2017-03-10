import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import classNames from 'classnames/bind';
import styles from 'css/containers/about';

const cx = classNames.bind(styles);

const Loading = () => {
  return (
    <div>
      <span>Verifying password reset token...</span>
      <CircularProgress size={100} thickness={6} />
    </div>
  );
};

export default Loading;
