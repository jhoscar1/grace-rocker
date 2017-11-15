import React from 'react';
import { connect } from 'react-redux';
import ProductItem from './ProductItem'
import UpdateForm from './ProductUpdateForm'
import { deleteSelectedProduct, updateSelectedProduct } from '../../reducer/product'
import AddProduct from './AddProduct';


class ProductAdminPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedProduct: {},
      open: false
    }
  }

  deleteProductCooker = (id) => {
    return () => {
      this.props.deleteProduct(id)
    }
  }

  handleClickCooker = (productInst) => {
    return () => {
      this.setState({
        selectedProduct: productInst
      })
    }
  }

  toggleForm = () => {
    this.setState({
      open: !this.state.open
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const id = this.state.selectedProduct.id
    const name = event.target.name.value;
    const carat = event.target.carat.value;
    const price = event.target.price.value;
    const stock = event.target.stock.value;
    const description = event.target.description.value;
    const body = {}
    if (description) body.description = description
    if (name) body.name = name
    if (carat) body.carat = carat
    if (stock) body.stock = stock
    if (price) body.price = price

    this.props.updateSelectedProduct(id, body)
  }

  render(){
    return (
      <div>
        <div className="allProducts">
          {
         this.state.selectedProduct.id ?
         <UpdateForm
         handleSubmit={this.handleSubmit}
         product={this.state.selectedProduct || ''}
         /> : null
         }
        <h2> Product List </h2>
          <button
            className="btn btn-default"
            onClick={this.toggleForm}
          >
            { !this.state.open ? <span className="glyphicon glyphicon-plus" /> : <span className="glyphicon glyphicon-minus" /> }
              Add Product
          </button>
          {this.state.open ? <AddProduct /> : null}
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Carat</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Description</th>
                <th>Creation Date</th>
                <th>Delete</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.products.map((product) => {
                  return (
                  <ProductItem
                  key={product.id}
                  deleteProduct = {this.deleteProductCooker(product.id)}
                  handleUpdateClick = {this.handleClickCooker(product)}
                  product={product}
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
  updateSelectedProduct: (id, body) => dispatch(updateSelectedProduct(id, body))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductAdminPanel)
