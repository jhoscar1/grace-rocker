import axios from 'axios';

/* -------------------------- CONSTANTS ------------------------*/


const GET_CART = 'GET_CART';


const initialState = {
  cart: {}
};

/* -------------------------- ACTION CREATORS ------------------------*/


const getCart = cart => ({type: GET_CART, cart})


/* -------------------------- DISPATCHERS ------------------------*/

export const fetchCart = userId => dispatch => {
  axios.get(`/api/cart/${userId}`)
  .then(res => res.data)
  .then(cart => {
    dispatch(getCart(cart))
  })
  .catch()
}



/* -------------------------- REDUCER ------------------------*/

export default function (state = initialState, action) {
  var newState = Object.assign({}, state)
  switch (action.type) {
    case GET_CART:
      newState.cart = action.cart;
      break;
    default:
      return state;
  }
  return newState;
}
