// TODO: Our orders will need to send along an array of products on the order
// And each product will contain the correct quantity and price
import { fetchCart } from './cart';
import axios from 'axios';
import {browserHistory} from 'react-router';
const initialState = ({
    orders: [],
    activeOrders: [],
    currentOrder: {}
});

/* ------------------------------    ACTIONS    ------------------------------*/
// Admin Order Actions
export const SET_ORDER = 'SET_ORDER';
export const DELETE_ORDER = 'DELETE_ORDER';
export const GET_ORDERS = 'GET_ORDERS';
export const PROCESS_ORDER = 'PROCESS_ORDER'
export const SET_CURRENT_ORDER = 'SET_CURRENT_ORDER';

/* --------------------------    ACTION-CREATORS    --------------------------*/

export const getOrders = (orders) => ({ type: GET_ORDERS, orders})
export const setOrder = (orders) => ({ type: SET_ORDER, orders });
export const deleteOrder = (order) => ({ type: DELETE_ORDER, order });
export const shipOrder = order => ({ type: PROCESS_ORDER, order });
export const setCurrentOrder = order => ({ type: SET_CURRENT_ORDER, order });
/* -----------------------------  DISPATCHERS   ------------------------------*/

export const processOrder = (orderId, body) => dispatch => {
  axios.put(`/api/orders/${orderId}`, body)
  .then(res => {
    return res.data
  })
  .then(() => {
   return axios.post(`/api/mailing/`, body)
    .then(() => {
      dispatch(fetchCart());
    })
    .catch(console.error.bind(console));
  })
  .then(() => {
    browserHistory.push('/home');
  })
  .catch(error => {
    dispatch(fetchCart(error));
  });
}

export const fetchOrders = userId => dispatch => {
  axios.get(`/api/orders/user/${userId}`)
  .then(res => res.data)
  .then(ordersArr => dispatch(setOrder(ordersArr)));
}

export const fetchAllOrders = ()  => dispatch => {
  axios.get('/api/orders')
  .then(res => res.data)
  .then(allOrders => dispatch(getOrders(allOrders)))
}

export const fetchSingleOrder = orderId => dispatch => {
  axios.get(`/api/orders/${orderId}`)
  .then(res => res.data)
  .then(foundOrder => dispatch(setCurrentOrder(foundOrder)))
}

/* -----------------------------    REDUCERS    ------------------------------*/
export default (state = initialState, action) => {
  const newState = Object.assign({}, state);
  switch(action.type) {
    case GET_ORDERS:
      newState.orders = action.orders;
      return newState;
    // case GET_ALL_ORDERS:
    //   newState.orders
    case SET_ORDER:
      newState.orders = action.orders;
      return newState;
    case SET_CURRENT_ORDER:
      newState.currentOrder = action.order;
      return newState;
    case DELETE_ORDER:
    default:
      return newState;
  }
}
