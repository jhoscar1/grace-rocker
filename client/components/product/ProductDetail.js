import React from 'react';
import Review from '../review/Review';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const ProductDetail = props => {
  const { product } = props;
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
          <h3>Reviews</h3><button className="btn btn-default">Add Product Review</button>
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

const mapStateToProps = (state, ownProps) => {
  const selectedProduct = state.productReducer.products.find(element => {
    return element.id === +ownProps.params.id
  })
  return ({
    product: selectedProduct
  });
}

export default connect(mapStateToProps)(ProductDetail)
