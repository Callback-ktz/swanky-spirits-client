import React from 'react'
import Table from 'react-bootstrap/Table'
import axios from 'axios'
import apiUrl from './../apiConfig.js'

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
            </tr>
          </thead>
          <tbody>
            {this.state.inventory.map(item => (
              <tr key={item._id}>
                <td>{item.code}</td>
                <td>{item.name}</td>
                <td>{item.unit_price}</td>
                <td>{item.quantity}</td>
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
