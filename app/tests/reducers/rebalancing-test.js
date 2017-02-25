import expect from 'expect';
import rebalancingReducer from 'reducers/rebalancing';
import * as types from 'types';

describe('Rebalancing Reducer', () => {
  const initialState = {};

  it('should return the initial state', () => {
    expect(
      rebalancingReducer(undefined, {})
    ).toEqual(initialState);
  });

});
