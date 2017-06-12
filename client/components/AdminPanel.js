import React from 'react';
import { UsersList, ProductsList} from './'
import {Link} from 'react-router';

export default (props) => {

  return (
    <div>
      <ul className="nav nav-tabs">
        <li><Link to="/admin/users" activeClass="active">Users</Link></li>
        <li><Link to="/admin/orders" activeClass="active">Orders</Link></li>
        <li><Link to="/admin/products" activeClass="active">Products</Link></li>
      </ul>
      {props.children && props.children}
    </div>
  )
}
