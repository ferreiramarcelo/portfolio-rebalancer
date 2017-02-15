/* eslint no-unused-vars: 0 */ // since fetch is needed but not used
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import md5 from 'spark-md5';
import { polyfill } from 'es6-promise';
import axios from 'axios';
import expect from 'expect';
import * as actions from 'actions/modelPortfolios';
import * as types from 'types';

polyfill();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('ModelPortfolio Actions', () => {
  describe('Asynchronous actions', () => {
    let sandbox;

    const index = 0;
    const modelPortfolio = 'A time machine';
    const id = md5.hash(modelPortfolio);
    const data = {
      id,
      count: 1,
      text: modelPortfolio
    };

    const initialState = {
      modelPortfolio: {
        modelPortfolios: [],
        newmodelPortfolio: ''
      }
    };

    beforeEach(() => {
      sandbox = sinon.sandbox.create(); // eslint-disable-line
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('dispatches request and success actions when status is 200', done => {
      const expectedActions = [
        {
          type: types.CREATE_TOPIC_REQUEST,
          id,
          count: 1,
          text: data.text
        }, {
          type: types.CREATE_TOPIC_SUCCESS
        }
      ];

      sandbox.stub(axios, 'post').returns(Promise.resolve({ status: 200 }));

      const store = mockStore(initialState);
      store.dispatch(actions.createModelPortfolio(modelPortfolio))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

    it('dispatches request and failed actions when status is NOT 200', done => {
      const expectedActions = [
        {
          type: types.CREATE_TOPIC_REQUEST,
          id,
          count: 1,
          text: data.text
        }, {
          type: types.CREATE_TOPIC_FAILURE,
          id,
          error: 'Oops! Something went wrong and we couldn\'t create your modelPortfolio'
        }
      ];
      sandbox.stub(axios, 'post').returns(Promise.reject({status: 404, data: 'Oops! Something went wrong and we couldn\'t create your modelPortfolio'}));

      const store = mockStore(initialState);
      store.dispatch(actions.createModelPortfolio(modelPortfolio))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

    it('dispatches a duplicate action for a duplicate modelPortfolio', () => {
      initialState.modelPortfolio.modelPortfolios.push(data);

      const expectedActions = [
        {
          type: types.CREATE_TOPIC_DUPLICATE
        }
      ];

      const store = mockStore(initialState);
      store.dispatch(actions.createModelPortfolio(modelPortfolio));
      expect(store.getActions()).toEqual(expectedActions);
      initialState.modelPortfolio.modelPortfolios.pop();
    });

    it('incrementCount dispatches an increment count action on success', done => {
      const expectedActions = [
      {
        type: types.INCREMENT_COUNT,
        id
      }];
      sandbox.stub(axios, 'put').returns(Promise.resolve({ status: 200 }));
      const store = mockStore();
      store.dispatch(actions.incrementCount(data.id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

    it('incrementCount should not dispatch a failure action on failure', done => {
      const expectedActions = [
      {
        type: types.CREATE_TOPIC_FAILURE,
        id: data.id,
        error: 'Oops! Something went wrong and we couldn\'t add your portfolioRebalancer'
      }];
      sandbox.stub(axios, 'put').returns(Promise.reject({ status: 400 }));
      const store = mockStore();
      store.dispatch(actions.incrementCount(data.id, index))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

    it('decrementCount dispatches an decrement count action on success', done => {
      const expectedActions = [
      {
        type: types.DECREMENT_COUNT,
        id
      }];
      sandbox.stub(axios, 'put').returns(Promise.resolve({ status: 200 }));
      const store = mockStore();
      store.dispatch(actions.decrementCount(data.id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

    it('decrementCount should not dispatch a decrement count action on failure', done => {
      const expectedActions = [
      {
        type: types.CREATE_TOPIC_FAILURE,
        error: 'Oops! Something went wrong and we couldn\'t add your portfolioRebalancer',
        id: data.id
      }];
      sandbox.stub(axios, 'put').returns(Promise.reject({ status: 400 }));
      const store = mockStore(initialState);
      store.dispatch(actions.decrementCount(data.id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

    it('destroyModelPortfolio dispatches a decrement count action on success', done => {
      const expectedActions = [
      {
        type: types.DESTROY_TOPIC,
        id
      }];
      sandbox.stub(axios, 'delete').returns(Promise.resolve({ status: 200 }));
      const store = mockStore();
      store.dispatch(actions.destroyModelPortfolio(data.id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

    it('destroyModelPortfolio should not dispatch an decrement count action on failure', done => {
      const expectedActions = [
      {
        type: types.CREATE_TOPIC_FAILURE,
        id: data.id,
        error: 'Oops! Something went wrong and we couldn\'t add your portfolioRebalancer'
      }];
      sandbox.stub(axios, 'delete').returns(Promise.reject({ status: 400 }));
      const store = mockStore();
      store.dispatch(actions.destroyModelPortfolio(data.id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });
  });
  describe('Action creator unit tests', () => {
    const index = 0;
    const modelPortfolio = 'A time machine';
    const id = md5.hash(modelPortfolio);
    const data = {
      id,
      count: 1,
      text: modelPortfolio
    };
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.sandbox.create(); // eslint-disable-line
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should create an action object to increment the count', () => {
      const expectedAction = {
        type: types.INCREMENT_COUNT,
        id
      };
      expect(actions.increment(id)).toEqual(expectedAction);
    });

    it('should create an action object to decrement count', () => {
      const expectedAction = {
        type: types.DECREMENT_COUNT,
        id
      };
      expect(actions.decrement(id)).toEqual(expectedAction);
    });

    it('should create an action object to destroy a modelPortfolio', () => {
      const expectedAction = {
        type: types.DESTROY_TOPIC,
        id
      };
      expect(actions.destroy(id)).toEqual(expectedAction);
    });

    it('should create an action object with a new modelPortfolio', () => {
      const expectedAction = {
        type: types.TYPING,
        newModelPortfolio: data.text
      };
      expect(actions.typing(data.text)).toEqual(expectedAction);
    });

    it('should create an action object with a new modelPortfolio request', () => {
      const expectedAction = {
        type: types.CREATE_TOPIC_REQUEST,
        id: data.id,
        count: data.count,
        text: data.text
      };
      expect(actions.createModelPortfolioRequest(data)).toEqual(expectedAction);
    });

    it('should create an action object on a new modelPortfolio success', () => {
      const expectedAction = {
        type: types.CREATE_TOPIC_SUCCESS
      };
      expect(actions.createModelPortfolioSuccess()).toEqual(expectedAction);
    });

    it('should create an action object on a new modelPortfolio failure', () => {
      const dataFail = Object.assign({}, {
        error: 'Oops! Something went wrong and we couldn\'t create your modelPortfolio',
        id: data.id
      });
      const expectedAction = {
        type: types.CREATE_TOPIC_FAILURE,
        id: dataFail.id,
        error: dataFail.error
      };
      expect(actions.createModelPortfolioFailure(dataFail)).toEqual(expectedAction);
    });

    it('should create an action on a modelPortfolio duplicate', () => {
      const expectedAction = {
        type: types.CREATE_TOPIC_DUPLICATE
      };
      expect(actions.createModelPortfolioDuplicate()).toEqual(expectedAction);
    });

  });
});
