import React from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import './index.css';
import App from './App';

import initStore from './modules/store';

const store = initStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
