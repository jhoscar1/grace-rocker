import { combineReducers } from 'redux';
import userReducer from './user';
import productReducer from './product';
import orderReducer from './orders';
import cartReducer from './product'


export default combineReducers({ userReducer, productReducer, orderReducer, cartReducer });

