import React from 'react';
import { connect } from 'react-redux';
import ProductItem from './ProductItem'
import UpdateForm from './ProductUpdateForm'
import { deleteSelectedProduct, updateSelectedProduct } from '../../reducer/product'


class ProductAdminPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      updateProductId: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  deleteProduct(id) {
    return () => {
      this.props.deleteProduct(id)
    }
  }

  handleUpdateClick(id) {
  return () => {
    this.setState({
      updateProductId: id
    })
  }
}

handleSubmit(event){
    event.preventDefault();
    const id = this.state.updateProductId
    const name = event.target.name.value;
    const carat = event.target.carat.value;
    const price = event.target.price.value;
    const stock = event.target.stock.value;
    const description = event.target.description.value;
    const body = {name, carat, price, stock, description}
    this.props.updateSelectedProduct(id, body)
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
                this.props.products.map((product) => {
                  return (
                  <ProductItem
                  key={product.id}
                  deleteProduct = {this.deleteProduct(product.id)}
                  handleUpdateClick = {this.handleUpdateClick(product.id)}
                  product={product}
                  />
                )
                })
              }
            </tbody>
          </table>
        </div>
         {
        this.state.updateProductId ?
        <UpdateForm
        handleSubmit={this.handleSubmit}
        /> : null
        }
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
