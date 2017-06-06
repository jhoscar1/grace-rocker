import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import store from './store';
import { Main, Login, Signup, UserHome, UsersListContainer, ProductDetail } from './components';
import { me, fetchUsers, fetchProducts } from './reducer/';
import OrderList from './components/orders/OrderList';

const whoAmI = store.dispatch(me());
const grabUsers = store.dispatch(fetchUsers());
const grabProducts = store.dispatch(fetchProducts());

const requireLogin = (nextRouterState, replace, next) =>
  whoAmI
    .then(() => {
      const { userReducer } = store.getState();
      if (!userReducer.user) replace('/login');
      next();
    })
    .catch(err => console.log(err));


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={Login} />
        <Route path="admin">
         <Route path="users" component={UsersListContainer} onEnter={grabUsers} />
        </Route>
        <Route path="login" component={Login} />
        <Route path="signup" component={Signup} />
        <Route onEnter={requireLogin}>
          <Route path="home" component={UserHome} onEnter={grabProducts} />
          <Route path="products/:id" component={ProductDetail} />
          <Route path="home" component={UserHome} />
          <Route path="orders" component={OrderList} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
