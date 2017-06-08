import React from 'react';
import PropTypes from 'prop-types';

const UpdateForm = props => {

  const { handleSubmit, product } = props;
  console.log('product', product)
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h4> Updating {product.name}: </h4>
        <div>
          <label htmlFor="name"><small>name</small></label>
          <input placeholder={`${product.name}`} name="name" type="text" />
        </div>
        <div>
          <label htmlFor="carat"><small>carat</small></label>
          <input placeholder={`${product.carat}`}name="carat" type="text" />
        </div>
        <div>
          <label htmlFor="price"><small>price</small></label>
          <input placeholder={`${product.priceInCents} (price in cents)`} name="price" type="text" />
        </div>
        <div>
          <label htmlFor="stock"><small>stock</small></label>
          <input placeholder={`${product.stock}`} name="stock" type="text" />
        </div>
        <div>
          <label htmlFor="description"><small>description</small></label>
          <input placeholder={`${product.description}`} name="description" type="text" />
        </div>
        <div>
          <button type="submit"> Submit </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateForm;

// UpdateForm.propTypes = {
//   name: PropTypes.string.isRequired,
//   stock: PropTypes.number.isRequired,
//   displayName: PropTypes.string.isRequired,
//   handleSubmit: PropTypes.func.isRequired,
//   error: PropTypes.object
// };
