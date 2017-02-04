import React, { Component, PropTypes } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import { blue500, red500, greenA200 } from 'material-ui/styles/colors';

const PriceProgress = ({price}) => {
	
  const getProgress = (price) => {
    if ( price.fetch === 'IN_PROGRESS' ) {
      return <CircularProgress
                               size={ 20 }
                               thickness={ 3 }
                               style={ { width: 'auto', } } />;
    } else if ( price.fetch === 'DONE' ) {
      return <CircularProgress
                               mode={ 'determinate' }
                               value={ 100 }
                               size={ 20 }
                               thickness={ 3 }
                               style={ { width: 'auto', } } />;
    } else if ( price.fetch === 'FAILED' ) {
      return <CircularProgress
                               mode={ 'determinate' }
                               value={ 100 }
                               color={ red500 }
                               size={ 20 }
                               thickness={ 3 }
                               style={ { width: 'auto', } } />;
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
