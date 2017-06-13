import React from 'react';
import { connect } from 'react-redux';
import OrderItem from './OrderItem';

const OrderList = ({orders}) => {
  let completedOrders = [];
  if (orders) {
    completedOrders = orders.filter(order => {
        return order.status !== 'created';
    })
  }
  
  return (
    <div>
        <h3>My Order History</h3>
        {completedOrders.map( order => {
            return (<OrderItem
              key={+order.id}
              order={order}
            />)
        })}
        { !completedOrders.length ? <h4>You have not made any purchases yet!</h4> : null}
    </div>
  )
}

const mapStateToProps = state => ({
  orders: state.orderReducer.orders
})

export default connect(mapStateToProps)(OrderList);
