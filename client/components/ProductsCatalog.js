import React from 'react';
import { connect } from 'react-redux';

const Catalog = props => {
  const { products } = props;
  return (
    <div>
      {
        products.map(product => {
          return (
          <div>
            <img src="{product.image}" />
            <h2> {product.name} </h2>
            <h4> {product.price} </h4>
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
