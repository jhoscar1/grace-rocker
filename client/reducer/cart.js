import axios from 'axios';

/* -------------------------- CONSTANTS ------------------------*/

// const SET_QUANTITY = 'SET_QUANTITY'
const GET_CART = 'GET_CART';


const initialState = {
  cart: {}
};

/* -------------------------- ACTION CREATORS ------------------------*/


const getCart = cart => ({type: GET_CART, cart})
// const setQuantity = (productId, quantity) => ({
//   type: SET_QUANTITY,
//   quantity,
//   productId
// })

/* -------------------------- DISPATCHERS ------------------------*/

export const fetchCart = userId => dispatch => {
  axios.get(`/api/cart/${userId}`)
  .then(res => res.data)
  .then(cart => {
    dispatch(getCart(cart))
  })
  .catch()
}

export const addProduct = (productId, userId, orderId, quantity) => dispatch => {
  const quantityObj = {quantity: +quantity}
  axios.post(`/api/cart/${orderId}/${productId}`, quantityObj)
  .then(() => {
    dispatch(fetchCart(userId));
  });
}

export const updateQuantity = (productId, orderId, quantity, userId) => dispatch => {
  const quantityObj = {quantity: +quantity}
  axios.put(`/api/cart/${orderId}/${productId}`, quantityObj)
  .then(() => {
    dispatch(fetchCart(userId));
  });
}


/* -------------------------- REDUCER ------------------------*/

export default function (state = initialState, action) {
  var newState = Object.assign({}, state)
  switch (action.type) {
    case GET_CART:
      newState.cart = action.cart;
    //   break;
    // case SET_QUANTITY:
    //   newState.cart.product[action.productId].product_order.unit_quantity = action.quantity
      break;
    default:
      return state;
  }
  return newState;
}
