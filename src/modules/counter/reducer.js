import * as types from './types';
const initialState = 0;

export default (state = initialState, action) => {
  switch (action.type) {
    case types.INC:
      return state + 1;
    case types.DEC:
      return state - 1;
    default:
      return state;
  }
};
