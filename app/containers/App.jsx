import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import Navigation from '../containers/Navigation';
import styles from '../css/main';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const cx = classNames.bind( styles );

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { cyan500, cyan700, grey400, pinkA200, grey100, grey500, darkBlack, white, grey300, fullBlack, fade } from 'material-ui/styles/colors';

const muiTheme = getMuiTheme( {
  fontFamily: 'Roboto, sans-serif',
  zIndex: {
  },
  palette: {
    primary1Color: '#673AB7',
    primary2Color: '#512DA8',
    primary3Color: '#D1C4E9',
    accent1Color: '#FFC107',
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: '#212121',
    alternateTextColor: '#FFFFFF',
    canvasColor: white,
    borderColor: '#BDBDBD',
    pickerHeaderColor: '#673AB7',
    shadowColor: fullBlack,
  },
}, {
  avatar: {
    borderColor: null,
  },
} );

const App = ({children}) => {
  return (
  <MuiThemeProvider muiTheme={ muiTheme }>
    <div className={ cx( 'app' ) }>
      <Navigation />
      <div className={ cx( 'appChildren' ) }>
        { children }
      </div>
    </div>
  </MuiThemeProvider>
  );
};

App.propTypes = {
  children: PropTypes.object
};

export default App;
