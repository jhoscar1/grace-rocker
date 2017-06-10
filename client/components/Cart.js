import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { updateQuantity, fetchCart } from '../reducer/cart';
import axios from 'axios';

class Cart extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cart: this.props.cart,
      warning: false
    }
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
    this.handleDeleteCartProd = this.handleDeleteCartProd.bind(this);
   }

  handleUpdateSubmit(productId, orderId, userId) {
    return (evt) => {
      evt.preventDefault();
      const quantityValue = +evt.target.quantityValue.value;
      if(typeof quantityValue !== 'number') {
        this.setState({ warning: true })
      } else {
        this.setState({ warning: false })
        this.props.storeUpdate(productId, orderId, quantityValue, userId)
      }}
  }

  handleDeleteCartProd(orderId, productId) {
    return () => {
      axios.delete(`/api/cart/${orderId}/${productId}`)
      .then( () => {
        this.props.fetchCart(this.props.cart.userId)
      })
    }
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
      {(cart && cart.products) ? cart.products.map(product => {
        return (
          <div key={product.id}>
            <img className="column-sm product-image" src={`${product.picture}`} />
            <form className="right" onSubmit={this.handleUpdateSubmit(product.id, cart.id, cart.userId)}>
              <input placeholder={`${product.product_order.unit_quantity}`} name="quantityValue"></input>
              {this.state.warning ? <p>Invalid Input!</p> : null}
              <button type="submit" className="inline"> Update Quantity </button>
            </form>
            <button onClick={this.handleDeleteCartProd(cart.id, product.id)} className="inline right"> Delete </button>
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
  storeUpdate: (productId, orderId, quantity, userId) => dispatch(updateQuantity(productId, orderId, quantity, userId)),
  fetchCart: userId => dispatch(fetchCart(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
