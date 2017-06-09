import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Catalog extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      searchInput: 'aaa'
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({searchInput: event.target.value})
  }

  render(){
    const { products } = this.props;
    return (
      <div>
      <label htmlFor="search">Search by Tags</label>
      <input value={this.state.searchInput} name="search" onChange={this.handleChange}></input>
        {
          products.map(product => {
            return product.tags.toLowerCase().includes(this.state.searchInput.toLowerCase()) ? (
              <div key={product.id} className="clearfix productItem">
                <img className="productImage" src={`${product.picture}`} />
                <h2> <Link to={`/products/${product.id}`}> {product.name} </Link></h2>
                <h4> Price: $ {product.price} </h4>
                <hr />
              </div>
            ) : null
          })
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return (
    {products: state.productReducer.products}
  )
}

export const CatalogContainer = connect(mapStateToProps)(Catalog)
