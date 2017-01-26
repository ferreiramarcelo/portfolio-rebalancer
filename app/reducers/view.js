import { combineReducers } from 'redux';
import * as types from '../types';

const view = (
  state = {displayTable: false, displaySteps: false},
  action
) => {
  switch (action.type) {
    case types.SELECT_MODEL_PORTFOLIO:
        return { ...state, displayTable: true };
    case types.CREATE_NEW_PORTFOLIO:
      return { ...state, displayTable: true };
    default:
      return state;
  }
};

const topicReducer = combineReducers({
  view
});

export default topicReducer;
