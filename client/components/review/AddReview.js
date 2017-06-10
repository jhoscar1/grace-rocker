import React, { Component } from 'react';
import {connect} from 'react-redux';
import { fetchProducts } from '../../reducer/';
import axios from 'axios';

class AddReview extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            reviewTitle: '',
            reviewBody: '',
            numStars: 1
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        const review = {
            title: this.state.reviewTitle,
            body: this.state.reviewBody,
            stars: this.state.numStars
        }
        axios.post(`/api/products/${this.props.productId}/reviews`, review)
        .then(() => {
            this.props.fetchProducts();
        })
        .catch(console.error)
        this.setState({
            reviewTitle: '',
            reviewBody: '',
            numStars: 1
        })
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} className="add-review">
                <div className="form-group">
                    <select onChange={(event) => {
                        this.setState({numStars: event.target.value})
                    }} name="stars">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <input
                        className="form-control"
                        name="title"
                        type="text"
                        placeholder="Title"
                        onChange={(event) => this.setState({reviewTitle: event.target.value})}
                        value={this.state.reviewTitle}
                    />
                    <textarea
                        className="form-control"
                        name="body"
                        type="text"
                        placeholder="Review Body"
                        onChange={(event) => this.setState({reviewBody: event.target.value})}
                        value={this.state.reviewBody}
                    />
                </div>
                 <button type="submit "className="btn btn-primary">Submit
                </button>
            </form>
        )
    }
}

const mapState = null;
const mapDispatch = {fetchProducts};

export default connect(mapState, mapDispatch)(AddReview)