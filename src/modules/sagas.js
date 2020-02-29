import {all, fork, call, delay, spawn, take, select} from 'redux-saga/effects';
import counter from './counter/sagas';
import timer, {takeOneAtMost} from './timer/sagas';
import logger from './logger/sagas';

function* user() {
  while (yield take('*')) {
    try {
      yield select();
      yield delay(5000);
      throw new Error('Test error');
    } catch (error) {
      console.log(error);
    }
  }
}

export default function* rootSaga() {
  yield all([counter, user, timer() /*takeOneAtMost() */, logger()]);
  // const sagas = [user, counterSagas];
  // yield all(
  //   sagas.map(saga =>
  //     fork(function*() {
  //       while (true) {
  //         try {
  //           yield call(saga);
  //           break;
  //         } catch (e) {
  //           console.log(e);
  //         }
  //       }
  //     })
  //   )
  // );
}
