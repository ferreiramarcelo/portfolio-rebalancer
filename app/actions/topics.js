/* eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from '../types';

polyfill();

export function selectModelPortfolio(selectedModelPortfolio) {
  return {
    type: types.SELECT_MODEL_PORTFOLIO,
    selectedModelPortfolio: selectedModelPortfolio
  };
}

export function createNewPortfolio() {
    return {
        type: types.CREATE_NEW_PORTFOLIO,
    };
}

export function modelPortfolioNameTextFieldChange(value) {
    return {
        type: types.MODEL_PORTFOLIO_NAME_TEXT_FIELD_CHANGE,
        value: value
    };
}

export function addSecurity() {
    return {
        type: types.ADD_SECURITY,
    };
}

export function removeSecurity(index) {
    return {
        type: types.REMOVE_SECURITY,
        index: index
    };
}

export function securityTextFieldChange(index, column, value) {
    return {
        type: types.SECURITY_TEXT_FIELD_CHANGE,
        index: index,
        column: column,
        value: value
    };
}

export function securityTextFieldValid(index, column) {
    return {
        type: types.SECURITY_TEXT_FIELD_VALID,
        index: index,
        column: column
    };
}

export function securityTextFieldError(index, column, error) {
    return {
        type: types.SECURITY_TEXT_FIELD_ERROR,
        index: index,
        column: column,
        error: error
    };
}

export function makeTopicRequest(method, id, data, api = '/topic') {
  return request[method](api + (id ? ('/' + id) : ''), data);
}

export function increment(id) {
  return { type: types.INCREMENT_COUNT, id };
}

export function decrement(id) {
  return { type: types.DECREMENT_COUNT, id };
}

export function destroy(id) {
  return { type: types.DESTROY_TOPIC, id };
}


export function typing(text) {
  return {
    type: types.TYPING,
    newTopic: text
  };
}

/*
 * @param data
 * @return a simple JS object
 */
export function createTopicRequest(data) {
  return {
    type: types.CREATE_TOPIC_REQUEST,
    id: data.id,
    count: data.count,
    text: data.text
  };
}

export function createTopicSuccess() {
  return {
    type: types.CREATE_TOPIC_SUCCESS
  };
}

export function createTopicFailure(data) {
  return {
    type: types.CREATE_TOPIC_FAILURE,
    id: data.id,
    error: data.error
  };
}

export function createTopicDuplicate() {
  return {
    type: types.CREATE_TOPIC_DUPLICATE
  };
}

// This action creator returns a function,
// which will get executed by Redux-Thunk middleware
// This function does not need to be pure, and thus allowed
// to have side effects, including executing asynchronous API calls.
export function createTopic(text) {
  return (dispatch, getState) => {
    // If the text box is empty
    if (text.trim().length <= 0) return;

    const id = md5.hash(text);
    // Redux thunk's middleware receives the store methods `dispatch`
    // and `getState` as parameters
    const { topic } = getState();
    const data = {
      count: 1,
      id,
      text
    };

    // Conditional dispatch
    // If the topic already exists, make sure we emit a dispatch event
    if (topic.topics.filter(topicItem => topicItem.id === id).length > 0) {
      // Currently there is no reducer that changes state for this
      // For production you would ideally have a message reducer that
      // notifies the user of a duplicate topic
      return dispatch(createTopicDuplicate());
    }

    // First dispatch an optimistic update
    dispatch(createTopicRequest(data));

    return makeTopicRequest('post', id, data)
      .then(res => {
        if (res.status === 200) {
          // We can actually dispatch a CREATE_TOPIC_SUCCESS
          // on success, but I've opted to leave that out
          // since we already did an optimistic update
          // We could return res.json();
          return dispatch(createTopicSuccess());
        }
      })
      .catch(() => {
        return dispatch(createTopicFailure({ id, error: 'Oops! Something went wrong and we couldn\'t create your topic'}));
      });
  };
}

export function incrementCount(id) {
  return dispatch => {
    return makeTopicRequest('put', id, {
        isFull: false,
        isIncrement: true
      })
      .then(() => dispatch(increment(id)))
      .catch(() => dispatch(createTopicFailure({id, error: 'Oops! Something went wrong and we couldn\'t add your vote'})));
  };
}

export function decrementCount(id) {
  return dispatch => {
    return makeTopicRequest('put', id, {
        isFull: false,
        isIncrement: false
      })
      .then(() => dispatch(decrement(id)))
      .catch(() => dispatch(createTopicFailure({id, error: 'Oops! Something went wrong and we couldn\'t add your vote'})));
  };
}

export function destroyTopic(id) {
  return dispatch => {
    return makeTopicRequest('delete', id)
      .then(() => dispatch(destroy(id)))
      .catch(() => dispatch(createTopicFailure({id,
        error: 'Oops! Something went wrong and we couldn\'t add your vote'})));
  };
}
