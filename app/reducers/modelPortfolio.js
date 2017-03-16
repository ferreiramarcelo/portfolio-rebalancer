import { combineReducers} from 'redux';
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
      if ( state.id === action.id ) {
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
      if ( action.data ) {
        return {
          modelPortfolios: action.data,
          defaultModelPortfolios: [],
          userModelPortfolios: [],
          displayModelPortfolios: []
        }
      }
      return state;
    case types.INITIALIZE_MODEL_PORTFOLIOS:
      const userModelPortfolios = [];
      const defaultModelPortfolios = [];
      for (const modelPortfolio of state.modelPortfolios) {
        if ( modelPortfolio.email === action.email ) {
          userModelPortfolios.push( modelPortfolio );
        } else if ( !modelPortfolio.email ) {
          defaultModelPortfolios.push( modelPortfolio );
        }
      }

      const newAction = action;
      newAction.defaultModelPortfolios = defaultModelPortfolios;
      newAction.userModelPortfolios = userModelPortfolios;
      const initialDisplayModelPortfolios = displayModelPortfolios( undefined, newAction );

      return {
        ...state,
        defaultModelPortfolios,
        userModelPortfolios,
        displayModelPortfolios: initialDisplayModelPortfolios
      };
    case types.CREATE_MODEL_PORTFOLIO_REQUEST:
      return [
        ...state,
        modelPortfolio( undefined, action )
      ];
    case types.CREATE_MODEL_PORTFOLIO_FAILURE:
      return state.filter( t => t.id !== action.id );
    case types.SAVE_MODEL_PORTFOLIO_REQUEST:
      return state.map( t => modelPortfolio( t, action ) );
    case types.DELETE_MODEL_PORTFOLIO_REQUEST:
    case types.SAVE_MODEL_PORTFOLIO_FAILURE:
      return state.filter( t => t.id !== action.id );
    default:
      return state;
  }
};

const displayModelPortfolioElement = (state = {}, action) => {
  switch (action.type) {
    case types.INITIALIZE_MODEL_PORTFOLIOS:
      const children = [];
      let modelPortfolio = null;
      if ( action.modelPortfolioElement.subGroups.length > 0 ) {
        for (let i = 0; i < action.modelPortfolioElement.subGroups.length; i++) {
          const newPosition = action.position.slice( 0 );
          newPosition.push( i );
          const newAction = {
            type: action.type,
            modelPortfolioElement: action.modelPortfolioElement.subGroups[ i ],
            position: newPosition
          };
          children.push( displayModelPortfolioElement( undefined, newAction ) );
        }
      } else if ( action.modelPortfolioElement.modelPortfolios.length ) {
        for (let i = 0; i < action.modelPortfolioElement.modelPortfolios.length; i++) {
          const newPosition = action.position.slice( 0 );
          newPosition.push( i );
          const newAction = {
            type: action.type,
            modelPortfolioElement: action.modelPortfolioElement.modelPortfolios[ i ],
            position: newPosition
          };
          children.push( displayModelPortfolioElement( undefined, newAction ) );
        }
      } else {
        modelPortfolio = action.modelPortfolioElement
      }
      return {
        modelPortfolio,
        children,
        id: action.modelPortfolioElement.id,
        open: false,
        position: action.position,
        displayName: action.modelPortfolioElement.displayName,
      };
    case types.TOGGLE_MODEL_PORTFOLIO_GROUP_OPENNESS:
      if ( action.position.length > 0 ) {
        const newAction = {
          type: action.type,
          position: action.position.slice( 1 )
        };
        const newChildren = state.children.slice( 0 );
        newChildren[ action.position[ 0 ] ] = displayModelPortfolioElement( state.children[ action.position[ 0 ] ], newAction );
        return {
          ...state,
          children: newChildren
        };
      }
      return {
        ...state,
        open: !state.open
      };
    case types.CLOSE_MODEL_PORTFOLIO_GROUP:
      return {
        ...state,
        open: false
      };
    default:
      return state;
  }
};


const displayModelPortfolios = (state = [], action) => {
  switch (action.type) {
    case types.INITIALIZE_MODEL_PORTFOLIOS:
      let initialDisplayModelPortfolios = [];
      if ( action.userModelPortfolios.length === 0 ) {
        for (let i = 0; i < action.defaultModelPortfolios.length; i++) {
          const newAction = {
            type: action.type,
            modelPortfolioElement: action.defaultModelPortfolios[ i ],
            position: [0,
              i
            ]
          };
          initialDisplayModelPortfolios.push( displayModelPortfolioElement( undefined, newAction ) );
        }
      } else {
        const userModelPortfolios = [];
        for (let i = 0; i < action.userModelPortfolios.length; i++) {
          const newAction = {
            type: action.type,
            modelPortfolioElement: action.userModelPortfolios[ i ],
            position: [0,
              i
            ]
          };
          userModelPortfolios.push( displayModelPortfolioElement( undefined, newAction ) );
        }
        const defaultModelPortfolios = [];
        for (let i = 0; i < action.defaultModelPortfolios.length; i++) {
          const newAction = {
            type: action.type,
            modelPortfolioElement: action.defaultModelPortfolios[ i ],
            position: [1,
              i
            ]
          };
          defaultModelPortfolios.push( displayModelPortfolioElement( undefined, newAction ) );
        }
        const userModelPortfoliosGroup = {
          id: 'USER_MODEL_PORTFOLIOS_GROUP',
          open: true,
          position: [
            0
          ],
          displayName: 'Custom model portfolios',
          children: userModelPortfolios
        };
        const defaultModelPortfoliosGroup = {
          id: 'DEFAULT_MODEL_PORTFOLIOS_GROUP',
          open: true,
          position: [
            1
          ],
          displayName: 'Default model portfolios',
          children: defaultModelPortfolios
        };
        initialDisplayModelPortfolios = [
          userModelPortfoliosGroup,
          defaultModelPortfoliosGroup
        ];

      }
      return initialDisplayModelPortfolios;
    case types.TOGGLE_MODEL_PORTFOLIO_GROUP_OPENNESS:
      const newAction = {
        type: action.type,
        position: action.position.slice( 1 )
      };
      state[ action.position[ 0 ] ] = displayModelPortfolioElement( state[ action.position[ 0 ] ], newAction )
      return state;
    default:
      return state;
  }
};

const displayModelPortfolio = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const modelPortfolioReducer = combineReducers( {
  modelPortfoliosAutoCompleteSearchText,
  modelPortfolios,
  displayModelPortfolios
} );

export default modelPortfolioReducer;
