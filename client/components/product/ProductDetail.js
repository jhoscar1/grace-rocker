import React, {Component} from 'react';
import Review from '../review/Review';
import { connect } from 'react-redux';
import AddReview from '../review/AddReview';
import { addProduct, updateQuantity, fetchCart } from '../../reducer/cart';

class ProductDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      message: ''
    }
  }

  toggleForm = () => {
    this.setState({
      open: !this.state.open
    })
  }

  checkCart = (event) => {
    event.preventDefault()
    const orderQuantity = +event.target.addQuantity.value
    this.props.fetchCart()
    this.validatePurchase(orderQuantity)
  }

  validatePurchase(orderQuantity){
    const order = this.props.activeOrder.products ? this.props.activeOrder.products.filter(product => this.props.product.id === product.id) : [];

    if (isNaN(orderQuantity) || orderQuantity < 1){
      this.setState({message: 'Please enter a number greater than zero.'})
    } else if (order.length) {
      const newQuantity = orderQuantity + +order[0].product_order.unit_quantity
      this.props.updateQuantity(this.props.activeOrder.id, this.props.product.id, newQuantity, this.props.activeUser);
      this.setState({message: 'Product already in cart. Quantity updated!'})
    } else {
      this.props.confirmAdd(this.props.activeOrder.id, this.props.product.id, orderQuantity, this.props.activeUser);
      this.setState({message: 'Added!'})
    }
  }

  render(){
    let { product } = this.props;
    let { message } = this.state;

    if ( product ){
      return (
        <div className="clearfix">
          <div>
          { product.stock > 0 ?
            <img className="productImage" src={`${product.picture}`} />
            :
            <img className="productImage" src="/out-of-stock-label.png" />
          }
          <form className="addToCart" onSubmit={this.checkCart}>
            <label htmlFor="addQuantity">Quantity:</label>
            <input name="addQuantity" />
            <button disabled={product.stock > 0 ? false : true}><i className="glyphicon glyphicon-shopping-cart" /> ADD TO CART</button>
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
            <h3>Reviews</h3>
            <button
              className="btn btn-default"
              onClick={this.toggleForm}
            >
            { !this.state.open ? <span className="glyphicon glyphicon-plus" /> : <span className="glyphicon glyphicon-minus" /> }
              Add Product Review
            </button>
            {this.state.open ? <AddReview productId={product.id} /> : null}
            {product.reviews && product.reviews.map(review => {
              return <Review key={review.id} review={review} />
            })}
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
    activeOrder: state.cartReducer.cart
  });
}

const mapDispatchToProps = dispatch => ({
  fetchCart: () => dispatch(fetchCart()),
  confirmAdd: (orderId, productId, quantity, userId) => {
    dispatch(addProduct(orderId, productId, quantity, userId))
  },
  updateQuantity: (orderId, productId, quantity, userId) => {
    dispatch(updateQuantity(orderId, productId, quantity, userId))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
