import {combineReducers} from 'redux';
import * as types from '../types';

const investmentAmount = (state = {
    value: '0',
    setOnce: false
}, action) => {
    switch (action.type) {
        case types.INVESTMENT_AMOUNT_TEXT_FIELD_CHANGE:
            return {
                ...state,
                value: action.value,
                setOnce: true
            };
        default:
            return state;
    }
};

const investmentAmountReducer = combineReducers({investmentAmount});

export default investmentAmountReducer;
