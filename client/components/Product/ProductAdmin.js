import React from 'react';
import axios from 'axios'
import { connect } from 'react-redux';
import UserItem from './UserItem'
import AuthForm from './AuthForm'
import { deleteSelectedProduct, updateSelectedProduct } from '../../reducer/product'


class ProductAdminPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      updateUserId: ''
    }
  }


  deleteProduct(id) {
    return () => {
      axios.delete(`/api/users/${id}`)
      .then(() => {
        this.props.fetchProduct()
      })
    }
  }

  render(){
    return (
      <div>
        <div className="allProducts">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Carat</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Description</th>
                <th>Add Date</th>
                <th>Delete Product</th>
                <th>Update Product</th>
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
  )}
}

const mapStateToProps = state => ({
  products: state.productReducer.products
})

const mapDispatchToProps = dispatch => ({
  deleteProduct: id => dispatch(deleteSelectedProduct(id)),
  updateSelectedProduct: (id, body) => dispatch(deleteSelectedProduct(id, body))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductAdminPanel)
