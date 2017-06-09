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

  componentWillMount(){
    console.log('about to mount')
  }
  //
  // componentDidMount () {
  //   this.unsubscribe = store.subscribe( () => this.setState(store.getState()))
  //   console.log('hello')
  // // }
  //
  // componentWillUnmount() {
  //   this.unsubscribe()
  // }

  handleUpdateClick(orderId) {
    console.log('hi from handleUpdateClick')
    console.log('orderId is', orderId);
    console.log('state is', this.state)
    return () => {
      this.setState({
        orderToUpdateId: orderId,
      })
      console.log('hello')
    }
  }

  handleStatusUpdate(event) {

    event.preventDefault();
    console.log('status update hit')
    const id = this.state.orderToUpdateId;
    const status = event.target.orderStatus.value;
    axios.put(`/api/orders/${this.state.orderToUpdateId}`, {
      status: status
    })
    .then(() => {
        return this.props.fetchAllOrders()
    })
  }

  handleSortRequest(event) {
    event.preventDefault();
    console.log('sort request hit');
    const sortOrder = event.target.sortOrder.value;
    axios.put(`/api/orders/sorted/${sortedOrder}`)
    .then(() => {
      return this.props.fetchAllOrders()
    })

  }


    // event.preventDefault()
    // api call to update the order....
    // orderToUpdateId set to ''
    // dispatch the thing to get all the orders again

  render () {
    console.log('hi');
    // console.log(this.state.orderReducer.orders)
    return (
      <div>
        <h3>All Orders</h3>
        <div>
            <div>
              <form onSubmit={this.handleSortRequest}>
                <div>
                  <label htmlFor="sortRequest"><small>Sort by Category</small></label>
                  <select name="sortRequest">
                    <option>Order no.</option>
                    <option>Purchase Date</option>
                    <option>Total Cost</option>
                    <option>Status</option>
                  </select>
                </div>
                <button type="submit">Submit</button>
              </form>
            </div>
        </div>
        <div className="AdminOrderView">
          <table className="table">
            <thead>
              <tr>
                <th>Order No.</th>
                <th>Order Placed</th>
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
// Use the connect function here....

export const AdminOrderList = connect(mapStateToProps, mapDispatchToProps)(AdminOrdersView)
