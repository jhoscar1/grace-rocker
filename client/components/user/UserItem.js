import React from 'react';

const UserItem = props => {
  const { user, deleteUser, handleUpdateClick } = props;
  return (
        <tr key={user.id}>
          <th>{user.name}</th>
          <th>{user.email}</th>
          <th>{(user.isAdmin).toString()}</th>
          <th>{user.shippingAddress}</th>
          <th>{user.createdAt}</th>
          <th><button className="btn btn-default" onClick={user.id && deleteUser}>Delete</button></th>
          <th><button className="btn btn-default" onClick={handleUpdateClick}>Update</button></th>
        </tr>
    )
}

export default UserItem;
