import React from 'react';
import Review from '../review/Review';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { addProduct } from '../../reducer/cart'

class ProductDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      message: ''
    }
    this.addToCart = this.addToCart.bind(this);
  }

  addToCart(evt){
    evt.preventDefault()
    this.props.confirmAdd(this.props.product.id, this.props.activeUser, this.props.activeOrder, evt.target.addQuantity.value);
    this.setState({message: 'Added!'})
  }

  render(){
    const { product } = this.props;
    const { message } = this.state;

    if ( product ){
      return (
        <div className="clearfix">
          <div>
          <img className="productImage" src={`${product.picture}`} />
          <form className="addToCart" onSubmit={this.addToCart}>
            <label htmlFor="addQuantity">Quantity:</label>
            <input name="addQuantity" />
            <button><i className="glyphicon glyphicon-shopping-cart" /> ADD TO CART</button>
            {message ? <div><span> {message} </span></div> : null}
          </form>
          <h2> {product.name} </h2>
          <h4> Price: $ {product.price} </h4>
          <h4> Stock: {product.stock} </h4>
          <h4> Carat: {product.carat} </h4>
          <p> Description: </p>
          <p> {product.description} </p>
          <p> {product.tags} </p>
          </div>
          <hr />
          <div>
            <h3>Reviews</h3><button className="btn btn-default">Add Product Review</button>
            {
              product.reviews && product.reviews.map(review => {
                return <Review key={review.id} review={review} />
              })
            }
          </div>
        </div>
      )
    } else {
      return <div><p> Product not Found </p></div>
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const selectedProduct = state.productReducer.products.find(element => {
    return element.id === +ownProps.params.id
  })
  return ({
    product: selectedProduct,
    activeUser: state.userReducer.user.id,
    activeOrder: state.cartReducer.cart.id
  });
}

const mapDispatchToProps = dispatch => ({
  confirmAdd: (productId, userId, orderId, quantity) => {
    dispatch(addProduct(productId, userId, orderId, quantity))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
