import {take} from 'redux-saga/effects';

export default function* watchAndLog() {
  for (let i = 1; i <= 3; i++) {
    yield take('COUNTER/INC');
  }
  alert('Congratulations!');
}
