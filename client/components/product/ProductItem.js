import React from 'react';
import {convertDate} from '../user/UserItem';

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
        <th><button className="btn btn-default" onClick={deleteProduct}>Delete</button></th>
        <th><button className="btn btn-default" onClick={handleUpdateClick}>Update</button></th>
      </tr>
  )
}

export default ProductItem;
