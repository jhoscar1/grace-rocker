import React from 'react';

export default function UpdateOrderForm (props) {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <div>
          <label htmlFor="orderStatus"><small>Status for Order no.  {props.orderNo}</small></label>
          <select name="orderStatus">
            <option>created</option>
            <option>processing</option>
            <option>cancelled</option>
            <option>completed</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}


//onsubmit = props.handleSubmit()
