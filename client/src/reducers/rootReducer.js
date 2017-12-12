import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authReducer from './authReducer';

const Reducers = combineReducers({
  auth: authReducer,
  routing: routerReducer
});

export default Reducers;
