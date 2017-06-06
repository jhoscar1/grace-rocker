// TODO: Our orders will need to send along an array of products on the order
// And each product will contain the correct quantity and price
import axios from 'axios';
const initialState = ({
    products: []
});

/* ------------------------------    ACTIONS    ------------------------------*/

const SET_ORDER = 'SET_ORDER';
const DELETE_ORDER = 'DELETE_ORDER';


/* --------------------------    ACTION-CREATORS    --------------------------*/

export const setOrder = (order) => ({ type: SET_ORDER, order });
export const deleteOrder = (order) => ({ type: DELETE_ORDER, order });

/* -----------------------------    REDUCERS    ------------------------------*/

export default(state = initialState, action) => {
  const newState = Object.assign({}, state);
  switch(action.type) {
    case SET_ORDER:
    case DELETE_ORDER:
    default:
      return newState;
  }
}
