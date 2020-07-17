import React from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import EditableField from './EditableField'
import axios from 'axios'
import apiUrl from './../apiConfig.js'
// import InputGroup from 'react-bootstrap/InputGroup'
// import FormControl from 'react-bootstrap/FormControl'

class InventoryIndex extends React.Component {
  state= {
    inventory: null
  }

  deleteItem = (event) => {
    event.persist()
    console.log('someone done clicked me!', this.props, event.target.id, this.state)
    axios({
      method: 'DELETE',
      url: apiUrl + '/inventory/' + event.target.id,
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(response => {
        this.setState({
          inventory: [...this.state.inventory.filter(item => item._id !== event.target.id)]
        })
      })
      .catch(console.error)
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
        console.log('did we get the response ', response)

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
    console.log('state is ', this.state)
    let inventoryJSX
    if (this.state.inventory === null) {
      inventoryJSX = <p>Loading...</p>
    } else if (this.state.inventory.length === 0) {
      inventoryJSX = <p>No items currently in inventory</p>
    } else {
      inventoryJSX = (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th width={'10%'}></th>
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
                <td style={{ display: 'flex' }} className="editNumber">
                  {/* $&nbsp; */}
                  <EditableField
                    type='number'
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
                <td align="center"><Button id={item._id} onClick={this.deleteItem} variant="outline-danger" size="sm">Delete</Button>
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
