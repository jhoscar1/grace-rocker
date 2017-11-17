import React, {Component} from 'react';
import {connect} from 'react-redux';
import {newProduct} from '../../reducer/';


class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameInput: '',
            caratInput: 0,
            priceInput: 0,
            stockInput: 0,
            imageLink: '',
            descriptionInput: ''
        }
    }

    onSubmit = (event) => {
        event.preventDefault();
        const product = {
            name: this.state.nameInput,
            picture: this.state.imageLink,
            carat: this.state.caratInput,
            price: this.state.priceInput,
            stock: this.state.stockInput,
            description: this.state.descriptionInput
        }
        this.props.newProduct(product);
        this.setState({
            nameInput: '',
            caratInput: 0,
            priceInput: 0,
            stockInput: 0,
            descriptionInput: ''
        })
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <input
                        className="form-control"
                        name="name"
                        type="text"
                        placeholder="Name"
                        onChange={(event) => this.setState({nameInput: event.target.value})}
                        value={this.state.nameInput}
                    />
                    <input
                        className="form-control"
                        name="image"
                        type="text"
                        placeholder="Image Link"
                        onChange={(event) => this.setState({imageLink: event.target.value})}
                        value={this.state.imageLink}
                    />
                    <input
                        className="form-control"
                        name="carat"
                        type="text"
                        placeholder="Carat"
                        onChange={(event) => this.setState({caratInput: event.target.value})}
                        value={this.state.caratInput}
                    />
                    <input
                        className="form-control"
                        name="price"
                        type="text"
                        placeholder="Price"
                        onChange={(event) => this.setState({priceInput: event.target.value})}
                        value={this.state.priceInput}
                    />
                    <input
                        className="form-control"
                        name="stock"
                        type="text"
                        placeholder="Stock"
                        onChange={(event) => this.setState({stockInput: event.target.value})}
                        value={this.state.stockInput}
                    />
                    <textarea
                        className="form-control"
                        name="description"
                        type="text"
                        placeholder="Description"
                        onChange={(event) => this.setState({descriptionInput: event.target.value})}
                        value={this.state.descriptionInput}
                    />
                </div>
                <button type="submit "className="btn btn-primary">Submit
                </button>
            </form>
        )
    }
}

const mapState = null;
const mapDispatch = {newProduct};

export default connect(mapState, mapDispatch)(AddProduct);
