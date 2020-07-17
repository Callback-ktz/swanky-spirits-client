import React from 'react'
import axios from 'axios'
import apiUrl from './../apiConfig.js'

class InventoryCreate extends React.Component {
  state = {
    inventory: {
      code: '',
      name: '',
      unit_price: '',
      quantity: ''
    }
  }
  handleInputChange = (event) => {
    // get the book key from the input name field
    const inventoryKey = event.target.name
    // get the input value that the user typed in
    const value = event.target.value
    // make a copy of the current state
    const inventoryCopy = Object.assign({}, this.state.inventory)
    // update the copy with the new user input
    inventoryCopy[inventoryKey] = value
    // update the state with our updated copy
    this.setState({ inventory: inventoryCopy })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    console.log(this.props)
    axios({
      method: 'POST',
      url: apiUrl + '/inventory',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      },
      data: {
        inventory: this.state.inventory
      }
    })
      .then(res => {
        this.setState({
          inventory: {
            code: '',
            name: '',
            unit_price: '',
            quantity: ''
          }
        })
      })
      .catch(console.error)
  }
  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit} style={{ display: 'flex' }}>
          <input onChange={this.handleInputChange}
            value={this.state.inventory.code}
            type="text"
            name="code"
            placeholder="Enter product code here"
          />
          <input onChange={this.handleInputChange}
            value={this.state.inventory.name}
            name="name"
            placeholder="Enter name of liquor here" />
          <input onChange={this.handleInputChange}
            value={this.state.inventory.unit_price}
            name="unit_price"
            placeholder="Enter Unit Price Here" />
          <input onChange={this.handleInputChange}
            value={this.state.inventory.quantity}
            name="quantity"
            placeholder="Enter product quantity here" />
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}
export default InventoryCreate
