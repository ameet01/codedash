import { combineReducers } from 'redux';

import authReducer from './authReducer';
import userReducer from './userReducer';

const Reducers = combineReducers({
  auth: authReducer,
  users: userReducer
});

export default Reducers;
