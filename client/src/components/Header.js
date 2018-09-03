// Import modules/components/methods
import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { Link }             from 'react-router-dom';

import Payments from './Payments.js';

// Component class Header
class Header extends Component {

  renderContent() {
    switch (this.props.auth) {
      // Unknown
      case null:
        return;

      // User not logged in
      case false:
        return (
          <li>
            <a href="/auth/google" >
              Login With Google
            </a>
          </li>
        );

      // User logged in
      default:
        return [
          <li key="0" >
            <Payments />
          </li>,

          <li key="1"
              style={{
                margin: '0 10px'
              }} >
            Credits: { this.props.auth.credits }
          </li>,

          <li key="2" >
            <a href="/api/logout" >
              Logout
            </a>
          </li>
        ];
    }
  }

  render() {
    return(
      <nav>
        <div className="nav-wrapper" >
          <Link to       ={ this.props.auth ? '/surveys' : '/' }
                className="left brand-logo" >
            TheFeedbApp
          </Link>

          <ul className="right" >
            { this.renderContent() }
          </ul>
        </div>
      </nav>
    );
  }
}

// Get state from props
function mapStateToProps({ auth }) {
  return { auth };
}

// Export
export default connect(mapStateToProps)(Header);
