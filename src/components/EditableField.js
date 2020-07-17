import React from 'react'

class EditableField extends React.Component {
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
        }}>{this.state.value}</div>
      )
    )
  }
}

export default EditableField
