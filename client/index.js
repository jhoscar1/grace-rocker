import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import store from './store';
import { Main, Login, Signup, UserHome, UsersListContainer } from './components';
import { me, fetchUsers } from './reducer/user';

const whoAmI = store.dispatch(me());
const grabUsers = store.dispatch(fetchUsers());

const requireLogin = (nextRouterState, replace, next) =>
  whoAmI
    .then(() => {
      const { user } = store.getState();
      if (!user.id) replace('/login');
      next();
    })
    .catch(err => console.log(err));


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={Login} />
        <Route path="userslist" component={UsersListContainer} onEnter={grabUsers}/>
        <Route path="login" component={Login} />
        <Route path="signup" component={Signup} />
        <Route onEnter={requireLogin}>
          <Route path="home" component={UserHome} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
