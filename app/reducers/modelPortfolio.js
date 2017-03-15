import { combineReducers } from 'redux';
import * as types from '../types';

const modelPortfoliosAutoCompleteSearchText = (state = '', action) => {
  switch (action.type) {
    case types.MODEL_PORTFOLIOS_AUTO_COMPLETE_SEARCH_TEXT_CHANGE:
      return action.searchText;
    case types.SELECT_MODEL_PORTFOLIO:
      return '';
    default:
      return state;
  }
};

const modelPortfolio = (state = {}, action) => {
  switch (action.type) {
    case types.CREATE_MODEL_PORTFOLIO_REQUEST:
      return {
        id: action.id,
        name: action.name,
        email: action.email,
        securities: action.securities
      };
    case types.SAVE_MODEL_PORTFOLIO_REQUEST:
      if (state.id === action.id) {
        return {
          id: action.id,
          name: action.name,
          email: action.email,
          securities: action.securities
        };
      }
      return state;
    default:
      return state;
  }
};

const modelPortfolios = (state = {}, action) => {
  switch (action.type) {
    case types.REQUEST_SUCCESS:
      if (action.data) {
        return {modelPortfolios: action.data, defaultModelPortfolios: [], userModelPortfolios: [], displayModelPortfolios: []}
        //return action.data;
      }
      return state;
      case types.INITIALIZE_MODEL_PORTFOLIOS:
        const userModelPortfolios = [];
        const defaultModelPortfolios = [];
        for (const modelPortfolio of state.modelPortfolios) {
          if (modelPortfolio.email === action.email) {
            userModelPortfolios.push(modelPortfolio);
          }
          else if (!modelPortfolio.email) {
            defaultModelPortfolios.push(modelPortfolio);
          }
        }

        const newAction = action;
        newAction.defaultModelPortfolios = defaultModelPortfolios;
        newAction.userModelPortfolios = userModelPortfolios;
        const initialDisplayModelPortfolios = displayModelPortfolios(undefined, newAction);

        return {...state, defaultModelPortfolios, userModelPortfolios, displayModelPortfolios: initialDisplayModelPortfolios};
    case types.CREATE_MODEL_PORTFOLIO_REQUEST:
      return [
        ...state,
        modelPortfolio(undefined, action)
      ];
    case types.CREATE_MODEL_PORTFOLIO_FAILURE:
      return state.filter(t => t.id !== action.id);
    case types.SAVE_MODEL_PORTFOLIO_REQUEST:
      return state.map(t => modelPortfolio(t, action));
    case types.DELETE_MODEL_PORTFOLIO_REQUEST:
    case types.SAVE_MODEL_PORTFOLIO_FAILURE:
      return state.filter(t => t.id !== action.id);
    default:
      return state;
  }
};

const displayModelPortfolioElement = (state = {}, action) => {
  switch (action.type) {
    case types.INITIALIZE_MODEL_PORTFOLIOS:
      const children = [];
      for (const subGroup of action.modelPortfolioElement.subGroups) {
        const newAction = {type: action.type};
        newAction.modelPortfolioElement = subGroup;
        children.push( displayModelPortfolioElement(undefined, newAction) );
      }
      for (const subModelPortfolio of action.modelPortfolioElement.modelPortfolios) {
        const newAction = {type: action.type};
        newAction.modelPortfolioElement = subModelPortfolio;
        children.push( displayModelPortfolioElement(undefined, newAction) );
      }
      return {
        id: action.modelPortfolioElement.id,
        open: false,
        setOpen: function () {
          this.open = true;
        },
        displayName: action.modelPortfolioElement.displayName,
        children
      };
    case types.OPEN_MODEL_PORTFOLIO_GROUP:
      return {
        ...state,
        open: true
      };
      case types.CLOSE_MODEL_PORTFOLIO_GROUP:
        return {
          ...state,
          open: false
        }
    default:
      return state;
  }
};

const displayModelPortfolios = (state = [], action) => {
  switch (action.type) {
    case types.INITIALIZE_MODEL_PORTFOLIOS:
      const initialDisplayModelPortfolios = [];
      if (action.userModelPortfolios.length === 0) {
        for (const defaultModelPortfolio of action.defaultModelPortfolios) {
          const newAction = action;
          newAction.modelPortfolioElement = defaultModelPortfolio;
          newAction.position = [0];
          initialDisplayModelPortfolios.push( displayModelPortfolioElement(undefined, newAction) );
        }
      }
      return initialDisplayModelPortfolios;
      case types.OPEN_MODEL_PORTFOLIO_GROUP:
        return state;
    default:
      return state;
  }
};


const exampleModelPortfolio = {
  id: 'xd',
  position: [
    0,
    0,
    0
  ],
  displayName: 'Aggressive'
};

const exampleModelPortfolio2 = {
  id: 'xd2',
  position: [
    0,
    0,
    1
  ],
  displayName: 'Conservative'
};

const exampleChildCategory = {
  position: [
    0,
    0
  ],
  open: true,
  displayName: 'Exchange Traded Funds',
  children: [
    exampleModelPortfolio,
    exampleModelPortfolio2
  ]
};

const exampleChildCategory2 = {
  position: [
    0,
    1
  ],
  open: false,
  displayName: 'TD e-Series Funds',
  children: []
};

const exampleGroup = {
  position: [
    0
  ],
  open: true,
  displayName: 'Canadian Couch Potato',
  children: [
    exampleChildCategory,
    exampleChildCategory2
  ]
};

const exampleGroup2 = {
  position: [
    0
  ],
  open: false,
  displayName: 'Canadian Portfolio Manager',
  children: [
    exampleChildCategory2
  ]
};

const exampleDisplayModelPortfolios = [exampleGroup, exampleGroup2];

const displayModelPortfolio = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const modelPortfolioReducer = combineReducers({
  modelPortfoliosAutoCompleteSearchText,
  modelPortfolios,
  displayModelPortfolios
});

export default modelPortfolioReducer;
