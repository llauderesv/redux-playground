import {take, put, delay, actionChannel, race} from 'redux-saga/effects';
import {tick, stop} from './actionCreators';

// export default function*() {
//   while (yield take('timer/start')) {
//     while (true) {
//       yield delay(1000);
//       yield put(tick());
//     }
//   }

//   while (yield take('timer/stop')) {
//     yield put(stop());
//   }
// }

export default function* runTimer() {
  const channel = yield actionChannel('timer/start');

  while (yield take(channel)) {
    while (true) {
      /**
       *
        If call(fetchUsers) resolves (or rejects) first, the result of race will be an object with a single keyed object {response: result} where result is the resolved result of fetchUsers.
        If an action of type CANCEL_FETCH is dispatched on the Store before fetchUsers completes, the result will be a single keyed object {cancel: action}, where action is the dispatched action.
       */
      const winner = yield race({
        stopped: take('timer/stop'),
        pause: take('timer/pause'),
        tick: delay(1000),
      });

      if (winner.tick) {
        yield put(tick());
      } else {
        break;
      }
    }
  }
}

export function* takeOneAtMost() {
  // Using actionChannel
  // you can used this to queue specific action in the store
  // Queue's all dispatch action in the middleware
  // So we want to queue all non-processed actions, and once we're done with processing the current request, we get the next message from the queue.
  // actionChannel can buffer incoming messages if the saga is not yet ready to take them (eg: blocked on an API call).
  
  const chan = yield actionChannel('COUNTER/INC');
  while (true) {
    const {payload} = yield take(chan);
    console.log(payload);
  }
}
