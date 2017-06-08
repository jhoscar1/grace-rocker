import React from 'react';
import { connect } from 'react-redux';
import OrderItem from './OrderItem';

const OrderList = (props) => {
  console.log(props);
  return (
    <div>
        <h3>My Order History</h3>
        {props.orders ? props.orders.map( order => {
            return (<OrderItem
              key={+order.id}
              order={order}
            />)
        }) : null }
    </div>
  )
}

const mapStateToProps = state => ({
  orders: state.orderReducer.orders
})

export default connect(mapStateToProps)(OrderList);
