import {
    combineReducers
} from 'redux';
import * as types from '../types';

const selectedModelPortfolio = (state = {}, action) => {
    switch (action.type) {
        case types.SELECT_MODEL_PORTFOLIO:
            return {
                id: action.selectedModelPortfolio.id,
                name: action.selectedModelPortfolio.name,
                email: action.selectedModelPortfolio.email,
                securities: action.selectedModelPortfolio.securities
            };
        case types.CREATE_MODEL_PORTFOLIO_REQUEST:
        case types.SAVE_MODEL_PORTFOLIO_REQUEST:
            return {
                ...state,
                id: action.id,
                name: action.name,
                email: action.email,
                securities: action.securities
            };
        case types.MODEL_PORTFOLIO_NAME_TEXT_FIELD_CHANGE:
            return {
                ...state,
                name: action.value
            };
        case types.CREATE_NEW_PORTFOLIO:
        case types.DELETE_MODEL_PORTFOLIO_REQUEST:
            {
                let numModelPortfoliosWithDefaultName = 0;
                for (let i = 0; i < action.modelPortfolios.length; i++) {
                    if (action.modelPortfolios[i].email === action.email) {
                        if (numModelPortfoliosWithDefaultName === 0) {
                            if (action.modelPortfolios[i].name === 'Model Portfolio Name') {
                                numModelPortfoliosWithDefaultName += 2;
                            }
                        } else if (action.modelPortfolios[i].name === 'Model Portfolio Name ' + numModelPortfoliosWithDefaultName) {
                            numModelPortfoliosWithDefaultName++;
                        } else {
                            break;
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
                    securities: []
                };
            }
        default:
            return state;
    }
};

const symbol = (state = {
    value: '',
    dirty: false
}, action) => {
    switch (action.type) {
        case types.SELECT_MODEL_PORTFOLIO:
            return {
                value: action.security.symbol,
                dirty: true
            };
        case types.SECURITY_TEXT_FIELD_CHANGE:
            return {
                value: action.value,
                dirty: true
            };
        default:
            return state;
    }
};

const allocation = (state = {
    value: '0',
    dirty: false
}, action) => {
    switch (action.type) {
        case types.SELECT_MODEL_PORTFOLIO:
            return {
                value: String(action.security.allocation),
                dirty: true
            };
        case types.SECURITY_TEXT_FIELD_CHANGE:
            return {
                value: action.value,
                dirty: true
            };
        default:
            return state;
    }
};

const price = (state = {
    value: '1.00',
    dirty: false,
    fetchStatus: 'NONE',
    currency: null,
    originalCurrency: null
}, action) => {
    switch (action.type) {
        case types.SELECT_MODEL_PORTFOLIO:
            return {
                ...state,
                value: (action.security.price || '1.00'),
                dirty: true,
                fetchStatus: 'NONE',
            };
        case types.SECURITY_TEXT_FIELD_CHANGE:
            return {
                ...state,
                value: action.value,
                dirty: true,
                fetchStatus: 'NONE',
                currency: null,
                originalPrice: action.value
            };
        case types.SET_PRICE_TO_FETCHING:
            return {
                ...state,
                fetchStatus: 'IN_PROGRESS'
            };
        case types.SET_PRICE_TO_NOT_FETCHING:
            return {
                ...state,
                fetchStatus: 'NONE'
            };
        case types.SET_PRICE_FROM_FETCH:
            return {
                ...state,
                value: action.price,
                dirty: true,
                fetchStatus: 'DONE',
                currency: action.currency,
                originalPrice: action.originalPrice
            };
        case types.SET_PRICE_TO_FETCH_FAILED:
            return {
                ...state,
                fetchStatus: 'FAILED'
            };
        case types.SET_CURRENCIES:
            if (state.currency === null) {
              return state;
            }
            const conversionRate = action.newListOfDistinctCurrencies[state.currency];
            let newPrice = Number(state.originalPrice);
            if (conversionRate !== null) {
                newPrice = newPrice * conversionRate;
            }
            return {
                ...state,
                value: newPrice.toFixed(6)
            };
        default:
            return state;
    }
};

const units = (state = {
    value: '0',
    dirty: false
}, action) => {
    switch (action.type) {
        case types.SECURITY_TEXT_FIELD_CHANGE:
            return {
                value: action.value,
                dirty: true
            };
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
            return state;
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
            return state;
        case types.SET_CURRENCIES:
            return {
                ...state,
                price: price(state.price, action)
            };
        default:
            return state;
    }
};

const portfolio = (state = [], action) => {
    switch (action.type) {
        case types.SELECT_MODEL_PORTFOLIO:
            {
                const selectedPortoflio = [];
                for (let i = 0; i < action.selectedModelPortfolio.securities.length; i++) {
                    const securityAction = {
                        type: types.SELECT_MODEL_PORTFOLIO,
                        index: i,
                        security: action.selectedModelPortfolio.securities[i]
                    };
                    selectedPortoflio.push(security(undefined, securityAction));
                }
                return selectedPortoflio;
            }
        case types.CREATE_NEW_PORTFOLIO:
        case types.DELETE_MODEL_PORTFOLIO_REQUEST:
            {
                const newPortfolio = [];
                newPortfolio.push(security(undefined, action));
                return newPortfolio;
            }
        case types.ADD_SECURITY:
            {
                const addedSecurityAction = {
                    type: types.ADD_SECURITY,
                    index: state.length
                };
                return [
                    ...state,
                    security(undefined, addedSecurityAction)
                ];
            }
        case types.REMOVE_SECURITY:
            {
                const trunkedPortfolio = state.filter(s => s.index !== action.index);
                for (let i = action.index; i < trunkedPortfolio.length; i++) {
                    trunkedPortfolio[i].index--;
                }
                if (trunkedPortfolio.length < 1) {
                    const addedSecurityAction = {
                        type: types.ADD_SECURITY,
                        index: 0
                    };
                    trunkedPortfolio.push(security(undefined, addedSecurityAction));
                }
                return trunkedPortfolio;
            }
        case types.SECURITY_TEXT_FIELD_CHANGE:
        case types.SET_PRICE_TO_FETCHING:
        case types.SET_PRICE_TO_NOT_FETCHING:
        case types.SET_PRICE_FROM_FETCH:
        case types.SET_PRICE_TO_FETCH_FAILED:
        case types.SET_CURRENCIES:
            return state.map(s => security(s, action));
        default:
            return state;
    }
};

const currencies = (state = {
    tradingCurrency: null,
    listOfDistinctCurrencies: {}
}, action) => {
    switch (action.type) {
        case types.SELECT_MODEL_PORTFOLIO:
        case types.CREATE_NEW_PORTFOLIO:
        case types.DELETE_MODEL_PORTFOLIO_REQUEST:
            return {
                tradingCurrency: null,
                listOfDistinctCurrencies: {}
            };
        case types.SET_TRADING_CURRENCY:
            return {
                ...state,
                tradingCurrency: action.currency
            };
        case types.SET_PRICE_FROM_FETCH:
            const newState = { ...state
            };
            if (!newState.listOfDistinctCurrencies.hasOwnProperty(action.currency)) {
                state.listOfDistinctCurrencies[action.currency] = (action.conversionRate);
            }
            if (Object.keys(newState.listOfDistinctCurrencies).length === 1) {
                newState.tradingCurrency = action.currency;
            }
            return newState;
        case types.SET_CURRENCIES:
            return {
                tradingCurrency: action.newTradingCurrency,
                listOfDistinctCurrencies: action.newListOfDistinctCurrencies
            };
        default:
            return state;
    }
};

const conversionRatesFromTrading = (state = {}, action) => {
    switch (action.type) {
        default: return state;
    }
};

const portfolioReducer = combineReducers({
    selectedModelPortfolio,
    portfolio,
    currencies,
});

export default portfolioReducer;
