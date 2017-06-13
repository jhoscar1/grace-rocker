import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout } from '../reducer/user';
import axios from 'axios';

// Component //

const Main = props => {

  const { children, handleClick, loggedIn, isAdmin, userId } = props;

  return (
    <div>
      <nav>
        <h1><Link to={'/home'}>Grace Rocker</Link></h1>
      { loggedIn ?
        <div className="nav-div">
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>Logout</a>
          { isAdmin ? <Link to="/admin">Admin</Link> : null }
        </div> : <div className="nav-div">
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      }
        <Link to="/cart"> Cart </Link>
        <Link to={`/users/${userId}`}>My Account</Link>
      </nav>
      <hr />
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

const mapState = ({ userReducer }) => ({
  loggedIn: !!userReducer.user.id,
  isAdmin: userReducer.user.isAdmin,
  userId: userReducer.user.id
});

const mapDispatch = dispatch => ({
  handleClick () {
    dispatch(logout());
  }
});

export default connect(mapState, mapDispatch)(Main);
