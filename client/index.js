import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import store from './store';
import { Main, Login, Signup, AdminPanel, UserHome, UsersList, ProductsList, ProductDetail, OrderList, AdminOrderList, AdminOrderDetails, Cart, Checkout, UserDetail } from './components';
import { me, fetchUsers, fetchProducts, fetchOrders, fetchAllOrders, fetchSingleOrder, fetchCart} from './reducer/';


const whoAmI = store.dispatch(me());

const grabOrders = () => {
  whoAmI
  .then(() => {
    const { user } = store.getState().userReducer;
    store.dispatch(fetchOrders(user.id));
  })
}

const grabAllOrders = () => {
  store.dispatch(fetchAllOrders());
}

const grabUsers = () => {
  store.dispatch(fetchUsers());
}
const grabCart = () => {
  store.dispatch(fetchCart());
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

const onOrderEnter = (nextRouterState) => {
  const orderId = nextRouterState.params.id;
  store.dispatch(fetchSingleOrder(orderId))
}

const requireLoginAndSelf = (nextRouterState, replace, next) => {
  whoAmI
  .then(() => {
    const { userReducer } = store.getState();
    if (userReducer.user.id !== +nextRouterState.params.id) replace('/home');
    grabOrders();
    next();
  })
  .catch(console.error.bind(console));
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main} onEnter={grabProducts} >
        <IndexRoute component={UserHome} />
        <Route path="admin" component={AdminPanel}>
          <IndexRoute component={UsersList}  onEnter={grabUsers} />
          <Route path="users" component={UsersList} onEnter={grabUsers} />
          <Route path="products" component={ProductsList} onEnter={grabProducts} />
          <Route path="orders" component={AdminOrderList} onEnter={grabAllOrders} />
          <Route path="orders/:id" component={AdminOrderDetails} onEnter={onOrderEnter}/>
        </Route>
        <Route path="login" component={Login} />
        <Route path="signup" component={Signup} />
        <Route path="home" component={UserHome} />
        <Route path="products/:id" component={ProductDetail} onEnter={grabProducts} />
        <Route path="users/:id" component={UserDetail} onEnter={requireLoginAndSelf} />
        <Route path="cart" component={Cart} onEnter={grabCart} />
        <Route path="checkout" component={Checkout} onEnter={grabCart} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
