import React from 'react'
import { Link } from 'react-router-dom'

const InventoryForm = ({ item, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <label>Code</label>
    <input
      placeholder="ex: 123A"
      value={item.code}
      name="code"
      onChange={handleChange}
    />

    <label>Name</label>
    <input
      placeholder="ex: Heineken, Corona.."
      value={item.name}
      name="name"
      onChange={handleChange}
    />

    <label>Unit Price</label>
    <input
      placeholder="$0.00"
      value={item.unit_price}
      name="unit_price"
      onChange={handleChange}
    />

    <label>Quantity</label>
    <input
      placeholder="0"
      value={item.quantity}
      name="quantity"
      onChange={handleChange}
    />

    <button type="submit">Submit</button>
    <Link to={cancelPath}>
      <button>Cancel</button>
    </Link>
  </form>
)

export default InventoryForm
