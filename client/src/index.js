import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';


import './styles/reset.css';
import './styles/index.css';
import './styles/NavBar.css';
import './styles/Footer.css';
import './styles/session.css';
import './styles/game.css';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const middleware = applyMiddleware(thunk, createLogger());
export const store = createStore(rootReducer, middleware);

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);
