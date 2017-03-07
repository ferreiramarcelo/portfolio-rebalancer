import { polyfill } from 'es6-promise';
import request from 'axios';
import { push } from 'react-router-redux';

import * as types from '../types';


export function changeTab() {
  return {
    type: types.CHANGE_TAB
  };
}
