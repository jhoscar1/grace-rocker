// TODO: Our orders will need to send along an array of products on the order
// And each product will contain the correct quantity and price
import axios from 'axios';
const initialState = ({
    orders: []
});

/* ------------------------------    ACTIONS    ------------------------------*/
// Admin Order Actions
const SET_ORDER = 'SET_ORDER';
const DELETE_ORDER = 'DELETE_ORDER';
const GET_ORDERS = 'GET_ORDERS';


/* --------------------------    ACTION-CREATORS    --------------------------*/

export const getOrders = (orders) => ({ type: GET_ORDERS, orders})
export const setOrder = (order) => ({ type: SET_ORDER, order });
export const deleteOrder = (order) => ({ type: DELETE_ORDER, order });

/* -----------------------------  DISPATCHERS   ------------------------------*/

export const fetchOrders = userId => dispatch => {
  axios.get(`/api/orders/user/${userId}`)
  .then(res => res.data)
  .then(ordersArr => dispatch(getOrders(ordersArr)));
}

/* -----------------------------    REDUCERS    ------------------------------*/
export default (state = initialState, action) => {
  const newState = Object.assign({}, state);
  switch(action.type) {
    case GET_ORDERS:
      newState.orders = action.orders;
      return newState;
    case SET_ORDER:
    case DELETE_ORDER:
    default:
      return newState;
  }
}
