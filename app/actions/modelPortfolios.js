/* eslint consistent-return: 0, no-else-return: 0*/
import { polyfill} from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from '../types';

polyfill();

export function setModelPortfolio( selectedModelPortfolio ) {
  return {
    type: types.SELECT_MODEL_PORTFOLIO,
    selectedModelPortfolio: selectedModelPortfolio
  };
}

export function selectModelPortfolio( selectedModelPortfolio ) {
  return (dispatch, getState) => {
    dispatch( setModelPortfolio( selectedModelPortfolio ) );
    const {modelPortfolio} = getState();
    for (let security of modelPortfolio.portfolio) {
      dispatch( setPriceToFetching( security.index ) );
      fetchSecurityPrice( security.symbol.value )
        .then( data => {
          if ( data.status === 200 ) {
            const price = data.data.query.results.quote.LastTradePriceOnly;
            const priceNumber = Number( price );
            if ( !price || typeof priceNumber != 'number' || isNaN( priceNumber ) || !isFinite( priceNumber ) ) {
              return dispatch( setPriceToFetchFailed( index ) );
            }
            return dispatch( setPriceFromFetch( security.index, price ) );
          }
        } )
        .catch( (jqxhr, textStatus, error) => {
          return dispatch( setPriceToFetchFailed( security.index ) );
        } );
    }
  };
}

export function createNewPortfolioAction( data ) {
  return {
    type: types.CREATE_NEW_PORTFOLIO,
    modelPortfolios: data.modelPortfolios,
    email: data.email
  };
}

export function createNewPortfolio() {
  return (dispatch, getState) => {
    const {modelPortfolio, user} = getState();
    dispatch( createNewPortfolioAction( {
      modelPortfolios: modelPortfolio.modelPortfolios,
      email: user.email
    } ) );
  };
}

export function selectedModelPortfolioNameChange( data ) {
  return {
    type: types.MODEL_PORTFOLIO_NAME_TEXT_FIELD_CHANGE,
    value: data.value,
    modelPortfolios: data.modelPortfolios,
    email: data.email
  };
}

export function selectedModelPortfolioTextFieldChange( value ) {
  return (dispatch, getState) => {
    const {user, modelPortfolio} = getState();
    dispatch( selectedModelPortfolioNameChange( {
      value: value,
      modelPortfolios: modelPortfolio.modelPortfolios,
      email: user.email
    } ) );
  };
}

export function addSecurity() {
  return {
    type: types.ADD_SECURITY,
  };
}

export function removeSecurity( index ) {
  return {
    type: types.REMOVE_SECURITY,
    index: index
  };
}

export function setPriceToFetching( index ) {
  return {
    index,
    type: types.SET_PRICE_TO_FETCHING,
  }
}

export function setPriceToNotFetching( index ) {
  return {
    index,
    type: types.SET_PRICE_TO_NOT_FETCHING,
  }
}

export function setPriceFromFetch( index, price ) {
  return {
    index,
    price,
    type: types.SET_PRICE_FROM_FETCH,
  }
}

export function setPriceToFetchFailed( index ) {
  return {
    index,
    type: types.SET_PRICE_TO_FETCH_FAILED,
  }
}

export function setSecurityTextFieldValue( index, column, value ) {
  return {
    type: types.SECURITY_TEXT_FIELD_CHANGE,
    index: index,
    column: column,
    value: value
  };
}

export function securityTextFieldChange( index, column, value ) {
  if ( column !== 'symbol' ) {
    return setSecurityTextFieldValue( index, column, value );
  } else {
    return (dispatch, getState) => {
      dispatch( setSecurityTextFieldValue( index, column, value ) );
      if ( value === '' ) {
        return dispatch( setPriceToNotFetching( index ) );
      }
      dispatch( setPriceToFetching( index ) );
      return fetchSecurityPrice( value )
        .then( data => {
          if ( data.status === 200 ) {
            let price = data.data.query.results.quote.LastTradePriceOnly;
            let priceNumber = Number( price );
            if ( !price || typeof priceNumber != 'number' || isNaN( priceNumber ) || !isFinite( priceNumber ) ) {
              return dispatch( setPriceToFetchFailed( index ) );
            }
            return dispatch( setPriceFromFetch( index, price ) );
          }
        } )
        .catch( (jqxhr, textStatus, error) => {
          return dispatch( setPriceToFetchFailed( index ) );
        } );
    };
  }
}

export function fetchSecurityPrice( symbol ) {
  let api = "https://query.yahooapis.com/v1/public/yql";
  let query = encodeURIComponent( "select LastTradePriceOnly from yahoo.finance.quotes where symbol in ('" + symbol + "')" );
  let yqlStatement = 'q=' + query + "&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
  let uri = api + '?' + yqlStatement;
  return request[ 'get' ]( uri );
}

export function makeModelPortfolioRequest( method, id, data, api = '/modelPortfolio' ) {
  return request[ method ]( api + (id ? ('/' + id) : ''), data );
}

export function createModelPortfolioRequest( data ) {
  return {
    type: types.CREATE_MODEL_PORTFOLIO_REQUEST,
    id: data.id,
    name: data.name,
    email: data.email,
    securities: data.securities
  };
}

export function createModelPortfolioSuccess() {
  return {
    type: types.CREATE_MODEL_PORTFOLIO_SUCCESS
  };
}

export function createModelPortfolioFailure( data ) {
  return {
    type: types.CREATE_MODEL_PORTFOLIO_FAILURE,
    id: data.id,
    error: data.error
  };
}

export function createModelPortfolioDuplicate() {
  return {
    type: types.CREATE_MODEL_PORTFOLIO_DUPLICATE
  };
}

export function saveModelPortfolioRequest( data ) {
  return {
    type: types.SAVE_MODEL_PORTFOLIO_REQUEST,
    id: data.id,
    name: data.name,
    email: data.email,
    securities: data.securities
  };
}

export function saveModelPortfolioSuccess() {
  return {
    type: types.SAVE_MODEL_PORTFOLIO_SUCCESS
  };
}

export function saveModelPortfolioFailure( data ) {
  return {
    type: types.SAVE_MODEL_PORTFOLIO_FAILURE,
    id: data.id,
    error: data.error
  };
}

export function saveModelPortfolioDuplicate() {
  return {
    type: types.SAVE_MODEL_PORTFOLIO_DUPLICATE
  };
}

export function deleteModelPortfolioRequest( data ) {
  return {
    type: types.DELETE_MODEL_PORTFOLIO_REQUEST,
    id: data.id,
    modelPortfolios: data.modelPortfolios,
    email: data.email
  };
}

export function deleteModelPortfolioSuccess() {
  return {
    type: types.SAVE_MODEL_PORTFOLIO_SUCCESS
  };
}

export function deleteModelPortfolioFailure( data ) {
  return {
    type: types.deleteModelPortfolioFailure,
    id: data.id,
    error: data.error
  };
}

export function saveModelPortfolio(selectedModelPortfolio, portfolio) {
	return (dispatch, getState) => {
		if (selectedModelPortfolio.name.trim().length <= 0 || portfolio.length <= 0) {
			return;
		}
		var securities = [];
		for (var security of portfolio) {
			securities.push({
				symbol: security.symbol.value,
				allocation: Number(security.allocation.value)
			});
		}
		if (selectedModelPortfolio.email) {
			const id = selectedModelPortfolio.id;
			const data = {
				id: id,
				name: selectedModelPortfolio.name,
				email: selectedModelPortfolio.email,
				securities: securities
			}
			dispatch(saveModelPortfolioRequest(data));
			return makeModelPortfolioRequest('put', id, data)
			.then( (res) => {
				if (res.status === 200) {
					return dispatch(saveModelPortfolioSuccess());
				}
			})
			.catch (() => {
				return dispatch(saveModelPortfolioFailure({
					error: 'Oops! Something went wrong and we couldn\'t save your modelPortfolio'
				}));
			});
		}
		const { user } = getState();
		const id = md5.hash(selectedModelPortfolio.name);
		const data = {
			id: id,
			name: selectedModelPortfolio.name,
			email: user.email,
			securities: securities
		}
		dispatch(createModelPortfolioRequest(data));
		return makeModelPortfolioRequest('post', id, data)
		.then((res) => {
			if (res.status === 200) {
				return dispatch(createModelPortfolioSuccess());
			}
		})
		.catch (() => {
			return dispatch(createModelPortfolioFailure({
				id,
				error: 'Oops! Something went wrong and we couldn\'t save your modelPortfolio'
			}));
		});
	};
}

export function incrementCount( id ) {
  return dispatch => {
    return makeModelPortfolioRequest( 'put', id, {
      isFull: false,
      isIncrement: true
    } )
      .then( () => dispatch( increment( id ) ) )
      .catch( () => dispatch( createModelPortfolioFailure( {
        id,
        error: 'Oops! Something went wrong and we couldn\'t add your portfolioRebalancer'
      } ) ) );
  };
}

export function decrementCount( id ) {
  return dispatch => {
    return makeModelPortfolioRequest( 'put', id, {
      isFull: false,
      isIncrement: false
    } )
      .then( () => dispatch( decrement( id ) ) )
      .catch( () => dispatch( createModelPortfolioFailure( {
        id,
        error: 'Oops! Something went wrong and we couldn\'t add your portfolioRebalancer'
      } ) ) );
  };
}

export function destroyModelPortfolio( id ) {
  return dispatch => {
    return makeModelPortfolioRequest( 'delete', id )
      .then( () => dispatch( destroy( id ) ) )
      .catch( () => dispatch( createModelPortfolioFailure( {
        id,
        error: 'Oops! Something went wrong and we couldn\'t add your portfolioRebalancer'
      } ) ) );
  };
}

export function deleteModelPortfolio( id ) {
  return (dispatch, getState) => {
    const {modelPortfolio, user} = getState();
    dispatch( deleteModelPortfolioRequest( {
      id: id,
      modelPortfolios: modelPortfolio.modelPortfolios,
      email: user.email
    } ) );
    return makeModelPortfolioRequest( 'delete', id )
      .then( res => {
        if ( res.status === 200 ) {
          return dispatch( deleteModelPortfolioSuccess() );
        }
      } )
      .catch( () => {
        return dispatch( deleteModelPortfolioFailure( {
          id: id,
          error: 'Oops! Something went wrong and we couldn\'t save your modelPortfolio'
        } ) );
      } );
  };
}
