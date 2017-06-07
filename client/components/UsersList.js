import React from 'react';
import axios from 'axios'
import UserItem from './UserItem'
import AuthForm from './AuthForm'
import { connect } from 'react-redux';
import { fetchUsers } from '../reducer/user';

class UserList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      updateUserId: ''
    }
    this.deleteUser = this.deleteUser.bind(this);
    this.handleUpdateClick = this.handleUpdateClick.bind(this);
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
  }

  deleteUser(id) {
    return () => {
      axios.delete(`/api/users/${id}`)
      .then(() => {
        this.props.fetchUsers()
      })
    }
  }

  handleUpdateClick(id) {
    return () => {
      this.setState({
        updateUserId: id
      })
    }
  }

  handleUpdateSubmit(event){
    event.preventDefault();

    const id = this.state.updateUserId
    const name = event.target.name.value;
    const email = event.target.email.value;
    const isAdmin = event.target.isAdmin.value;
    const shippingAddress = event.target.shippingAddress.value;
    const password = event.target.password.value;

    axios.put(`api/users/${id}`, {
      name: name,
      email: email,
      isAdmin: isAdmin,
      shippingAddress: shippingAddress,
      password: password
    })
    .then(() => {
      return this.props.fetchUsers()
    })
  }

  render() {
    return (
      <div>
        <h2> Users List </h2>
        <div className="allUsers">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Administrator Status</th>
                <th>Shipping Address</th>
                <th>Signup Date</th>
                <th>Delete User</th>
                <th>Update User</th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.users.map((user) => {
                  return (
                  <UserItem
                  key={user.id}
                  deleteUser = {this.deleteUser(user.id)}
                  handleUpdateClick = {this.handleUpdateClick(user.id)}
                  user={user}
                  />
                )
                })
              }
            </tbody>
          </table>
        </div>
        {
        this.state.updateUserId ?
        <AuthForm
        name="update"
        displayName="Update"
        handleSubmit={this.handleUpdateSubmit}
        /> : null
        }
      </div>

    )
  }
}

const mapStateToProps = state => {
  return {users: state.userReducer.users}
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: function() {
      dispatch(fetchUsers())
    }
  }
}

export const UsersListContainer = connect(mapStateToProps, mapDispatchToProps)(UserList);
