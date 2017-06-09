import React, { Component } from 'react';
import {connect} from 'react-redux';

class AddReview extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            reviewTitle: '',
            reviewBody: '',
            numStars: 0,
        }
    }

    render() {
        return (
            <form className="add-review">
                <div className="form-group">
                    <select name="stars">
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
                        onChange={(event) => this.setState({nameInput: event.target.value})}
                        value={this.state.reviewTitle}
                    />
                    <textarea
                        className="form-control"
                        name="body"
                        type="text"
                        placeholder="Review Body"
                        onChange={(event) => this.setState({imageInput: event.target.value})}
                        value={this.state.reviewBody}
                    />
                </div>
            </form>
        )
    }
}