import React from 'react'
import InventoryNameAutoFill from './InventoryNameAutoFill'

class AutoFillEditable extends React.Component {
  constructor (props) {
    super(props)
    this.textInput = React.createRef()
    this.state = {
      value: props.value,
      editing: false
    }
  }
  render = () => {
    return (
      this.state.editing ? (
        <input
          type="text"
          value={this.state.value}
          ref={this.textInput}
          onBlur={ () => {
            this.props.onUpdate(this.state.value)
            this.setState({
              editing: false
            })
          }}
          onChange={ event => {
            this.setState({
              value: event.target.value
            })
          }}
        />
      ) : (
        <div onClick={ () => {
          this.setState({
            editing: true
          }, () => {
            this.textInput.current.focus()
          })
        }}>{this.state.value}<InventoryNameAutoFill inventory={this.props.inventory} user={this.props.user} editing={this.state.editing}></InventoryNameAutoFill></div>
      )
    )
  }
}

export default AutoFillEditable
