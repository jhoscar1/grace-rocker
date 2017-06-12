import React from 'react'
import { Link } from 'react-router'

export default function AdminOrderItem (props) {
  return (
    <tr>
      <th>{props.item.id}</th>
      <th>{props.item.purchase_date}</th>
      <th>{props.item.total_cost}</th>
      <th><Link to={`/admin/orders/${props.item.id}`}>View Order Details</Link></th>
      <th>{props.item.status}</th>
      <th><button onClick={props.handleUpdateClick}>X</button></th>
    </tr>
  )

}
