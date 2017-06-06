import React from 'react';
import { connect } from 'react-redux';

export default (props) => {
  return (
    <div>
        <h3>My Order History</h3>
        {props.orders && props.orders.map( order => (
          <div>
            <div className="order-header">
              <div className="order-date"></div>
              <div className="order-id"></div>
            </div>
            <div>
              {order.products.map( product => (
                <div className="product-row">
                  <div className="product-image"></div>
                  <div className="product-name"></div>
                  <div className="product-price"></div>
                  <div className="product-quantity"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  )
}
