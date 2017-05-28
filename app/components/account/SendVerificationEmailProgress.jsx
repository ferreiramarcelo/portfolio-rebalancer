import React, { PropTypes } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import IconButton from 'material-ui/IconButton';
import ActionDone from 'material-ui/svg-icons/action/done';
import AlertErrorOutline from 'material-ui/svg-icons/alert/error-outline';
import ReactTooltip from 'react-tooltip';
import classNames from 'classnames/bind';
import * as constants from '../../constants';
import styles from '../../css/components/account/send-verification-email-progress';

const cx = classNames.bind(styles);

const SendVerificationEmailProgress = ({fetchStatus}) => {
  const getProgress = function getProgress(givenFetchStatus) {
    switch (givenFetchStatus) {
      case constants.IS_FETCHING:
        return (<CircularProgress size={20} thickness={3} className={cx('send-verification-email-progress')} />);
      case constants.FETCH_SUCCEEDED:
        return (
          <ActionDone />
          );
      case constants.FETCH_FAILED:
        return (<div>
          <IconButton data-tip data-for="tooltipPriceFetchError">
            <AlertErrorOutline />
          </IconButton>
          <ReactTooltip id="tooltipPriceFetchError" type="error">
            <span>Failed to send the verification email. Please try again later.</span>
          </ReactTooltip>
        </div>);
      case constants.FETCH_FAILED_NOT_FOUND:
        return (<div>
          <IconButton data-tip data-for="tooltipPriceFetchError">
            <AlertErrorOutline />
          </IconButton>
          <ReactTooltip id="tooltipPriceFetchError" type="error">
            <span>Failed to send the verification email because the account could not be found. Please try again later.</span>
          </ReactTooltip>
        </div>);
      default:
        return null;
    }
  };

  const progress = getProgress(fetchStatus);

  return (
    <div>
      { progress }
    </div>
    );
};

SendVerificationEmailProgress.propTypes = {
  fetchStatus: PropTypes.string.isRequired,
};

export default SendVerificationEmailProgress;
