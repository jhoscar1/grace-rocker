import React, {Component} from 'react';
import {connect} from 'react-redux';
import { editUser } from '../../reducer/';

class EditUser extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            nameInput: `${props.user.name}`,
            emailInput: `${props.user.email}`,
            addressInput: `${props.user.shippingAddress}`
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        const user = {
            name: this.state.nameInput,
            email: this.state.emailInput,
            shippingAddress: this.state.addressInput
        };
        if (this.props.user.passReset) {
            user.password = this.state.passwordInput;
        }
        this.props.editUser(this.props.user.id, user)
        this.setState({
            nameInput: '',
            emailInput: '',
            addressInput: ''
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
                        name="email"
                        type="text"
                        placeholder="Email"
                        onChange={(event) => this.setState({emailInput: event.target.value})}
                        value={this.state.emailInput}
                    />
                    <input
                        className="form-control"
                        type="text"
                        name="address"
                        placeholder="Shipping Address"
                        onChange={(event) => this.setState({addressInput: event.target.value})}
                        value={this.state.addressInput}
                    />
                </div>
                <button type="submit "className="btn btn-primary">Submit
                </button>
            </form>
        )
    }
}

const mapState = (state, ownProps) => {
    console.log(ownProps);
    return {
        user: ownProps.user
    }
};

const mapDispatch = {editUser};

export default connect(mapState, mapDispatch)(EditUser)