import React from 'react'
import { Link } from 'react-router'

export default function AdminOrderItem (props) {
  return (
    <tr>
      <th>{props.order.id}</th>
      <th>{props.order.purchase_date}</th>
      <th>{props.order.total_cost}</th>
      <th><Link to={`/admin/orders/${props.order.id}`}>View Order Details</Link></th>
      <th>{props.order.status}</th>
      <th><button className="btn btn-default" onClick={() => {
           props.handleUpdateClick(props.order.id)}}>Edit</button></th>
    </tr>
  )
}
