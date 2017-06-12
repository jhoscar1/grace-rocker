import React from 'react';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <div className="row">
          <p>Review Order</p>
        </div>
        <hr />
          {(cart && cart.products) ? cart.products.map(product => {
            return (
              <div key={product.id}>
                <img className="column-sm product-image" src={`${product.picture}`} />
                <p className="inline"> <Link to={`products/${product.id}`}> {product.name} </Link> </p>
                <p className="inline"> ${product.price} </p>
                <p className="inline"> {product.product_order.unit_quantity} </p>
              </div>
            )
          }) : null }
      </div>
    )
  }
}

export default Checkout;
