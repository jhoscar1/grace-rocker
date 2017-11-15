import { connect } from 'react-redux';
import AuthForm from './AuthForm';
import { auth } from '../reducer/user';

const mapLogin = ({ userReducer }) => ({
  name: 'login',
  displayName: 'Login',
  error: userReducer.user.error
});

const mapSignup = ({ userReducer }) => ({
  name: 'signup',
  displayName: 'Sign Up',
  error: userReducer.user.error
});

const mapDispatch = dispatch => ({
  handleSubmit (evt) {
    evt.preventDefault();
    const formName = evt.target.name;
    const userName = evt.target.userName && evt.target.userName.value || '';
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    dispatch(auth(email, password, formName, userName));
  }
});

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
