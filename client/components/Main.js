import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout } from '../reducer/user';
import axios from 'axios';

// Component //

const Main = props => {

  const { children, handleClick, loggedIn } = props;

  return (
    <div>
      <nav>
        <h1><Link to={'/home'}>Grace Rocker</Link></h1>
      { loggedIn ?
        <div className="nav-div">
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>Logout</a>
          <Link to="/admin">Admin</Link>
        </div> : <div className="nav-div">
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      }
        <Link to="/cart"> Cart </Link>
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
  loggedIn: !!userReducer.user.id
});

const mapDispatch = dispatch => ({
  handleClick () {
    dispatch(logout());
  }
});

export default connect(mapState, mapDispatch)(Main);
