import React from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import EditableField from './EditableField'
import EditableNumberField from './EditableNumberField'
import InventoryCreate from './InventoryCreate'
import axios from 'axios'
import apiUrl from './../apiConfig.js'
import messages from './AutoDismissAlert/messages'

class InventoryIndex extends React.Component {
  state= {
    inventory: null
  }

  deleteItem = (event) => {
    event.persist()
    axios({
      method: 'DELETE',
      url: apiUrl + '/inventory/' + event.target.id,
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(() => this.props.msgAlert({
        heading: 'Delete Success',
        message: messages.deleteSuccess,
        variant: 'success'
      }))
      .then(response => {
        this.setState({
          inventory: [...this.state.inventory.filter(item => item._id !== event.target.id)]
        })
      })
      .catch(console.error)
  }

  getRequest = () => {
    axios({
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
      data: {
        inventory: {
          name: data.name,
          unit_price: data.unit_price,
          quantity: data.quantity,
          owner: data.owner
        }
      }
    })
      .then(() => this.props.msgAlert({
        heading: 'Update Success',
        message: messages.updateSuccess,
        variant: 'success'
      }))
      .then(() => this.getRequest())
  }

  render () {
    let inventoryJSX
    if (this.state.inventory === null) {
      inventoryJSX = <p>Loading...</p>
    } else if (this.state.inventory.length === 0) {
      inventoryJSX = <p>No items currently in inventory</p>
    } else {
      inventoryJSX = (
        <Table striped bordered hover variant="light">
          <thead>
            <tr>
              <th>User</th>
              <th>Name</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th width={'10%'}></th>
            </tr>
          </thead>
          <tbody>
            {this.state.inventory.reverse().map(item => (
              <tr key={item._id}>
                <td>
                  {item.owner.email}
                </td>
                <td>
                  <EditableField
                    value={item.name}
                    onUpdate={(value) => {
                      this.updateInventoryItem(item._id, { name: value, owner: this.props.user._id })
                    }}
                  />
                </td>
                <td>
                  <EditableNumberField
                    value={item.unit_price}
                    min={0}
                    max={999.99}
                    currency
                    onUpdate={(value) => {
                      this.updateInventoryItem(item._id, { unit_price: value, owner: this.props.user._id })
                    }}
                  />
                </td>
                <td>
                  <EditableNumberField
                    value={item.quantity}
                    min={0}
                    max={999}
                    onUpdate={(value) => {
                      this.updateInventoryItem(item._id, { quantity: value, owner: this.props.user._id })
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
        <img src="https://i.imgur.com/A1XkMa4.png" alt="Logo" />
        <InventoryCreate getRequest={this.getRequest} user={this.props.user} inventory={this.state.inventory} msgAlert={this.props.msgAlert}></InventoryCreate>
        {inventoryJSX}
      </div>
    )
  }
}

export default InventoryIndex
