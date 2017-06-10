import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import AdminOrderItem from './AdminOrderItem';
import UpdateOrderForm from './UpdateOrderForm';
import { fetchAllOrders, fetchSortedOrders } from '../../reducer/orders';


class AdminOrdersView extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      orderToUpdateId: ''
    }
    this.handleUpdateClick = this.handleUpdateClick.bind(this);
    this.handleStatusUpdate = this.handleStatusUpdate.bind(this)
  }

  handleUpdateClick(orderId) {
    return () => {
      this.setState({
        orderToUpdateId: orderId,
      })
    }
  }

  handleStatusUpdate(event) {

    event.preventDefault();
    const id = this.state.orderToUpdateId;
    const status = event.target.orderStatus.value;
    axios.put(`/api/orders/${this.state.orderToUpdateId}`, {
      status: status
    })
    .then(() => {
        return this.props.fetchAllOrders()
    })
  }

  render () {
    return (
      <div>
        <h3>All Orders</h3>
        <div className="AdminOrderView">
          <table className="table">
            <thead>
              <tr>
                <th>Order No.</th>
                <th>Order Date</th>
                <th>Total Cost</th>
                <th>View Order Details</th>
                <th>Status</th>
                <th>Edit Status</th>
              </tr>
              {this.props.orders.map(order => {
                return (
                  <AdminOrderItem
                    key={+order.id}
                    item={order}
                    handleUpdateClick={this.handleUpdateClick(order.id)}
                    />
                )
              })
            }
            </thead>
          </table>
        </div>
        {this.state.orderToUpdateId ? <UpdateOrderForm orderNo={this.state.orderToUpdateId} handleSubmit={this.handleStatusUpdate}/> : null}
      </div>
    )
  }
}
//
const mapStateToProps = state => {
  return {orders: state.orderReducer.orders}
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllOrders: function () {
      dispatch(fetchAllOrders())
    },
    fetchSortedOrders: function () {
      dispatch(fetchSortedOrders(displayOrder))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrdersView)
