import {combineReducers} from 'redux';
import timer from './timer/reducer';
import counter from './counter/reducer';

export default combineReducers({timer, counter});
