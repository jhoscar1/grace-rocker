import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {updateQuantity} from '../reducer/cart';

class Cart extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cart: this.props.cart,
      warning: -1
    }
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
   }

  handleUpdateSubmit(productId, orderId, userId) {
    return evt => {
    evt.preventDefault()
    const quantityValue = {quantity: +evt.target.quantityValue.value};
    if (isNaN(quantityValue.quantity) || !quantityValue.quantity) {
      this.setState({ warning: productId })
    } else {
      this.setState({ warning: -1 })
      this.props.storeUpdate(productId, orderId, quantityValue, userId)
    }}

  }

  render(){
    const { cart } = this.props
    return (
      <div>
        <div className="row">
          <h3 className="inline"> Shopping Cart </h3>
          <div className="column-sm inline">
            <span> Price </span>
          </div>
          <div className="column-sm inline">
            <span> Quantity </span>
          </div>
        </div>
        <hr />
      {cart.products ? cart.products.map(product => {
        return (
          <div key={product.id}>
            <img className="column-sm product-image" src={`${product.picture}`} />
            <form className="right" onSubmit={this.handleUpdateSubmit(product.id, cart.id, cart.userId)}>
              <input placeholder={`${product.product_order.unit_quantity}`} name="quantityValue"></input>
              {this.state.warning === product.id ? <p>Invalid Input!</p> : null}
              <button type="submit" className="inline"> Update Quantity </button>
            </form>
            <button  className="inline right"> Delete </button>
            <p className="inline"> <Link to={`products/${product.id}`}> {product.name} </Link> </p>
            <p className="inline"> ${product.price} </p>
            <p className="inline"> {product.product_order.unit_quantity} </p>
          </div>
        )
      }) : null }
      </div>
    )}
}

const mapStateToProps = state => ({
  cart: state.cartReducer.cart
})

const mapDispatchToProps = dispatch => ({
  storeUpdate: (productId, orderId, quantity, userId) => dispatch(updateQuantity(productId, orderId, quantity, userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
