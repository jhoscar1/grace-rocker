import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CatalogContainer } from './Product/ProductsCatalog'

const UserHome = props => {
  const { email } = props;

  return (
    <div>
      <h3>Welcome, { email }</h3>
      <CatalogContainer />
    </div>
  );
};

const mapState = ({ userReducer }) => {
  return ({
     email: userReducer.user.email
    })
}

export default connect(mapState)(UserHome);

UserHome.propTypes = {
  email: PropTypes.string
};
