import React from 'react';
import { Link } from 'react-router';

const OrderItem = props => {
  const { order } = props;
  let totalCost = 0;
  return (
    <div>
      <div className="order-header">
        <p className="order-date">Date: {order.purchase_date}</p>
        <p className="order-status">Status: {order.status}</p>
        <p className="order-id">Order #: {order.id}</p>
      </div>
      <div>
        {
          order.products ? order.products.map( product => (
          <div key={product.id}>
            { (() => {
              totalCost += product.product_order.subtotal
            })()  }
            <img className="product-image" src={`${product.picture}`} />
            <h3 className="product-name"><Link to={`products/${product.id}`}>{product.name}</Link></h3>
            <p className="product-quantity">Quantity: {product.product_order.unit_quantity}</p>
            <p className="product-price">Price: {product.product_order.unit_price}
            </p>
            <h4 className="product-subtotal">Subtotal: {product.product_order.subtotal}</h4>
          </div>
        )) : null
        }
      </div>
      {/* TODO: Refactor totalCost hook on Order Model*/}
      <div className="order-cost"><h2>Total Cost: ${totalCost}</h2></div>
    </div>
  )
}

export default OrderItem;
