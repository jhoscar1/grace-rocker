import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout } from '../reducer/user';
import axios from 'axios';

// Component //

const Main = props => {

  const { children, handleClick, loggedIn, isAdmin, cart } = props;

  return (
    <div>
      <nav className="row flex relative navbarContainer">
        <h2 className="left bottom"> GRACE ROCKER </h2>
        <Link className="left" to={'/home'}><img className="logo" src="/assets/gracerocker.png"/></Link>
      <div className="col-6-sm col-4-md iconContainer relative">
        { loggedIn ?
          <div>
            <Link className="right navGlyph glyphicon glyphicon-home" id="home" title="Main Page" to="/home"></Link>
            <a className="right navGlyph glyphicon glyphicon-log-out" id="signout" title="Log out" href="#" onClick={handleClick}></a>
            { isAdmin ? <Link className="right" to="/admin">Admin</Link> : null }
          </div> : <div className="nav-div right">
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        }

            <Link title="Your Cart" to="/cart"><span id="shoppingCart" className="inline navGlyph glyphicon glyphicon-shopping-cart"><p className="left shoppingCartCount">{cart.products ? cart.products.length : 0 }</p></span></Link>
          </div>
      </nav>
      { children }
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired
};

// Container //

const mapState = ({ userReducer, cartReducer}) => ({
  loggedIn: !!userReducer.user.id,
  isAdmin: userReducer.user.isAdmin,
  cart: cartReducer.cart
});

const mapDispatch = dispatch => ({
  handleClick () {
    dispatch(logout());
  }
});

export default connect(mapState, mapDispatch)(Main);
