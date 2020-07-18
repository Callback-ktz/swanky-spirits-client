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
          type='text'
          className='form-control'
          value={this.state.value}
          pattern={this.props.pattern}
          ref={this.textInput}
          onBlur={ (event) => {
            if (!this.state.value || this.state.value.length === 0) {
              event.target.focus()
              return
            }
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
        <span tabIndex='0' onFocus={ () => {
          this.setState({
            editing: true
          }, () => {
            this.textInput.current.focus()
          })
        }}>{this.state.value}</span>
      )
    )
  }
}

export default EditableField
