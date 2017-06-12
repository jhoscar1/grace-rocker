// TODO: Our orders will need to send along an array of products on the order
// And each product will contain the correct quantity and price
import axios from 'axios';
const initialState = ({
    orders: [],
    currentOrder: {}
});

/* ------------------------------    ACTIONS    ------------------------------*/
// Admin Order Actions
const SET_ORDER = 'SET_ORDER';
const DELETE_ORDER = 'DELETE_ORDER';
const GET_ORDERS = 'GET_ORDERS';
const PROCESS_ORDER = 'PROCESS_ORDER'

/* --------------------------    ACTION-CREATORS    --------------------------*/

export const getOrders = (orders) => ({ type: GET_ORDERS, orders})
export const setOrder = (order) => ({ type: SET_ORDER, order });
export const deleteOrder = (order) => ({ type: DELETE_ORDER, order });
export const shipOrder = order => ({ type: PROCESS_ORDER, order });
/* -----------------------------  DISPATCHERS   ------------------------------*/

export const processOrder = (orderId, body) => dispatch => {
  axios.put(`/api/orders/${orderId}`, body)
  .then(res => res.data)
  .then(() => {
  return axios.post(`/api/orders/`)
  })
}

export const fetchOrders = userId => dispatch => {
  axios.get(`/api/orders/user/${userId}`)
  .then(res => res.data)
  .then(ordersArr => dispatch(getOrders(ordersArr)));
}

export const fetchAllOrders = ()  => dispatch => {
  axios.get('/api/orders')
  .then(res => res.data)
  .then(allOrders => dispatch(getOrders(allOrders)))
}

export const fetchSingleOrder = orderId => dispatch => {
  axios.get(`/api/orders/${orderId}`)
  .then(res => res.data)
  .then(foundOrder => dispatch(setOrder(foundOrder)))
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
      newState.currentOrder = action.order;
      return newState;
    case DELETE_ORDER:
    default:
      return newState;
  }
}
