import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const Catalog = props => {
  const { products } = props;
  return (
    <div>
      {
        products.map(product => {
          return (
          <div key={product.id} className="clearfix productItem">
            <img className="productImage" src={`${product.picture}`} />
            <h2> <Link to={`/products/${product.id}`}> {product.name} </Link></h2>
            <h4> Price: $ {product.price} </h4>
            <hr />
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
