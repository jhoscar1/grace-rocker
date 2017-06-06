import axios from 'axios';
import { browserHistory } from 'react-router';

const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const GET_USERS = 'GET_USERS';

const initialState = {
  users: [],
  user: {},
  defaultUser: {}
};

const getUsers = users => ({ type: GET_USERS, users });
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

export const fetchUsers = () => {
  return dispatch => {
    axios.get('/api/users')
    .then(res => res.data)
    .then(users => {
      dispatch(getUsers(users))
    })
  }
}



export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data || initialState.defaultUser)));

export const auth = (email, password, name, shippingAddress, method) =>
  dispatch =>
    axios.post(`/auth/${method}`, { name, email, password, shippingAddress })
      .then(res => {
        console.log(res)
        dispatch(getUser(res.data));
        browserHistory.push('/home');
      })
      .catch(error =>
        dispatch(getUser({ error })));

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(res => {
        dispatch(removeUser());
        browserHistory.push('/login');
      })
      .catch(err => console.log(err));

export default function (state = initialState, action) {
  var newState = Object.assign({}, state)
  switch (action.type) {
    case GET_USERS:
      newState.users = action.users;
      break;
    case GET_USER:
      newState.user = action.user;
      break;
    case REMOVE_USER:
      return {};
    default:
      return state;
  }
  return newState;
}
