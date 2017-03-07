import React, { PropTypes } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import IconButton from 'material-ui/IconButton';
import ActionDone from 'material-ui/svg-icons/action/done';
import AlertErrorOutline from 'material-ui/svg-icons/alert/error-outline';
import ReactTooltip from 'react-tooltip';
import classNames from 'classnames/bind';
import * as constants from '../../constants';

const sendVerificationEmailProgress = ({fetchStatus}) => {

  const getProgress = function getProgress( givenFetchStatus ) {
    switch (givenFetchStatus) {
      case constants.IS_FETCHING:
        return (<CircularProgress
                                  size={ 20 }
                                  thickness={ 3 } />);
      case constants.FETCH_SUCCEEDED:
        return (<IconButton>
                  <ActionDone />
                </IconButton>);
      case constants.FETCH_FAILED:
        return (<div>
                  <IconButton
                              data-tip
                              data-for="tooltipPriceFetchError">
                    <AlertErrorOutline />
                  </IconButton>
                  <ReactTooltip
                                id="tooltipPriceFetchError"
                                type="error">
                    <span>Failed to send the verification email. Please try again later.</span>
                  </ReactTooltip>
                </div>);
      case constants.FETCH_FAILED_NOT_FOUND:
        return (<div>
                  <IconButton
                              data-tip
                              data-for="tooltipPriceFetchError">
                    <AlertErrorOutline />
                  </IconButton>
                  <ReactTooltip
                                id="tooltipPriceFetchError"
                                type="error">
                    <span>Failed to send the verification email because the account could not be found. Please try again later.</span>
                  </ReactTooltip>
                </div>);
      default:
        return null;
    }
  };

  const progress = getProgress( fetchStatus );

  return (
  <div>
    { progress }
  </div>
  );
};

sendVerificationEmailProgress.propTypes = {
  fetchStatus: PropTypes.string.isRequired,
};

export default sendVerificationEmailProgress;
