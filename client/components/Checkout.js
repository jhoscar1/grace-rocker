import React from 'react';
import { connect } from 'react-redux';
import { fetchCart } from '../reducer/cart';
import { Link, browserHistory } from 'react-router';
import { processOrder } from '../reducer/orders';
import axios from 'axios';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.handleSuccessfulSubmit = this.handleSuccessfulSubmit.bind(this);
  }

  handleSuccessfulSubmit(orderId) {
    const { cart } = this.props
    let body = Object.assign({}, cart, {status: 'processing'}, {email: this.props.user.email});
    this.props.processTheOrder(orderId, body)
    .then(() => {
      browserHistory.push("/home")
    });
  }


  onSubmit(){
    const { cart } = this.props
    if (!cart.products.length){
      this.setState({message: "You have no products in your cart."})
    } else {
      this.handleSuccessfulSubmit(cart.id)
    }
  }

  render() {
    const { cart, user } = this.props
    return(

      <div>
        <div className="row">
          <p>Review Order</p>
        </div>
        <hr />
        {
          cart.error && <div> {cart.error.response.data} </div>
        }
        <hr />
        <div className = "left">
          {(cart && cart.products) ? cart.products.map(product => {
            return (
              <div className="clearfix productItem" key={product.id}>
                <img className="productImage column-sm" src={`${product.picture}`} />
                <p className="inline"> <Link to={`products/${product.id}`}> {product.name} </Link> </p>
                <p className="inline"> ${product.price} </p>
                <p className="inline"> {product.product_order.unit_quantity} </p>
              </div>
            )
          }) : null }
        </div>
        <div>
          <form className="borderedForm right">
              <h2> Order Summary </h2>
              <h3> Total Cost: $1000 </h3>
              <h4> Change Order Details: </h4>
              <label htmlFor="userName" >Name: </label>
              <input defaultValue={`${user.name || '' }`} name="userName"></input>
              <label htmlFor="shippingAddress" >Shipping Address: </label>
              <input defaultValue={`${user.shippingAddress || '' }`} name="shippingAddress"></input>
            </form>
        </div>
          <div className="clearfix right">
          <button onClick={this.onSubmit} className="btn-success inline"> Submit Order </button>
          <button className="btn-default inline"> <Link to="/cart"> Go Back </Link> </button>
            {this.state.message ? <p>{ this.state.message }!</p> : null}
          </div>
      </div>

    )
  }
}


const mapStateToProps = state => ({
  cart: state.cartReducer.cart,
  user: state.userReducer.user
})

const mapDispatchToProps = dispatch => ({
  fetchCart: userId => dispatch(fetchCart(userId)),
  processTheOrder: (orderId, body) => dispatch(processOrder(orderId, body))
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
