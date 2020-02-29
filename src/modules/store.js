import {createStore} from 'redux';
import rootReducer from './reducers';
import rootSaga from './sagas';
import middlewares, {sagaMiddleware} from './middlewares';

// Accepts as a initial state
export default preloadedState => {
  const store = createStore(rootReducer, preloadedState, middlewares);
  // Run saga middleware
  sagaMiddleware.run(rootSaga);

  return store;
};
