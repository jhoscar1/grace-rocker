import { combineReducers } from 'redux';
import userReducer from './user';
import productReducer from './product';
import orderReducer from './orders';
import cartReducer from './cart';


export default combineReducers({ userReducer, productReducer, orderReducer, cartReducer });

export * from './cart.js'
export * from './user.js'
export * from './product.js'
export * from './orders.js'
