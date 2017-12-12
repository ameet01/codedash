import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import demo from './demo';
import authReducer from './authReducer';

const Reducers = combineReducers({
    demo,
    auth: authReducer,
    routing: routerReducer
});

export default Reducers;
