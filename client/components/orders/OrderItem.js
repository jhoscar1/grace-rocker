import React from 'react';
import { Link } from 'react-router';

const OrderItem = props => {
  const { order } = props;

  let totalCost = 0;
  return (
    <div className="thumbnail">
      <div className="order-header">
        <p className="order-date">Date: {order.purchase_date}</p>
        <p className="order-status">Status: {order.status}</p>
        <p className="order-id">Order {order.id}</p>
      </div>
      <div className="row">
        {
          order.products ? order.products.map( product => (
          <div key={product.id} className="clearfix productItem">
            { (() => {
              totalCost += product.product_order.subtotal
            })()  }
            <div className="col-sm-5 jumbotron needSpaceLeft">
              <img className="needSpaceRight productImage clearfix" src={`${product.picture}`} />
              <div>
                <h2 className="product-name"><Link to={`products/${product.id}`}>{product.name}</Link></h2>
                <p className="product-quantity">Quantity: {product.product_order.unit_quantity}</p>
                <p className="product-price">Price: $ {product.product_order.unit_price}
                </p>
                <p className="product-subtotal">Subtotal: ${product.product_order.subtotal}</p>
              </div>
            </div>
          </div>
        )) : null
        }
      </div>
      <div className="needSpaceLeft"><h1>Total Cost: ${totalCost}</h1></div>
    </div>
  )
}

export default OrderItem;






// <div className="col-sm-6 col-md-4">
//   <div className="thumbnail">
//     <img className="productImage clearfix" src={`${product.picture}`} />
//     <div className="caption">
//       <h3> <Link to={`products/${product.id}`}>{product.name}</Link> </h3>
//       <p className="product-quantity">Quantity: {product.product_order.unit_quantity}</p>
//       <p className="product-price">Price: $ {product.product_order.unit_price}
//       </p>
//       <h4 className="product-subtotal">Subtotal: $ {product.product_order.subtotal}</h4>
//     </div>
//   </div>
// </div>
