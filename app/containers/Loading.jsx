import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const Loading = () => {
  return (
    <div>
      <span>Verifying password reset token...</span>
      <CircularProgress size={100} thickness={6} />
    </div>
    );
};

export default Loading;
