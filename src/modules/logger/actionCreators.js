import * as types from './types';

// Action creators in logging activity
export const logActivity = (activity, meta) => ({
  type: types.LOG_ACTIVITY,
  payload: {activity},
  meta,
});

export const failedLogActivity = data => ({
  type: types.LOG_ACTIVITY_ERROR,
  payload: {data},
});
