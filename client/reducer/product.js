import axios from 'axios';

/* -------------------------- CONSTANTS ------------------------*/

const GET_PRODUCTS = 'GET_PRODUCTS';
const SELECT_PRODUCT = 'SELECT_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
const CREATE_PRODUCT = 'CREATE_PRODUCT';

const initialState = {
  products: [],
  product: {},
};

/* -------------------------- ACTION CREATORS ------------------------*/

const getProducts = products => ({ type: GET_PRODUCTS, products });
const selectProduct = product => ({ type: SELECT_PRODUCT, product });
const updateProduct = product => ({ type: UPDATE_PRODUCT, product});
const removeProduct = id => ({ type: REMOVE_PRODUCT, id });
const createProduct = product => ({type: CREATE_PRODUCT, product })


/* -------------------------- DISPATCHERS ------------------------*/

export const fetchProducts = () => {
  return dispatch => {
    axios.get('/api/products')
    .then(res => res.data)
    .then(products => {
      dispatch(getProducts(products));
    });
  }
}

/* -------------------------- REDUCER ------------------------*/

export default function (state = initialState, action) {
  var newState = Object.assign({}, state)
  switch (action.type) {
    case GET_PRODUCTS:
      newState.products = action.products;
      break;
    case SELECT_PRODUCT:
      newState.product = action.product;
      break;
    case REMOVE_PRODUCT:
      newState.products = newState.products.filter(product => product.id !== action.id)
      break;
    default:
      return state;
  }
  return newState;
}
