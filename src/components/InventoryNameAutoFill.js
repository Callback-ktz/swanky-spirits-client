import React from 'react'

class InventoryNameAutoFill extends React.Component {
  state = {
    display: false,
    options: [],
    search: ''
  }

  getNames () {
    const nameArr = []
    this.props.inventory.forEach(item => { nameArr.push(item.name) })
    this.setState({ options: nameArr })
  }

  render () {
    return (
      <div>
        { this.props.editing ? this.setState({ display: true }) : this.setState({ display: false })}
        {this.state.display && this.state.options.map(name => (
          <li key={name}>
            {name}
          </li>
        ))}
      </div>
    )
  }
}

export default InventoryNameAutoFill
