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
        <th>{user.passReset.toString()}</th>
        <th><button onClick={user.id && deleteUser}>X</button></th>
        <th><button onClick={handleUpdateClick}>X</button></th>
      </tr>
  )
}

export default UserItem;
