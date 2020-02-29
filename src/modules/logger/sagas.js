import {
  actionChannel,
  take,
  put,
  call,
  delay,
  retry,
  select,
  fork,
  cancel,
} from 'redux-saga/effects';
import {LOG_ACTIVITY} from './types';
import {failedLogActivity} from './actionCreators';

// In handle request this is used to check whether we completed a new user quests or update the quest progress
function* handleRequest({activity, data}) {
  console.log('Start handling request.');
  const rnd = Math.round(Math.random() * 50);
  // if (rnd <= 30) {
  //   throw new Error(`Invalid request ${activity} ${data}`);
  // }
  yield delay(3000);
  console.log('Successfully log the data', activity, data);
}

const takeLatest = (patternOrChannel, saga, ...args) =>
  fork(function*() {
    let tasks;
    while (true) {
      const action = yield take(patternOrChannel);
      if (tasks) {
        yield cancel(tasks);
      }
      tasks = yield fork(saga, ...args.concat(action));
    }
  });

/**
 * Queues all dispatch actions LOG_ACTIVITY and wait until the request is finished to proceed to another request.
 * This will only create a 1 worker thread waiting to finish another tasks before continuing to another one...
 * This logger saga's logs an activity using actionChannel to queues all the request and process it one by one
 * until the request is finish before continuing to another one...
 */
export default function* activityLogger() {
  yield takeLatest('LOG_ACTIVITY', handleRequest);
  // try {
  //   const channel = yield actionChannel(['LOG_ACTIVITY', '*']);
  //   while (true) {
  //     const {payload, meta} = yield take(channel);
  //     console.log(meta);
  //     if (!meta || !meta.value) {
  //       continue;
  //     }

  //     // const counter = yield select(state => state.counter);
  //     // If request failed retry it 3 times.
  //     // If request failed 3 times there will be go to catch block.
  //     yield retry(3, 10 * 1000, handleRequest, {
  //       activity: payload.activity,
  //       data: meta.value,
  //     });
  //   }
  // } catch (error) {
  //   yield put(failedLogActivity(error.message));
  // }
}

// export default function* watchRequests() {
//   try {
//     const channel = yield actionChannel(LOG_ACTIVITY);
//     while (true) {
//       const {payload, meta} = yield take(LOG_ACTIVITY);
//       // const counter = yield select(state => state.counter);
//       // If request failed retry it 3 times.
//       // If request failed 3 times there will be go to catch block.
//       yield fork(handleRequest, {
//         activity: payload.activity,
//         data: meta.value,
//       });
//       // yield retry(3, 10 * 1000, handleRequest, {
//       //   activity: payload.activity,
//       //   data: meta.value,
//       // });
//     }
//   } catch (error) {
//     yield put(failedLogActivity(error.message));
//   }
// }

/**
 * Like actionChannel (effect) eventChannel (a factory function, not an Effect) creates a Channel for events but from event sources other
 * than the Redux Store.
 */
// export default function* watchAndLogActivity() {
//   // create a channel to queue incoming requests
//   const chan = yield call(channel);

//   // create 3 worker 'threads'
//   // for (var i = 0; i < 3; i++) {
//   //   yield fork(handleRequest, chan);
//   // }

//   while (true) {
//     const {payload} = yield take(chan);
//     yield put(chan, payload);
//     yield call(handleRequest, payload.activity);
//   }
// }
