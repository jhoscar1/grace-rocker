import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';

class Catalog extends React.Component {

  constructor(props){
    super(props);
    //checkedObj controls the tick boxes on each checkbox input. basically, when it is deleted, all boxes untick.
    //selectedCategories controls which boxes are ticked.
    this.state = {
      searchInput: '',
      selectedCategories: [],
      checkedObj: {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleTick = this.handleTick.bind(this);
    this.resetTags = this.resetTags.bind(this);
  }

  handleChange(event){
    this.setState({searchInput: event.target.value})
  }

  //this function constructs a set of all agglomerated tags from the products array
  tagsGet(){
    let temp = [], obj = {};
    this.props.products.forEach(product => {
      product.tagsArray.forEach(tag => {
        temp.push(tag)
      })
    })
    temp.forEach(tag => {
      if (obj[tag]) obj[tag]++
      else obj[tag] = 1;
    })
    temp = [];
    for (var category in obj){temp.push({name: category, quantity: obj[category]})}
    return temp
  }

  resetTags(evt){
    evt.preventDefault()
    this.setState({
      checkedObj: {},
    })
  }

  //ontick: if checked, add it to the checkedObj to ensure it remains checked and include it in categories to search for. if unchecked, remove it from the checkedObj and the active categories array.
  handleTick(event){
    const category = event.target.value
    if (event.target.checked){
      let newCheckedValObj = {};
      newCheckedValObj[category] = true;
      this.setState({
        checkedObj: Object.assign({}, this.state.checkedObj, newCheckedValObj),
        selectedCategories: this.state.selectedCategories.concat(category)
      })
    } else {
      let tempArr = this.state.selectedCategories.slice();
      let tempObj = this.state.checkedObj.slice();
      tempArr.splice(this.state.selectedCategories.indexOf(category), 1)
      delete tempObj[category]
      this.setState({
        checkedObj: tempObj,
        selectedCategories: tempArr
      })
    }
 }

 //just returns some checkbox html
  createCheckbox(value){
    return <input checked={this.state.checkedObj[value]} className="check" type="checkbox" onChange={this.handleTick} value={value}></input>
  }


//the big ternary on products.map is the search logic. it allows us to search by name and category simultaneously.
//when selectedCategories is empty, no categories are filtered. as soon as it contains one value, we filter our selecton down to that category.
  render(){
    const { products } = this.props, { searchInput, selectedCategories } = this.state
    return (
      <div>
      <label htmlFor="search">Search by Name</label>
      <input value={searchInput} placeholder="Search..." name="search" onChange={this.handleChange}></input>
      <hr />
      <div>
        <form className="inline">
          <label> Search by Category </label>
      {
        this.tagsGet().map(tag => {
          return (
            <div key={tag.name}>
              <label> {tag.name} : {tag.quantity}</label>
              {this.createCheckbox(tag.name)}
            </div>
          )
        })
      }
        <button className="right" onClick={this.resetTags}>Reset Filter</button>
      </form>
      <hr />
    </div>
        {
          products.map(product => {
            return (
                product.name.toLowerCase().includes(searchInput.toLowerCase())
                  && (
                !selectedCategories.length ||
                _.intersection(selectedCategories, product.tagsArray).length
              ) ?
              (
                <div key={product.id} className="clearfix productItem">
                { product.stock > 0 ?
                  <img className="productImage" src={`${product.picture}`} />
                  :
                  <img className="productImage" src="/out-of-stock-label.png" />
                }
                  <h2> <Link to={`/products/${product.id}`}> {product.name} </Link></h2>
                  <h4> Price: $ {product.price} </h4>
                  <hr />
                </div>
              ) : null
            )
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
