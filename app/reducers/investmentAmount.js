import {combineReducers} from 'redux';
import * as types from '../types';

const investmentAmount = (state = {
    value: '0',
    valsetOnce: false
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

const oldinvestmentAmount = (state = {
    value: '0',
    errorText: '',
    valid: 1,
    number: 0
}, action) => {
    switch (action.type) {
        case types.INVESTMENT_AMOUNT_TEXT_FIELD_CHANGE:
            var errorText = '';
            var valid = 1;
            var number = Number(action.value);
            if (action.value === '') {
                errorText = 'Required';
                valid = 0;
            } else if (typeof number !== 'number' || isNaN(number) || !isFinite(number)) {
                errorText = 'Number required';
                valid = 0;
            }
            return {
                ...state,
                value: action.value,
                errorText,
                valid,
                number
            };
        default:
            return state;
    }
};

const modelPortfolioReducer = combineReducers({investmentAmount});

export default modelPortfolioReducer;
