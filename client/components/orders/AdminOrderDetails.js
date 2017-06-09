import React from 'react';
import { connect } from 'react-redux';
import OrderItem from './OrderItem';


const mapStateToProps = state => {
  return (
    {order: state.orderReducer.currentOrder}
  )
}

export const AdminOrderDetails = connect(mapStateToProps)(OrderItem)
