import React from 'react'
import { connect } from 'react-redux';
import { fetchCart } from '../reducer/cart';
import { Link, browserHistory } from 'react-router';
import { processOrder } from '../reducer/orders';
import axios from 'axios';

import StripeCheckout from 'react-stripe-checkout';

export default class TakeMoney extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tokenProp: '',
    }
    this.onToken = this.onToken.bind(this)
  }


  onToken (token) {
    this.props.submit();
  }


  render() {

    return (
      <StripeCheckout
        token={this.onToken}
        stripeKey='pk_test_iE1e8sGMYnGlU3djMDcpb1Nh'
      />
    )
  }
}
