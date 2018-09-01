// Import modules/components/methods
import React, { Component } from 'react';
import StripeCheckout       from 'react-stripe-checkout';
import { connect }          from 'react-redux';

import * as actions from '../actions';

// Component class Payments
class Payments extends Component {
  render() {
    return (
      <StripeCheckout name="TheFeedbApp"
                      description="$5.00 for 5 survey credits"
                      amount={ 500 /* 5$ = 500 cents */ }
                      token={ token => this.props.handleToken(token) }
                      stripeKey={ process.env.REACT_APP_STRIPE_KEY } >
        <button className="btn" >
          Add Credits
        </button>
      </StripeCheckout>
    );
  }
}

// Export
export default connect(null, actions)(Payments);
