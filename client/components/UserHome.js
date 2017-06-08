import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CatalogContainer } from './product/ProductsCatalog'

const UserHome = props => {
  const { name } = props;

  return (
    <div>
      <h3>Welcome, { name }</h3>
      <CatalogContainer />
    </div>
  );
};

const mapState = ({ userReducer }) => {
  return ({
     name: userReducer.user.name
    })
}

export default connect(mapState)(UserHome);

UserHome.propTypes = {
  name: PropTypes.string
};
