import React from 'react';

const OrderItem = props => {
  const { order } = props;
  console.log(order.products[0]);
  return (
    <div>
      <div className="order-header">
        <span className="order-date">{order.purchase_date}</span>
        <span className="order-status">{order.status}</span>
        <span className="order-id">{order.id}</span>
      </div>
      <div>
        {order.products ? order.products.map( product => (
          <div>
            <img className="product-image" src={`${product.picture}`} />
            <p className="product-name">{product.name}</p>
            <p className="product-quantity">{product.product_order.unit_quantity}</p>
            <p className="product-price">{product.product_order.unit_price}</p>
          </div>
        )) : null
        }
      </div>
      <div className="order-cost">COME BACK TO THIS LATA</div>
    </div>
  )
}

export default OrderItem;
