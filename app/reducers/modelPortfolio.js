import {combineReducers} from 'redux';
import * as types from '../types';

const modelPortfolio = (state = {}, action) => {
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

const modelPortfolios = (state = [], action) => {
    switch (action.type) {
        case types.REQUEST_SUCCESS:
            if (action.data)
                return action.data;
            return state;
        case types.CREATE_MODEL_PORTFOLIO_REQUEST:
            return [
                ...state,
                modelPortfolio(undefined, action)
            ];
        case types.CREATE_MODEL_PORTFOLIO_FAILURE:
            return state.filter(t => t.id !== action.id);
        case types.SAVE_MODEL_PORTFOLIO_REQUEST:
            return state.map(t => modelPortfolio(t, action));
        case types.SAVE_MODEL_PORTFOLIO_FAILURE:
            return state.filter(t => t.id !== action.id);
        case types.DESTROY_TOPIC:
            return state.filter(t => t.id !== action.id);
        case types.DELETE_MODEL_PORTFOLIO_REQUEST:
            return state.filter(t => t.id !== action.id);
        case types.INCREMENT_COUNT:
        case types.DECREMENT_COUNT:
            return state.map(t => modelPortfolio(t, action));
        default:
            return state;
    }
};

const newModelPortfolio = (state = '', action) => {
    switch (action.type) {
        case types.TYPING:
            return action.newModelPortfolio;
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
                symbol: symbol(undefined, action),
                allocation: allocation(undefined, action),
                price: price(undefined, action),
                units: units(undefined, action)
            };
        case types.CREATE_NEW_PORTFOLIO:
        case types.DELETE_MODEL_PORTFOLIO_REQUEST:
            return {
                index: 0,
                symbol: symbol(undefined, action),
                allocation: allocation(undefined, action),
                price: price(undefined, action),
                units: units(undefined, action),
            };
        case types.ADD_SECURITY:
            return {
                index: action.index,
                symbol: symbol(undefined, action),
                allocation: allocation(undefined, action),
                price: price(undefined, action),
                units: units(undefined, action),
            };
        case types.SECURITY_TEXT_FIELD_CHANGE:
            if (state.index === action.index) {
                switch (action.column) {
                    case 'symbol':
                        return {
                            ...state,
                            symbol: symbol(state.symbol, action)
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

const symbol = (state = {value: '', setOnce: false}, action) => {
    switch (action.type) {
        case types.SELECT_MODEL_PORTFOLIO:
            return {value: action.security.symbol, setOnce: true}
        case types.SECURITY_TEXT_FIELD_CHANGE:
            return {
                value: action.value,
                setOnce: true
            };
        default:
            return state;
    }
};

const allocation = (state = {value: '0', setOnce: false}, action) => {
    switch (action.type) {
        case types.SELECT_MODEL_PORTFOLIO:
            return {value: action.security.allocation, setOnce: true}
        case types.SECURITY_TEXT_FIELD_CHANGE:
            return {
                value: action.value,
                setOnce: true
            };
        default:
            return state;
    }
};

const price = (state = {value: '1.00', setOnce: false, fetch: 'NONE'}, action) => {
    switch (action.type) {
        case types.SELECT_MODEL_PORTFOLIO:
            return {value: action.security.price, setOnce: true}
        case types.SECURITY_TEXT_FIELD_CHANGE:
            return {
                value: action.value,
                setOnce: true,
                fetch: 'NONE'
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
                    value: action.price,
                    setOnce: true,
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

const units = (state = {value: '0', setOnce: false}, action) => {
    switch (action.type) {
        case types.SECURITY_TEXT_FIELD_CHANGE:
            return {
                value: action.value,
                setOnce: true
            };
        default:
            return state;
    }
};

const oldsymbol = (state = {value: '', setOnce: false}, action) => {
    switch (action.type) {
        case types.SELECT_MODEL_PORTFOLIO:
            return {value: action.security.symbol, setOnce: true}
        case types.SECURITY_TEXT_FIELD_CHANGE:
            return {
                value: action.value,
                setOnce: true
            };
        default:
            return state;
    }
};

const modelPortfolioReducer = combineReducers({modelPortfolios, newModelPortfolio, selectedModelPortfolio, portfolio});

export default modelPortfolioReducer;
