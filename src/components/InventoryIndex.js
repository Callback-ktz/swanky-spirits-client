import React from 'react'
import Table from 'react-bootstrap/Table'
import axios from 'axios'
import apiUrl from './../apiConfig.js'
import EditableField from './EditableField'
// import Button from 'react-bootstrap/Button'
// import ContentEditable from 'react-contenteditable'

class InventoryIndex extends React.Component {
  state= {
    inventory: null
  }

  componentDidMount () {
    return axios({
      url: apiUrl + '/inventory',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(response => {
        this.setState({
          inventory: response.data.inventory
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  updateInventoryItem (id, data) {
    return axios({
      url: apiUrl + '/inventory/' + id,
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      },
      data: { inventory: data }
    })
      .then(() => {
        this.setState({
          inventory: this.state.inventory.map(item => (
            item._id === id ? { ...item, ...data } : item))
        })
      })
  }

  render () {
    console.log(this.state)
    let inventoryJSX
    if (this.state.inventory === null) {
      inventoryJSX = <p>Loading...</p>
    } else if (this.state.inventory.length === 0) {
      inventoryJSX = <p>No items currently in inventory</p>
    } else {
      inventoryJSX = (
        <Table responsive="md" striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.inventory.map(item => (
              <tr key={item._id}>
                <td>
                  <EditableField
                    value={item.code}
                    onUpdate={(value) => {
                      this.updateInventoryItem(item._id, { code: value })
                    }}
                  />
                </td>
                <td>
                  <EditableField
                    value={item.name}
                    onUpdate={(value) => {
                      this.updateInventoryItem(item._id, { name: value })
                    }}
                  />
                </td>
                <td>
                  <EditableField
                    value={item.unit_price}
                    onUpdate={(value) => {
                      this.updateInventoryItem(item._id, { unit_price: value })
                    }}
                  />
                </td>
                <td>
                  <EditableField
                    value={item.quantity}
                    onUpdate={(value) => {
                      this.updateInventoryItem(item._id, { quantity: value })
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )
    }
    return (
      <div>
        {inventoryJSX}
      </div>
    )
  }
}

export default InventoryIndex
