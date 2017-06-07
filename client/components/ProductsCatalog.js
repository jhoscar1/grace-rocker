import React from 'react';
import { connect } from 'react-redux';

const Catalog = props => {
  const { products } = props;
  return (
    <div>
      {
        products.map(product => {
          return (
          <div className="clearfix productItem">
            <img className="productImage" src={`${product.picture}`} />
            <h2> {product.name} </h2>
            <h4> Stock: {product.price} </h4>
          </div>
        )
      })
      }
    </div>
  )
}

const mapStateToProps = state => {
  return (
    {products: state.productReducer.products}
  )
}

export const CatalogContainer = connect(mapStateToProps)(Catalog)
