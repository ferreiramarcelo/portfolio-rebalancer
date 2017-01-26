import { combineReducers } from 'redux';
import * as types from '../types';

const topic = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.CREATE_TOPIC_REQUEST:
      return {
        id: action.id,
        count: action.count,
        text: action.text
      };
    case types.INCREMENT_COUNT:
      if (state.id === action.id) {
        return { ...state, count: state.count + 1 };
      }
      return state;
    case types.DECREMENT_COUNT:
      if (state.id === action.id) {
        return { ...state, count: state.count - 1 };
      }
      return state;
    default:
      return state;
  }
};

const topics = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.REQUEST_SUCCESS:
      if (action.data) return action.data;
      return state;
    case types.CREATE_TOPIC_REQUEST:
      return [...state, topic(undefined, action)];
    case types.CREATE_TOPIC_FAILURE:
      return state.filter(t => t.id !== action.id);
    case types.DESTROY_TOPIC:
      return state.filter(t => t.id !== action.id);
    case types.INCREMENT_COUNT:
    case types.DECREMENT_COUNT:
      return state.map(t => topic(t, action));
    default:
      return state;
  }
};

const newTopic = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.TYPING:
      return action.newTopic;
    case types.CREATE_TOPIC_REQUEST:
      return '';
    default:
      return state;
  }
};

const portfolio = (
  state = [],
  action
) => {
  switch (action.type) {
      case types.SELECT_MODEL_PORTFOLIO:
          var newPortfolio = [];
          for (var i = 0; i < action.selectedModelPortfolio.securities.length; i++) {
              action.security = action.selectedModelPortfolio.securities[i];
              action.index = i;
              newPortfolio.push(security(undefined, action));
          }
          return newPortfolio;
      case types.CREATE_NEW_PORTFOLIO:
          var newPortfolio = [];
          newPortfolio.push(security(undefined, action));
          return newPortfolio;
      case types.ADD_SECURITY:
          action.index = state.length;
          return [...state, security(undefined, action)];
      case types.REMOVE_SECURITY:
          var newPortfolio = state.filter(s => s.index !== action.index);
          for (var i = action.index; i < newPortfolio.length; i++) {
              newPortfolio[i].index--;
          }
          return newPortfolio;
      case types.TICKER_TYPING:
	  case types.SECURITY_TEXT_FIELD_CHANGE:
	  case types.SECURITY_TEXT_FIELD_VALID:
      case types.SECURITY_TEXT_FIELD_ERROR:
        return state.map(s => security(s, action));
    default:
      return state;
  }
};

const security = (
  state = {},
  action
) => {
    switch (action.type) {
        case types.SELECT_MODEL_PORTFOLIO:
            return {index: action.index,
					ticker: ticker(undefined, action),
					allocation: allocation(undefined, action),
					price: price(undefined, action),
					units: units(undefined, action)};
        case types.CREATE_NEW_PORTFOLIO:
            return {index: action.index,
                ticker: ticker(undefined, action),
                allocation: allocation(undefined, action),
                price: price(undefined, action),
                units: units(undefined, action)};
        case types.ADD_SECURITY:
            return {index: action.index,
                ticker: ticker(undefined, action),
                allocation: allocation(undefined, action),
                price: price(undefined, action),
                units: units(undefined, action)};
        case types.TICKER_TYPING:
		case types.SECURITY_TEXT_FIELD_CHANGE:
		case types.SECURITY_TEXT_FIELD_VALID:
		case types.SECURITY_TEXT_FIELD_ERROR:
            if (state.index === action.index) {
                switch (action.column) {
                    case 'ticker':
						return { ...state, ticker: ticker(state.ticker, action) };
                    case 'allocation':
						return { ...state, allocation: allocation(state.allocation, action) };
                    case 'price':
						return { ...state, price: price(state.price, action) };
                    case 'units':
						return { ...state, units: units(state.units, action) };
                    default:
                        return state;
                }
         }
        default:
            return state;
    }
};

const ticker = (
  state = {},
  action
) => {
    switch (action.type) {
        case types.SELECT_MODEL_PORTFOLIO:
            return {value: action.security.ticker}
        case types.CREATE_NEW_PORTFOLIO:
            return {value: ''}
        case types.ADD_SECURITY:
            return {value: ''}
        case types.SECURITY_TEXT_FIELD_CHANGE:
			return { ...state, value: action.value };
        default:
            return state;
    }
};

const allocation = (
  state = {},
  action
) => {
    switch (action.type) {
        case types.SELECT_MODEL_PORTFOLIO:
            return {number: Number(action.security.allocation), value: action.security.allocation.toString(), valid: 1, errorText: ''}
        case types.CREATE_NEW_PORTFOLIO:
            return {number: 0, value: '', valid: 1, errorText: ''}
        case types.ADD_SECURITY:
            return {number: 0, value: '', valid: 1, errorText: ''}
        case types.SECURITY_TEXT_FIELD_CHANGE:
			return { ...state, number: Number(action.value), value: action.value };
		case types.SECURITY_TEXT_FIELD_VALID:
			return { ...state, valid: 1 };
        case types.SECURITY_TEXT_FIELD_ERROR:
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
				  case 'min':
						errorText = 'Min 0';
						break;
				  case 'max':
						errorText = 'Max 100';
						break;
			  }
			  return { ...state, valid: 0, errorText: errorText };
        default:
            return state;
    }
};

const price = (
  state = {},
  action
) => {
    switch (action.type) {
        case types.SELECT_MODEL_PORTFOLIO:
			var value;
			if (action.security.price) {
				value = action.security.price;
			}
			else
				value = '0';
			return {number: Number(value), value: value, valid: 1, errorText: ''}
        case types.CREATE_NEW_PORTFOLIO:
            return {value: '', valid: 1, errorText: ''}
        case types.ADD_SECURITY:
            return {value: '', valid: 1, errorText: ''}
        case types.SECURITY_TEXT_FIELD_CHANGE:
            return { ...state, number: Number(action.value), value: action.value };
		case types.SECURITY_TEXT_FIELD_VALID:
			return { ...state, valid: 1 };
        case types.SECURITY_TEXT_FIELD_ERROR:
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
				  case 'min':
					errorText = 'Min 0.01';
					break;
				  }
			  return { ...state, valid: 0, errorText: errorText };
        default:
            return state;
    }
};

const units = (
  state = {},
  action
) => {
    switch (action.type) {
        case types.SELECT_MODEL_PORTFOLIO:
			var value;
			if (action.security.units) {
				value = action.security.units;
			}
			else
				value = '0';
			return {number: Number(value), value: value, valid: 1, errorText: ''}
        case types.CREATE_NEW_PORTFOLIO:
            return {value: '', valid: 1, errorText: ''}
        case types.ADD_SECURITY:
            return {value: '', valid: 1, errorText: ''}
        case types.SECURITY_TEXT_FIELD_CHANGE:
			return { ...state, number: Number(action.value), value: action.value };
		case types.SECURITY_TEXT_FIELD_VALID:
			return { ...state, valid: 1 };
        case types.SECURITY_TEXT_FIELD_ERROR:
			let errorText = '';
			switch (action.error) {
				  case 'required':
					errorText = 'Required';
					break;
				  case 'invalidSymbol':
					errorText = 'NMust be number';
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
				  case 'min':
					errorText = 'Min 0';
					break;
				  }
			  return { ...state, valid: 0, errorText: errorText };
        default:
            return state;
    }
};

const topicReducer = combineReducers({
  topics,
  newTopic,
    portfolio
});

export default topicReducer;
