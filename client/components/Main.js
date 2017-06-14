import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout } from '../reducer/user';
import axios from 'axios';

// Component //

class Main extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      showDropdown: false
    }
    this.exposeDropDown = this.exposeDropDown.bind(this);
  }

  exposeDropDown(){
    console.log(this.state.showDropdown)
    this.setState({
      showDropdown: !this.state.showDropdown
    })
  }

  render(){
    const { children, handleClick, loggedIn, isAdmin, cart, userId } = this.props;
    return (
      <div>
        <nav className="row flex relative">
          <h2 className="left bottom"> GRACE ROCKER </h2>
          <Link className="left" to={'/home'}><img className="logo" src="/assets/gracerocker.png"/></Link>
        <div className="col-6-sm col-4-md iconContainer navbar-right relative">
          { loggedIn ?
            <div>
              <button className="inline navGlyph glyphicon glyphicon-user" id="accountPage"  onClick={this.exposeDropDown} />
              { this.state.showDropdown ? <div className="dropdownContent">
                <a><Link style={{ textDecoration: 'none'}} className="" id="home" title="Main Page" to="/home">Home</Link></a>
                <a style={{ textDecoration: 'none'}} className="" id="signout" title="Log out" href="#" onClick={handleClick}>Logout</a>
                { isAdmin ? <a><Link style={{ textDecoration: 'none'}} className="right" to="/admin">Admin</Link></a> : null }
                <Link style={{ textDecoration: 'none'}} title="Your Userpage" className="" to={`/users/${userId}`}>Your Account</Link>
              </div> : null }
            </div> : <div className="nav-div right">
              <Link style={{ textDecoration: 'none'}} to="/login">Login</Link>
              <Link style={{ textDecoration: 'none'}} to="/signup">Sign Up</Link>
            </div>
          }

              <Link title="Your Cart" to="/cart"><span id="shoppingCart" className="inline navGlyph glyphicon glyphicon-shopping-cart"><p className="left shoppingCartCount">{cart.products ? cart.products.length : 0 }</p></span></Link>
            </div>
        </nav>
        { children }
      </div>
    );
  };
}

Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired
};

// Container //

const mapState = ({ userReducer, cartReducer}) => ({
  loggedIn: !!userReducer.user.id,
  isAdmin: userReducer.user.isAdmin,
  cart: cartReducer.cart,
  userId: userReducer.user.id
});

const mapDispatch = dispatch => ({
  handleClick () {
    dispatch(logout());
  }
});

export default connect(mapState, mapDispatch)(Main);
