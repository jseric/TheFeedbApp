// Import modules/components/methods
import 'materialize-css/dist/css/materialize.min.css';

import React      from 'react';
import ReactDOM   from 'react-dom';
import reduxThunk from 'redux-thunk';

import { Provider }                     from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/App.js';
import reducers from './reducers';

// Remove later!!!
import axios from 'axios';
window.axios = axios;

// Init redux store
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// Render root component
ReactDOM.render(
  <Provider store={ store }>
    <App/>
  </Provider>,
  document.querySelector('#root')
);
