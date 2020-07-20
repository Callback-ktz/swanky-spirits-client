import React from 'react'
import axios from 'axios'
import apiUrl from './../apiConfig.js'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

class InventoryCreate extends React.Component {
  state = {
    inventory: {
      name: '',
      unit_price: '',
      quantity: ''
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
      .then(() => this.props.getRequest())
      .catch(console.error)
  }

  render () {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Row>
            <Col xs={6}>
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
                placeholder="Enter quantity" />
            </Col>
            <Button type="submit" variant="add-btn" size="small">Add</Button>
          </Form.Row>
        </Form>
      </div>
    )
  }
}

export default InventoryCreate
