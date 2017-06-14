import React from 'react';
import PropTypes from 'prop-types';

const AuthForm = props => {

  const { name, displayName, handleSubmit, error } = props;

  const signUpData = (
    <div>
      <div>
        <label htmlFor="shippingAddress"><small>Shipping Address</small></label>
        <input name="shippingAddress" type="text" />
      </div>
      <div>
        <label htmlFor="userName"><small>Name</small></label>
        <input name="userName" type="text" />
      </div>
    </div>
  );

  const updateData = (
    <div>

      <div>
        <label htmlFor="isAdmin"><small>Admin Status</small></label>
        <select name="isAdmin">
          <option> true </option>
          <option> false </option>
        </select>
      </div>
    </div>
  )

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="email"><small>Email</small></label>
          <input className="form-control" name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password"><small>Password</small></label>
          <input className="form-control" name="password" type="password" />
        </div>
        {displayName === 'Sign Up' || displayName === 'Update' ? signUpData : null}
        {displayName === 'Update' ? updateData : null}
        <div>
          <button className="btn btn-primary" type="submit">{ displayName }</button>
        </div>
        { error &&  <div> { error.response.data } </div> }
      </form>
      <a href="/auth/google">{ displayName } with Google</a>
    </div>
  );
};

export default AuthForm;

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
};
