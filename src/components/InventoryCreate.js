import React from 'react'
import axios from 'axios'
import apiUrl from './../apiConfig.js'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

class InventoryCreate extends React.Component {
  state = {
    inventory: {
      code: '',
      name: '',
      unit_price: '',
      quantity: '',
      items: []
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
    console.log(this.props)

    const items = [...this.state.inventory]

    items.push({
      code: this.state.inventory.code,
      name: this.state.inventory.name,
      unit_price: this.state.inventory.unit_price,
      quantity: this.state.inventory.quantity
    })

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
      .then((response) => {
        console.log(response.data)
      })
      .then(() => {
        this.setState({
          inventory: this.state.inventory.map(item => (
            <tr key={item._id}>
              <td>{item.code}</td>
              <td>{item.name}</td>
              <td>{item.unit_price}</td>
              <td>{item.quantity}</td>
            </tr>
          ))
        })
      })
      .catch(console.error)
  }

  render () {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Row>
            <Col>
              <Form.Control
                onChange={this.handleInputChange}
                value={this.state.inventory.code}
                type="text"
                name="code"
                placeholder="Enter product code" />
            </Col>
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
                placeholder="Enter quantity" />
            </Col>
          </Form.Row>
          <br />
          <Button type="submit" variant="primary" size="lg" block>Add</Button>
        </Form>
      </div>
    )
  }
}

export default InventoryCreate
