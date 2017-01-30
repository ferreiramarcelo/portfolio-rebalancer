import { combineReducers } from 'redux';
import * as types from '../types';

const investmentAmount = (
  state = {number: 0, value: '0', valid: 1, errorText: ''},
  action
) => {
    switch (action.type) {
        case types.INVESTMENT_AMOUNT_TEXT_FIELD_CHANGE:
            return { ...state, number: Number(action.value), value: action.value };
        case types.INVESTMENT_AMOUNT_TEXT_FIELD_VALID:
            return { ...state, valid:  1 };
        case types.INVESTMENT_AMOUNT_TEXT_FIELD_ERROR:
            let errorText = '';
            switch (action.error) {
                case 'required':
                    errorText = 'Required';
                    break;
                case 'invalidSymbol':
                    errorText = 'Must be number';
                    break;
                case 'incompleteNumber':
                    errorText = 'Incomplete number';
                    break;
                case 'singleMinus':
                    errorText = 'Minus sign already present';
                    break;
                case 'singleFloatingPoint':
                    errorText = 'Floating point already present';
                    break;
                case 'singleZero':
                    errorText = 'Floating point expected';
                    break;
            }
            return { ...state, valid: 0, errorText: errorText };
        default:
            return state;
    }
};

const topicReducer = combineReducers({
    investmentAmount
});

export default topicReducer;
