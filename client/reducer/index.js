import { combineReducers } from 'redux';
import userReducer from './user';
import productReducer from './product';
import orderReducer from './orders';


export default combineReducers({ userReducer, productReducer, orderReducer });
export * from './user';
export * from './product';
export * from './orders';
