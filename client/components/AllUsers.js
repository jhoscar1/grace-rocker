import React from 'react';
import axios from 'axios'


const UserUpdateForm = props => {

  return (

  <div>
    <form onSubmit={props.handleSubmit}>
      <div>
        <label htmlFor="name"><small>Name</small></label>
        <input name="name" type="text" />
      </div>
      <div>
        <label htmlFor="email"><small>Email</small></label>
        <input name="email" type="text" />
      </div>
      <div>
        <label htmlFor="isAdmin"><small>Admin Status</small></label>
        <select name="isAdmin">
          <option>true</option>
          <option>false</option>
        </select>
      </div>
      <div>
        <label htmlFor="shippingAddress"><small>Shipping Address</small></label>
        <input name="shippingAddress" type="text" />
      </div>
      <div>
        <label htmlFor="password"><small>Password</small></label>
        <input name="password" type="password" />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
  )

}


export default class AllUsers extends React.Component {

  constructor() {
    super();
    this.state = {
      users: [],
      updateClicked: false,
      updateUserId: ''
    }
    this.deleteUser = this.deleteUser.bind(this);
    this.handleUpdateClick = this.handleUpdateClick.bind(this);
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
  }

  componentDidMount(){
      axios.get('/api/users')
      .then(res => res.data)
      .then(users => {
        this.setState({users: users})
      })
  }

  deleteUser(id) {
    return () => {
      axios.delete(`/api/users/${id}`)
      .then(res => {
        return (
          axios.get('/api/users')
          .then(res => res.data)
          .then(users => {
            this.setState({users: users})
          })
        )
      })
    }

  }

  handleUpdateClick(id) {
    return () => {
      this.setState({
        updateClicked: true,
        updateUserId: id
      })
    }
  }

  handleUpdateSubmit(event){

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
    .then(res => {
      return (
        axios.get('/api/users')
        .then(res => res.data)
        .then(users => {
          this.setState({users: users})
        })
      )
    })
  }

  render() {
    console.log('hello')
    console.log('allusers', this.state.users)
    console.log('this.state.updateClicked', this.state.updateClicked)

    return (
      <div>

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
                <th>Updated User</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.users.map((user) => {
                  return (
                  <tr key={user.id}>
                    <th>{user.name}</th>
                    <th>{user.email}</th>
                    <th>{(user.isAdmin).toString()}</th>
                    <th>{user.shippingAddress}</th>
                    <th>{user.createdAt}</th>
                    <th><button onClick={user.id && this.deleteUser(user.id)}>X</button></th>
                    <th><button onClick={this.handleUpdateClick(user.id)}>X</button></th>
                  </tr>
                )
                })
              }
            </tbody>
          </table>
        </div>
        {
          this.state.updateClicked ? <UserUpdateForm handleSubmit={this.handleUpdateSubmit} /> : null
        }

      </div>

    )
  }
}
