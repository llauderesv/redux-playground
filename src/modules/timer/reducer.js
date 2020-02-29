import * as types from './types';

const initialState = 0;

export default (state = initialState, action) => {
  switch (action.type) {
    case types.TICK:
      return state + 1;
    // case types.PAUSE:
    //   return state;
    case types.STOP:
      return 0;
    default:
      return state;
  }
};
