import React, { PropTypes } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import IconButton from 'material-ui/IconButton';
import ActionDone from 'material-ui/svg-icons/action/done';
import AlertErrorOutline from 'material-ui/svg-icons/alert/error-outline';
import ReactTooltip from 'react-tooltip';
import classNames from 'classnames/bind';
import styles from '../../../css/components/portfolio-table/price-cell';

const cx = classNames.bind(styles);

const PriceProgress = ({fetchStatus}) => {
  const getProgress = (givenFetchStatus) => {
    if (givenFetchStatus === 'NONE') {
      return null;
    } else if (givenFetchStatus === 'IN_PROGRESS') {
      return (<CircularProgress
                               className={cx('PriceProgressSpinner')}
                               size={20}
                               thickness={3}
                               style={{ width: 'auto', }} />);
    } else if (givenFetchStatus === 'DONE') {
      return (<IconButton className={cx('PriceProgressIcon')}>
        <ActionDone />
      </IconButton>);
    } else if (givenFetchStatus === 'FAILED') {
      return (<div>
        <IconButton
                           className={cx('PriceProgressIcon')}
                           data-tip
                           data-for="tooltipPriceFetchError">
          <AlertErrorOutline />
        </IconButton>
        <ReactTooltip
                             id="tooltipPriceFetchError"
                             type="error">
          <p>
                   No valid price returned from https://finance.yahoo.com.
                 </p>
          <p>
                   Make sure you account for differing symbols based on exchange.
                 </p>
        </ReactTooltip>
      </div>);
    }
    return null;
  };

  const progress = getProgress(fetchStatus);

  return (
    <div className={cx('PriceProgressContainer')}>
      { progress }
    </div>
  );
};

PriceProgress.propTypes = {
  fetchStatus: PropTypes.string.isRequired,
};

export default PriceProgress;
