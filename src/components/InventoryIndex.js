import React from 'react'
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
        <ul>
          {this.state.inventory.map(item => {
            return (
              <li key={item.code}>
                <li code={item.code}>{item.code}</li>
                <li name={item.name}>{item.name}</li>
                <li unit_price={item.unit_price}>{item.unit_price}</li>
                <li quantity={item.quantity}>{item.quantity}</li>
              </li>
            )
          })}
        </ul>
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
