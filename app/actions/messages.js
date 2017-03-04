/* eslint consistent-return: 0, no-else-return: 0*/
import * as types from '../types';

export function requestClose() {
  return { type: types.DISMISS_MESSAGE };
}

export default { requestClose };
