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


export const fetchCart = (err) => dispatch => {
  axios.get(`/api/cart/`)

  .then(res => res.data)
  .then(cart => {
    if(err) cart.error = err;
    dispatch(getCart(cart))
  })
  .catch(console.error);
}

export const addProduct = (orderId, productId, quantity, userId) => dispatch => {
  const quantityObj = {quantity: +quantity}
  axios.post(`/api/cart/${orderId}/${productId}`, quantityObj)
  .then(() => {
    dispatch(fetchCart(userId));
  })
  .catch(console.error)
}

export const updateQuantity = (orderId, productId, quantity, userId) => dispatch => {
  const quantityObj = {quantity: +quantity}
  axios.put(`/api/cart/${orderId}/${productId}`, quantityObj)
  .then(() => {
    dispatch(fetchCart(userId));
  })
  .catch(console.error)
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
