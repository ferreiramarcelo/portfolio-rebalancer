import {combineReducers} from 'redux';
import * as types from '../types';

const investmentAmount = (state = {
    value: '0',
    dirty: false
}, action) => {
    switch (action.type) {
        case types.INVESTMENT_AMOUNT_TEXT_FIELD_CHANGE:
            return {
                ...state,
                value: action.value,
                dirty: true
            };
        default:
            return state;
    }
};

const investmentAmountReducer = combineReducers({investmentAmount});

export default investmentAmountReducer;
