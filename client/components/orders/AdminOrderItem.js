import React from 'react'

export default function AdminOrderItem (props) {
  return (
    <tr>
      <th>{props.item.id}</th>
      <th>{props.item.purchase_date}</th>
      <th>{props.item.total_cost}</th>
      <th>View Order Details</th>
      <th>{props.item.status}</th>
      <th><button onClick={props.handleUpdateClick}>X</button></th>
    </tr>
  )

}
