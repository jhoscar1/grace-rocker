import React, {Component} from 'react';
import { Prompt } from 'react-router';
import { connect } from 'react-redux';
import EditUser from './EditUser';
import OrderList from '../orders/OrderList';

class UserDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    toggleForm = () => {
        this.setState({
            open: !this.state.open
        })
    }

    render() {
        const { user, children, orders } = this.props;
        return (
            <div className="user-page">
                <h2>{user.name}</h2>
                <h4>Email: {user.email}</h4>
                {user.shippingAddress ? <h4>Shipping Address: {user.shippingAddress}</h4> : null}
                <button
                className="btn btn-default"
                onClick={this.toggleForm}
                >
                { !this.state.open ? <span className="glyphicon glyphicon-plus" /> : <span className="glyphicon glyphicon-minus" /> }
                Edit User
                </button>
                {this.state.open ? <EditUser user={user} /> : null}
                <hr />
                {orders.length ? <OrderList /> : null}
            </div>
        )
    }
}

const mapState = ({userReducer, orderReducer}) => {
    return {
        user: userReducer.user,
        orders: orderReducer.orders
    }
}

export default connect(mapState)(UserDetail);
