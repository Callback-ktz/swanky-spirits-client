import React from 'react'
import axios from 'axios'
import apiUrl from './../apiConfig.js'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import messages from './AutoDismissAlert/messages'

class InventoryCreate extends React.Component {
  state = {
    inventory: {
      name: '',
      unit_price: '',
      quantity: '',
      inventoryItem: null
    }
  }
  handleInputChange = (event) => {
    const inventoryKey = event.target.name
    const value = event.target.value
    const inventoryCopy = Object.assign({}, this.state.inventory)
    inventoryCopy[inventoryKey] = value
    this.setState({ inventory: inventoryCopy })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({ inventory: {
      name: '',
      unit_price: '',
      quantity: ''
    } })

    const inventoryItem = this.props.inventory.find(item => {
      return item.name === this.state.inventory.name
    })
    if (!inventoryItem) {
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
        .then(() => this.props.msgAlert({
          heading: 'Create Success',
          message: messages.addedItemSuccess,
          variant: 'success'
        }))
        .then(() => this.props.getRequest())
        .catch(() => this.props.msgAlert({
          heading: 'Create Failure',
          message: messages.addedItemFailure,
          variant: 'danger'
        }))
    } else if (inventoryItem) {
      axios({
        method: 'PATCH',
        url: apiUrl + '/inventory/' + inventoryItem._id,
        headers: {
          'Authorization': `Bearer ${this.props.user.token}`
        },
        data: {
          inventory: {
            name: inventoryItem.name,
            unit_price: inventoryItem.unit_price,
            quantity: inventoryItem.quantity + +parseInt(this.state.inventory.quantity, 10),
            owner: this.props.user._id
          }
        }
      }
      )
        .then(() => this.props.getRequest())
        .catch(() => this.props.msgAlert({
          heading: 'Update Failure',
          message: messages.Failure,
          variant: 'danger'
        }))
    }
  }

  render () {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Row>
            <Col xs={5}>
              <Form.Control
                onChange={this.handleInputChange}
                value={this.state.inventory.name}
                name="name"
                placeholder="Enter product name" />
            </Col>
            <Col>
              <Form.Control
                onChange={this.handleInputChange}
                value={this.state.inventory.unit_price}
                name="unit_price"
                className="unit-price"
                placeholder="Enter unit price" />
            </Col>
            <Col>
              <Form.Control
                onChange={this.handleInputChange}
                value={this.state.inventory.quantity}
                name="quantity"
                type="number"
                placeholder="Enter quantity"
                required={true} />
            </Col>
            <Button type="submit" variant="add-btn" size="small">Add</Button>
          </Form.Row>
        </Form>
      </div>
    )
  }
}

export default InventoryCreate
