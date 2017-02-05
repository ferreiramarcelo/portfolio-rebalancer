import React, { Component, PropTypes } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import { blue500, red500, greenA200 } from 'material-ui/styles/colors';

import classNames from 'classnames/bind';
import styles from '../css/components/portfolio-table/price-cell';
const cx = classNames.bind( styles );
import IconButton from 'material-ui/IconButton';
import ActionDone from 'material-ui/svg-icons/action/done';
import AlertErrorOutline from 'material-ui/svg-icons/alert/error-outline';
import ReactTooltip from 'react-tooltip'

const PriceProgress = ({price}) => {

  const getProgress = (price) => {
    if ( price.fetch === 'NONE' ) {
      return null;
    } else if ( price.fetch === 'IN_PROGRESS' ) {
      return <CircularProgress
                               className={ cx( 'PriceProgress' ) }
                               size={ 20 }
                               thickness={ 3 }
                               style={ { width: 'auto', } } />;
    } else if ( price.fetch === 'DONE' ) {
      return <IconButton>
               <ActionDone />
             </IconButton>
    } else if ( price.fetch === 'FAILED' ) {
      return <div>
               <IconButton
                           data-tip
                           data-for='tooltipPriceFetchError'>
                 <AlertErrorOutline />
               </IconButton>
               <ReactTooltip
                             id='tooltipPriceFetchError'
                             type='error'>
                             <p>No valid price returned from https://finance.yahoo.com.</p>
                             <p>Make sure you account for differing symbols based on exchange.</p>
               </ReactTooltip>
             </div>;
    }
    return null;
  }

  const progress = getProgress( price );

  return (
  <div>
    { progress }
  </div>
  );
};

PriceProgress.propTypes = {
  price: PropTypes.object.isRequired,
};

export default PriceProgress;
