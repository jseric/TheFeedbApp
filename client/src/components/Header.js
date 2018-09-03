// Import modules/components/methods
import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { Link }             from 'react-router-dom';
import M                    from 'materialize-css';

import Payments from './Payments.js';

import 'materialize-css/dist/js/materialize.min.js';
import './styles/Header.css';

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});
  });

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
      <div>
        <nav>
          <div className="nav-wrapper" >
            <Link to       ={ this.props.auth ? '/surveys' : '/' }
                  className="left brand-logo" >
              TheFeedbApp
            </Link>

            <a href=""
               data-target="mobile-demo"
               className="sidenav-trigger right">
              <i className="material-icons">
                menu
              </i>
            </a>

            <ul className="right hide-on-med-and-down" >
              { this.renderContent() }
            </ul>
          </div>
        </nav>

        <ul className="sidenav header-navbar-mobile"
            id="mobile-demo" >
          { this.renderContent() }
        </ul>
      </div>

    );
  }
}

// Get state from props
function mapStateToProps({ auth }) {
  return { auth };
}

// Export
export default connect(mapStateToProps)(Header);
