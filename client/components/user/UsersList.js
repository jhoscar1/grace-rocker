import React from 'react';
import axios from 'axios'
import UserItem from './UserItem'
import AuthForm from '../AuthForm'
import { connect } from 'react-redux';
import { editUser, fetchUsers } from '../../reducer/user';

class UserList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      updateUserId: ''
    }
  }

  deleteUser = (id) => {
    return () => {
      axios.delete(`/api/users/${id}`)
      .then(() => {
        this.props.fetchUsers()
      })
    }
  }

  handleUpdateClick = (id) => {
    return () => {
      this.setState({
        updateUserId: id
      })
    }
  }

  handleUpdateSubmit = (event) => {
    event.preventDefault();

    const id = this.state.updateUserId
    const name = event.target.userName.value;
    const email = event.target.email.value;
    const isAdmin = event.target.isAdmin.value;
    const shippingAddress = event.target.shippingAddress.value;
    const password = event.target.password.value;

    const user = {name, email, isAdmin, shippingAddress, password};
    this.props.editUser(this.state.updateUserId, user);
    this.setState({updateUserId: ''});
  }

  render() {
    return (
      <div>
        <h2> User List </h2>
          {
          this.state.updateUserId ?
          <AuthForm
          name="update"
          displayName="Update"
          handleSubmit={this.handleUpdateSubmit}
          /> : null
          }
        <div className="allUsers">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Administrator Status</th>
                <th>Shipping Address</th>
                <th>Signup Date</th>
                <th>Delete</th>
                <th>Update</th>
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

      </div>

    )
  }
}

const mapStateToProps = state => {
  return {users: state.userReducer.users}
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => {
      dispatch(fetchUsers());
    },
    editUser: (id, user) => {
      dispatch(editUser(id, user));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
