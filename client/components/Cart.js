import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Cart extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cart: this.props.cart
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
      {cart.products ? cart.products.map(product => {
        return (
          <div key={product.id}>
            <img className="column-sm product-image" src={`${product.picture}`} />
            <button  className="inline right"> Update Quantity </button>
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

export default connect(mapStateToProps)(Cart)
