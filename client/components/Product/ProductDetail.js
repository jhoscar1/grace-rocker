import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const ProductDetail = props => {
  const { product } = props;
  if ( product ){
    return (
      <div className="clearfix">
        <img className="productImage" src={`${product.picture}`} />
        <h2> {product.name} </h2>
        <h4> Price: $ {product.price} </h4>
        <h4> Stock: {product.stock} </h4>
        <h4> Carat: {product.carat} </h4>
        <p> {product.description} </p>
        <p> {product.tags} </p>
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
