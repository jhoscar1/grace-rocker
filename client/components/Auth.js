import { connect } from 'react-redux';
import AuthForm from './AuthForm';
import { auth } from '../reducer/user';

const mapLogin = ({ user }) => ({
  name: 'login',
  displayName: 'Login',
  error: user.error
});

const mapSignup = ({ user }) => ({
  name: 'signup',
  displayName: 'Sign Up',
  error: user.error
});

const mapDispatch = dispatch => ({
  handleSubmit (evt) {
    evt.preventDefault();
    const formName = evt.target.name;
    const name = evt.target.username.value;
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    const shippingAddress = evt.target.shippingAddress.value;
    dispatch(auth(email, password, name, shippingAddress, formName));
  }
});

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
