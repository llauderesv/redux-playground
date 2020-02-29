import * as types from './types';

export const start = () => ({
  type: types.START,
});

export const stop = () => ({
  type: types.STOP,
});

export const pause = () => ({
  type: types.PAUSE,
});

export const tick = () => ({
  type: types.TICK,
});
