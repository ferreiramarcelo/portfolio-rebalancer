import {combineReducers} from 'redux';
import * as types from '../types';

const topic = (state = {}, action) => {
    switch (action.type) {
        case types.CREATE_MODEL_PORTFOLIO_REQUEST:
            return {id: action.id, name: action.name, email: action.email, securities: action.securities};
        case types.SAVE_MODEL_PORTFOLIO_REQUEST:
            if (state.id === action.id) {
                return {id: action.id, name: action.name, email: action.email, securities: action.securities};
            }
            /*case types.SAVE_MODEL_PORTFOLIO_FAILURE:
            return state.filter(t => t.id !== action.id); */
        case types.INCREMENT_COUNT:
            if (state.id === action.id) {
                return {
                    ...state,
                    count: state.count + 1
                };
            }
            return state;
        case types.DECREMENT_COUNT:
            if (state.id === action.id) {
                return {
                    ...state,
                    count: state.count - 1
                };
            }
            return state;
        default:
            return state;
    }
};

const topics = (state = [], action) => {
    switch (action.type) {
        case types.REQUEST_SUCCESS:
            if (action.data)
                return action.data;
            return state;
        case types.CREATE_MODEL_PORTFOLIO_REQUEST:
            return [
                ...state,
                topic(undefined, action)
            ];
        case types.CREATE_MODEL_PORTFOLIO_FAILURE:
            return state.filter(t => t.id !== action.id);
        case types.SAVE_MODEL_PORTFOLIO_REQUEST:
            return state.map(t => topic(t, action));
        case types.SAVE_MODEL_PORTFOLIO_FAILURE:
            return state.filter(t => t.id !== action.id);
        case types.DESTROY_TOPIC:
            return state.filter(t => t.id !== action.id);
        case types.DELETE_MODEL_PORTFOLIO_REQUEST:
            return state.filter(t => t.id !== action.id);
        case types.INCREMENT_COUNT:
        case types.DECREMENT_COUNT:
            return state.map(t => topic(t, action));
        default:
            return state;
    }
};

const newTopic = (state = '', action) => {
    switch (action.type) {
        case types.TYPING:
            return action.newTopic;
        case types.CREATE_TOPIC_REQUEST:
            return '';
        default:
            return state;
    }
};

const selectedModelPortfolio = (state = {}, action) => {
    switch (action.type) {
        case types.SELECT_MODEL_PORTFOLIO:
            return {
                id: action.selectedModelPortfolio.id,
                name: action.selectedModelPortfolio.name,
                email: action.selectedModelPortfolio.email,
                securities: action.selectedModelPortfolio.securities,
                errorText: '',
                valid: 1
            };
        case types.CREATE_MODEL_PORTFOLIO_REQUEST:
        case types.SAVE_MODEL_PORTFOLIO_REQUEST:
            return { ...state, id: action.id, name: action.name, email: action.email, securities: action.securities};
        case types.MODEL_PORTFOLIO_NAME_TEXT_FIELD_CHANGE:
          var errorText = '';
          var valid = 1;
          if (action.value === '') {
            errorText ='Required'
            valid = 0;
          }
          else if (action.modelPortfolios.filter(mP => (mP.name === action.value && mP.id !== state.id) && mP.email === action.email).length > 0) {
            errorText ='Name already in use';
            valid = 0;
          }
            return {
                ...state,
                name: action.value,
                errorText: errorText,
                valid: valid
            };
        case types.CREATE_NEW_PORTFOLIO:
        case types.DELETE_MODEL_PORTFOLIO_REQUEST:
        let numModelPortfoliosWithDefaultName = 0;
        for (let i = 0; i < action.modelPortfolios.length; i++) {
          if (action.modelPortfolios[i].email === action.email){
            if (numModelPortfoliosWithDefaultName === 0) {
              if (action.modelPortfolios[i].name === 'Model Portfolio Name') {
                numModelPortfoliosWithDefaultName += 2;
              }
            }
            else if (action.modelPortfolios[i].name === 'Model Portfolio Name ' + numModelPortfoliosWithDefaultName) {
              numModelPortfoliosWithDefaultName++;
            }
          }
        }
        let newModelPortfolioName = 'Model Portfolio Name';
        if (numModelPortfoliosWithDefaultName > 0) {
          newModelPortfolioName += ' ' + numModelPortfoliosWithDefaultName;
        }
            return {
                id: '',
                name: newModelPortfolioName,
                email: '',
                securities: [],
                errorText: '',
                valid: 1
            };
        default:
            return state;
    }
};

const portfolio = (state = [], action) => {
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
        case types.DELETE_MODEL_PORTFOLIO_REQUEST:
            var newPortfolio = [];
            newPortfolio.push(security(undefined, action));
            return newPortfolio;
        case types.ADD_SECURITY:
            action.index = state.length;
            return [
                ...state,
                security(undefined, action)
            ];
        case types.REMOVE_SECURITY:
            var newPortfolio = state.filter(s => s.index !== action.index);
            for (var i = action.index; i < newPortfolio.length; i++) {
                newPortfolio[i].index--;
            }
            return newPortfolio;
        case types.SECURITY_TEXT_FIELD_CHANGE:
        case types.SET_PRICE_TO_FETCHING:
        case types.SET_PRICE_TO_NOT_FETCHING:
        case types.SET_PRICE_FROM_FETCH:
        case types.SET_PRICE_TO_FETCH_FAILED:
            return state.map(s => security(s, action));
        default:
            return state;
    }
};

const security = (state = {}, action) => {
    switch (action.type) {
        case types.SELECT_MODEL_PORTFOLIO:
            return {
                index: action.index,
                ticker: ticker(undefined, action),
                allocation: allocation(undefined, action),
                price: price(undefined, action),
                units: units(undefined, action)
            };
        case types.CREATE_NEW_PORTFOLIO:
        case types.DELETE_MODEL_PORTFOLIO_REQUEST:
            return {
                index: 0,
                ticker: ticker(undefined, action),
                allocation: allocation(undefined, action),
                price: price(undefined, action),
                units: units(undefined, action)
            };
        case types.ADD_SECURITY:
            return {
                index: action.index,
                ticker: ticker(undefined, action),
                allocation: allocation(undefined, action),
                price: price(undefined, action),
                units: units(undefined, action)
            };
        case types.SECURITY_TEXT_FIELD_CHANGE:
            if (state.index === action.index) {
                switch (action.column) {
                    case 'ticker':
                        return {
                            ...state,
                            ticker: ticker(state.ticker, action)
                        };
                    case 'allocation':
                        return {
                            ...state,
                            allocation: allocation(state.allocation, action)
                        };
                    case 'price':
                        return {
                            ...state,
                            price: price(state.price, action)
                        };
                    case 'units':
                        return {
                            ...state,
                            units: units(state.units, action)
                        };
                    default:
                        return state;
                }
            }
        case types.SET_PRICE_TO_FETCHING:
        case types.SET_PRICE_TO_NOT_FETCHING:
        case types.SET_PRICE_FROM_FETCH:
        case types.SET_PRICE_TO_FETCH_FAILED:
          if (state.index === action.index) {
            return {
                ...state,
                price: price(state.price, action)
            };
          }
        default:
            return state;
    }
};

const ticker = (state = {}, action) => {
    switch (action.type) {
        case types.SELECT_MODEL_PORTFOLIO:
            return {valid: 1, value: action.security.ticker}
        case types.CREATE_NEW_PORTFOLIO:
        case types.DELETE_MODEL_PORTFOLIO_REQUEST:
            return {valid: 0, value: ''}
        case types.ADD_SECURITY:
            return {valid: 0, value: ''}
        case types.SECURITY_TEXT_FIELD_CHANGE:
            var valid = 0;
            if (action.value) {
                valid = 1;
            }
            return {
                ...state,
                valid: valid,
                value: action.value
            };
        default:
            return state;
    }
};

const allocation = (state = {}, action) => {
    switch (action.type) {
        case types.SELECT_MODEL_PORTFOLIO:
            return {
                number: Number(action.security.allocation),
                value: action.security.allocation.toString(),
                valid: 1,
                errorText: '',
            }
        case types.CREATE_NEW_PORTFOLIO:
        case types.DELETE_MODEL_PORTFOLIO_REQUEST:
        case types.ADD_SECURITY:
            return {value: '', valid: 0, errorText: 'Required'}
        case types.SECURITY_TEXT_FIELD_CHANGE:
            var errorText = '';
            var valid = 1;
            var number = Number(action.value);
            if (action.value === '') {
              errorText = 'Required';
              valid = 0;
            }
            else if (typeof number != 'number' || isNaN(number) || !isFinite(number)) {
              errorText = 'Number required';
              valid = 0;
            }
            else if (number < 0) {
              errorText = '0 minimum';
              valid = 0;
            }
            else if (number > 100) {
              errorText = '100 maximum';
              valid = 0;
            }
            return {
                ...state,
                value: action.value,
                errorText: errorText,
                valid: valid,
                number: number
            };
        default:
            return state;
    }
};

const price = (state = {}, action) => {
    switch (action.type) {
        case types.SELECT_MODEL_PORTFOLIO:
            var value;
            if (action.security.price) {
                value = action.security.price;
            } else
                value = '0.01';
            return {number: Number(value), value: value, valid: 1, errorText: ''}
        case types.CREATE_NEW_PORTFOLIO:
        case types.DELETE_MODEL_PORTFOLIO_REQUEST:
        case types.ADD_SECURITY:
            return {value: '', valid: 0, errorText: 'Required', fetch: 'NONE'}
        case types.SECURITY_TEXT_FIELD_CHANGE:
          var errorText = '';
          var valid = 1;
          var number = Number(action.value);
          if (action.value === '') {
            errorText = 'Required';
            valid = 0;
          }
          else if (typeof number != 'number' || isNaN(number) || !isFinite(number)) {
            errorText = 'Number required';
            valid = 0;
          }
          else if (number < 0.01) {
            errorText = '0.01 minimum';
            valid = 0;
          }
          return {
              ...state,
              value: action.value,
              errorText: errorText,
              valid: valid,
              number: number
          };
        case types.SET_PRICE_TO_FETCHING:
          return {
              ...state,
              fetch: 'IN_PROGRESS'
          };
          case types.SET_PRICE_TO_NOT_FETCHING:
          return {
              ...state,
              fetch: 'NONE'
          };
          case types.SET_PRICE_FROM_FETCH:
            return {
                ...state,
                number: Number(action.price),
                value: action.price,
                errorText: '',
                valid: 1,
                fetch: 'DONE'
            };
            case types.SET_PRICE_TO_FETCH_FAILED:
              return {
                  ...state,
                  fetch: 'FAILED'
              };
        default:
            return state;
    }
};

const units = (state = {}, action) => {
    switch (action.type) {
        case types.SELECT_MODEL_PORTFOLIO:
            var value;
            if (action.security.units) {
                value = action.security.units;
            } else
                value = '0';
            return {number: Number(value), value: value, valid: 1, errorText: ''}
        case types.CREATE_NEW_PORTFOLIO:
        case types.DELETE_MODEL_PORTFOLIO_REQUEST:
        case types.ADD_SECURITY:
            return {value: '', valid: 0, errorText: 'Required'}
        case types.SECURITY_TEXT_FIELD_CHANGE:
        var errorText = '';
        var valid = 1;
        var number = Number(action.value);
        if (action.value === '') {
          errorText = 'Required';
          valid = 0;
        }
        else if (typeof number != 'number' || isNaN(number) || !isFinite(number)) {
          errorText = 'Number required';
          valid = 0;
        }
        else if (number < 0) {
          errorText = '0 minimum';
          valid = 0;
        }
        return {
            ...state,
            value: action.value,
            errorText: errorText,
            valid: valid,
            number: number
        };
        default:
            return state;
    }
};


const topicReducer = combineReducers({topics, newTopic, selectedModelPortfolio, portfolio});

export default topicReducer;
