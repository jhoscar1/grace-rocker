import React from 'react';
import { connect } from 'react-redux';
import ProductItem from './ProductItem'
import UpdateForm from './ProductUpdateForm'
import { deleteSelectedProduct, updateSelectedProduct } from '../../reducer/product'


class ProductAdminPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedProduct: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  deleteProductCooker(id) {
    return () => {
      this.props.deleteProduct(id)
    }
  }

  handleClickCooker(productInst) {
  return () => {
    this.setState({
      selectedProduct: productInst
    })
  }
}

handleSubmit(event){
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
        <h2> Product List </h2>
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
         {
        this.state.selectedProduct.id ?
        <UpdateForm
        handleSubmit={this.handleSubmit}
        product={this.state.selectedProduct || ''}
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
