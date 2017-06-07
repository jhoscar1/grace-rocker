import React from 'react';
import PropTypes from 'prop-types';

const UpdateForm = props => {

  const { name, displayName, handleSubmit, error } = props;

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="name"><small>name</small></label>
          <input name="name" type="text" />
        </div>
        <div>
          <label htmlFor="carat"><small>carat</small></label>
          <input name="carat" type="text" />
        </div>
        <div>
          <label htmlFor="price"><small>price</small></label>
          <input name="price" type="text" />
        </div>
        <div>
          <label htmlFor="stock"><small>stock</small></label>
          <input name="stock" type="text" />
        </div>
        <div>
          <label htmlFor="description"><small>description</small></label>
          <input name="description" type="text" />
        </div>
        <div>
          <button type="submit"> Submit </button>
        </div>
        { error &&  <div> { error.response.data } </div> }
      </form>
    </div>
  );
};

export default UpdateForm;

UpdateForm.propTypes = {
  name: PropTypes.string.isRequired,
  stock: PropTypes.number.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
};
