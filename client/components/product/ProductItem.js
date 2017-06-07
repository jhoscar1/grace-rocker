import React from 'react';

const ProductItem = props => {
  const { product, deleteProduct, handleUpdateClick } = props;
return (
      <tr key={product.id}>
        <th>{product.name}</th>
        <th>{product.carat}</th>
        <th>{product.price}</th>
        <th>{product.stock}</th>
        <th>{product.description}</th>
        <th>{product.createdAt}</th>
        <th><button onClick={deleteProduct}>X</button></th>
        <th><button onClick={handleUpdateClick}>X</button></th>
      </tr>
  )
}

export default ProductItem;
