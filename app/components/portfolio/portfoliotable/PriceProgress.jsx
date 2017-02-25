import React, { PropTypes } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import IconButton from 'material-ui/IconButton';
import ActionDone from 'material-ui/svg-icons/action/done';
import AlertErrorOutline from 'material-ui/svg-icons/alert/error-outline';
import ReactTooltip from 'react-tooltip';
import classNames from 'classnames/bind';
import styles from '../../../css/components/portfolio/portfolio-table/price-cell';

const cx = classNames.bind( styles );

const PriceProgress = ({index, fetchStatus, onClick}) => {
  const handleOnClick = function handleOnClick() {
    onClick( index );
  };

  const getProgress = function getProgress( givenFetchStatus ) {
    if ( givenFetchStatus === 'NONE' ) {
      return null;
    } else if ( givenFetchStatus === 'IN_PROGRESS' ) {
      return (<CircularProgress
                                onClick={ handleOnClick }
                                size={ 20 }
                                thickness={ 3 }
                                className={ cx( 'price-progress-spinner' ) } />);
    } else if ( givenFetchStatus === 'DONE' ) {
      return (<IconButton
                          onClick={ handleOnClick }
                          className={ cx( 'price-progress-icon' ) }>
                <ActionDone />
              </IconButton>);
    } else if ( givenFetchStatus === 'FAILED' ) {
      return (<div>
                <IconButton
                            onClick={ handleOnClick }
                            data-tip
                            data-for="tooltipPriceFetchError"
                            className={ cx( 'price-progress-icon' ) }>
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

  const progress = getProgress( fetchStatus );

  return (
  <div className={ cx( 'price-progress-container' ) }>
    { progress }
  </div>
  );
};

PriceProgress.propTypes = {
  index: PropTypes.number.isRequired,
  fetchStatus: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PriceProgress;
