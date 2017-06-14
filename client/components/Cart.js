import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
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
    this.handleCartCheckout = this.handleCartCheckout.bind(this);
   }

  handleUpdateSubmit(productId, orderId, userId) {
    return (evt) => {
      evt.preventDefault();
      const quantityValue = +evt.target.quantityValue.value;
      if(typeof quantityValue !== 'number') {
        this.setState({ warning: true })
      } else {
        this.setState({ warning: false })
        this.props.storeUpdate(orderId, productId, quantityValue, userId)
      }}
  }

  handleDeleteCartProd(orderId, productId) {
    return () => {
      axios.delete(`/api/cart/${orderId}/${productId}`)
      .then( () => {
        this.props.fetchCart()
      })
    }
  }

  handleCartCheckout() {
    return () => {
      browserHistory.push('/checkout')
    };
  }

  render(){
    const { cart } = this.props
    return (
      <div>
        <div className="row">
          <h3 className="inline needSpaceLeft"> Shopping Cart </h3>
            <div className="column-sm inline needSpaceLeft">
              <span> <h4 className="inline">Name</h4> </span>
            </div>
          <div className="column-sm inline needSpaceLeft">
            <span> <h4 className="inline">Price</h4> </span>
          </div>
          <div className="column-sm inline needSpaceLeft">
            <span> <h4 className="inline">Quantity</h4> </span>
          </div>
          <div>
            <button className="right btn-success needSpaceRight" onClick={this.handleCartCheckout()}>
              Checkout
            </button>
          </div>
        </div>
        <hr />
      {(cart && cart.products) ? cart.products.map(product => {
        return (
          <div className="clearfix productItem jumbotron" key={product.id}>
            <img className="column-sm productImage needSpaceLeft" src={`${product.picture}`} />
            <form className="right" onSubmit={this.handleUpdateSubmit(product.id, cart.id, cart.userId)}>
              <input placeholder={`${product.product_order.unit_quantity}`} name="quantityValue"></input>
              {this.state.warning ? <p>Invalid Input!</p> : null}
              <button type="submit" className="inline btn-default needSpaceRight"> Update Quantity </button>
            </form>
            <button onClick={this.handleDeleteCartProd(cart.id, product.id)} className="inline right btn-danger"> Delete </button>
            <p className="inline needTinySpaceLeft"> <Link to={`products/${product.id}`}> {product.name} </Link> </p>
            <p className="inline needTinySpaceLeft"> ${product.price} </p>
            <p className="inline needSpaceLeft"> {product.product_order.unit_quantity} </p>
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
  storeUpdate: (orderId, productId, quantity, userId) => dispatch(updateQuantity(orderId, productId, quantity, userId)),
  fetchCart: () => dispatch(fetchCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
