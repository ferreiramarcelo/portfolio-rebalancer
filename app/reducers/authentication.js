import {combineReducers} from 'redux';
import * as types from '../types';

const emailTextField = (state = {value: '', setOnce: 0}, action) => {
    switch (action.type) {
        case types.EMAIL_TEXT_FIELD_CHANGE:
            return {value: action.value, setOnce: 1};
        default:
            return state;
    }
};

const passwordTextField = (state = {value: '', setOnce: 0}, action) => {
    switch (action.type) {
        case types.PASSWORD_TEXT_FIELD_CHANGE:
            return {value: action.value, setOnce: 1};
        default:
            return state;
    }
};

const topicReducer = combineReducers({emailTextField, passwordTextField});

export default topicReducer;
