import React from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import apiUrl from './../apiConfig.js'

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
        <React.Fragment>
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
              {this.state.inventory.map(item => {
                return (
                  <React.Fragment key={item.code}>
                    <tr>
                      <td>{item.code}</td>
                      <td>{item.name}</td>
                      <td>{item.unit_price}</td>
                      <td>{item.quantity}</td>
                      <td align="center"><Button id={item._id} onClick={this.deleteItem} variant="outline-danger" size="sm">Delete</Button></td>
                    </tr>
                  </React.Fragment>
                )
              })}
            </tbody>
          </Table>
        </React.Fragment>
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
