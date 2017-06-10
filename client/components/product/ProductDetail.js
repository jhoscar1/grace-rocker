import React, {Component} from 'react';
import Review from '../review/Review';
import { connect } from 'react-redux';
import AddReview from '../review/AddReview';

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
    this.toggleForm = this.toggleForm.bind(this);
  }

  toggleForm() {
    this.setState({
      open: !this.state.open
    })
  }

  render() {
    const { product } = this.props;
    if ( product ){
      return (
        <div className="clearfix">
          <div>
          <img className="productImage" src={`${product.picture}`} />
          <button className="addToCart"> ADD TO CART </button>
          <h2> {product.name} </h2>
          <h4> Price: $ {product.price} </h4>
          <h4> Stock: {product.stock} </h4>
          <h4> Carat: {product.carat} </h4>
          <p> Description: </p>
          <p> {product.description} </p>
          <p> {product.tags} </p>
          </div>
          <hr/>
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
      return null
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const selectedProduct = state.productReducer.products.find(element => {
    return element.id === +ownProps.params.id
  })
  return ({
    product: selectedProduct
  });
}

export default connect(mapStateToProps)(ProductDetail)
