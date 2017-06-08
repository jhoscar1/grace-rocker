import axios from 'axios';

/* -------------------------- CONSTANTS ------------------------*/


const GET_ITEMS = 'GET_ITEMS';


const initialState = {
  items: []
};

/* -------------------------- ACTION CREATORS ------------------------*/


const getItems = items => ({type: GET_ITEMS, items})


/* -------------------------- DISPATCHERS ------------------------*/

export const fetchCart = userId => {
  axios.get(`/api/cart/${userId}`)
}



/* -------------------------- REDUCER ------------------------*/

export default function (state = initialState, action) {
  var newState = Object.assign({}, state)
  switch (action.type) {
    case GET_ITEMS:
      newState.items = action.items;
      break;
    default:
      return state;
  }
  return newState;
}
