import axios from 'axios';
import { browserHistory } from 'react-router';

/* -------------------------- CONSTANTS ------------------------*/

export const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const GET_USERS = 'GET_USERS';
const UPDATE_USER = 'UPDATE_USER';

const initialState = {
  users: [],
  user: {}
};

/* -------------------------- ACTION CREATORS ------------------------*/

export const getUsers = users => ({ type: GET_USERS, users });
export const getUser = user => ({ type: GET_USER, user });
const removeUser = id => ({ type: REMOVE_USER, id });
const updateUser = user => ({type: UPDATE_USER, user});

/* -------------------------- DISPATCHERS ------------------------*/

export const fetchUsers = () => {
  return dispatch => {
    axios.get('/api/users')
    .then(res => res.data)
    .then(users => {
      dispatch(getUsers(users))
    })
  }
}

export const removeSelectedUser = id => {
  return dispatch => {
    axios.delete(`/api/users/${id}`)
    .then(() => {
      dispatch(removeUser(id))
    })
  }
}

export const editUser = (id, body) => {
  return dispatch => {
    axios.put(`/api/users/${id}`, body)
    .then((user) => {
      dispatch(updateUser(user.data));
    })
    .catch(console.error);
  }
}

export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data || initialState.user)));

export const auth = (email, password, method, name) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password, name })
      .then(res => {
        dispatch(getUser(res.data));
        browserHistory.push(`/users/${res.data.id}`);
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

/* -------------------------- REDUCER ------------------------*/

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
      newState.user = {}
      break;
    case UPDATE_USER:
      newState.user = action.user;
      break;
    default:
      return state;
  }
  return newState;
}


// newState.users.filter(user => user.id !== action.id)
