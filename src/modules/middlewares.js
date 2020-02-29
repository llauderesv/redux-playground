import {applyMiddleware} from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';

export const sagaMiddleware = createSagaMiddleware();

// Place all your middlewares there...
let middlewares = [sagaMiddleware];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export default composeWithDevTools(applyMiddleware(...middlewares));
