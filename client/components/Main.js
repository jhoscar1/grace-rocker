import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout } from '../reducer/user';
import axios from 'axios';

class Main extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      showDropdown: false,
      showUserDropdown: false
    }
  }

  exposeDropdown = () => {
    this.setState({
      showDropdown: !this.state.showDropdown
    })
  }

  exposeOtherDropdown = () => {
    this.setState({
      showUserDropdown: !this.state.showUserDropdown
    })
  }

  render(){
    const { children, handleClick, loggedIn, isAdmin, cart, userId } = this.props;
    
    return (
      <div>
        <nav className="row flex relative">
          <h2 className="left bottom"> GRACE ROCKER </h2>
          <Link className="left" to={'/home'}><img className="logo" src="/assets/gracerocker.png"/></Link>
          <div>
          { loggedIn ?
            <div>
              <button className="inline navGlyph glyphicon glyphicon-user" id="accountPage"  onClick={this.exposeDropdown} />
              { this.state.showDropdown ?
                <div className="dropdownContent">
                  <a><Link style={{ textDecoration: 'none'}} className="" id="home" title="Main Page" to="/home">Home</Link></a>
                  <a style={{ textDecoration: 'none'}} className="" id="signout" title="Log out" href="#" onClick={handleClick}>Logout</a>
                  { isAdmin ? <a><Link style={{ textDecoration: 'none'}} className="right" to="/admin">Admin</Link></a> : null }
                  <Link style={{ textDecoration: 'none'}} title="Your Userpage" className="" to={`/users/${userId}`}>Your Account</Link>
                </div> : null }
              </div> :
            <div>
              <button className="inline navGlyph glyphicon glyphicon-user" id="accountPage" onClick={this.exposeOtherDropdown} />
              {this.state.showUserDropdown ?
              <div className="dropdownContent">
                  <a><Link style={{ textDecoration: 'none'}} className="" id="home" title="Login" to="/login">Login</Link></a>
                  <a><Link style={{ textDecoration: 'none'}} className="" id="home" title="Sign Up" to="/signup">Sign Up</Link></a>
              </div>
                : null
              }
              </div>
            }
            </div>
              <Link title="Your Cart" to="/cart"><span id="shoppingCart" className="inline navGlyph glyphicon glyphicon-shopping-cart"><p className="left shoppingCartCount">{cart.products ? cart.products.length : 0 }</p></span></Link>
        </nav>
        { children }
      </div>
    );
  }
}

Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired
};

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
