import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { grey100, grey500, white, fullBlack, } from 'material-ui/styles/colors';
import {Tabs, Tab} from 'material-ui/Tabs';
import Navigation from '../containers/Navigation';
import Message from '../containers/Message';
import styles from '../css/main';

injectTapEventPlugin();
const cx = classNames.bind(styles);
const muiTheme = getMuiTheme({
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
});

const App = ({children}) => {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div className={cx('app')}>
        <Navigation tab={children.props.location.pathname}/>
        <Message />
        <div className={cx('app-children')}>
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
