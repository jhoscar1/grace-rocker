import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import store from './store';
import { Main, Login, Signup, AdminPanel, UserHome, UsersList, ProductsList, ProductDetail, OrderList, AdminOrderList, Cart } from './components';
import { me, fetchUsers, fetchProducts, fetchOrders, fetchAllOrders, fetchCart} from './reducer/';


const grabOrders = () => {
  const { user } = store.getState().userReducer;
  store.dispatch(fetchOrders(user.id));
}

const grabAllOrders = () => {
  console.log('grab all orders firing')
  store.dispatch(fetchAllOrders())
}

const whoAmI = store.dispatch(me());
const grabUsers = store.dispatch(fetchUsers());
const grabCart = () => {
  console.log(store.getState().userReducer.user.id)
  store.dispatch(fetchCart((store.getState().userReducer.user.id)));
}
const grabProducts = () => {
  store.dispatch(fetchProducts());
  grabCart()
}

const requireLogin = (nextRouterState, replace, next) =>
  whoAmI
    .then(() => {
      const { userReducer } = store.getState();
      if (!userReducer.user.id) replace('/login');
      next();
    })
    .catch(err => console.log(err));


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main} >
        <IndexRoute component={Login} />
        <Route path="admin" component={AdminPanel}>
         <Route path="users" component={UsersList} onEnter={grabUsers} />
         <Route path="products" component={ProductsList} onEnter={grabProducts} />
         <Route path="orders" component={AdminOrderList} onEnter={grabAllOrders} />
        </Route>
        <Route path="login" component={Login} />
        <Route path="signup" component={Signup} />
        <Route onEnter={requireLogin}>
          <Route path="home" component={UserHome} onEnter={grabProducts} />
          <Route path="products/:id" component={ProductDetail} />
          <Route path="orders" component={OrderList} onEnter={grabOrders} />
          <Route path="cart" component={Cart} onEnter={grabCart}/>
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
