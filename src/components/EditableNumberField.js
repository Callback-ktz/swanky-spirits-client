import React from 'react'

const calculateNumbers = (x, min, max) => Math.max(Math.min(x, max), min)
const roundMoney = (num) => Math.ceil(num * 100) / 100

class EditableNumberField extends React.Component {
  constructor (props) {
    super(props)
    this.textInput = React.createRef()
    this.state = {
      value: +props.value,
      editing: false
    }
  }
  render = () => {
    return (
      this.state.editing ? (
        <input
          type='number'
          className='form-control'
          value={this.state.value}
          pattern={this.props.pattern}
          ref={this.textInput}
          min={this.props.min}
          max={this.props.max}
          onBlur={ () => {
            const newValue = this.props.currency ? this.state.value.toFixed(2) : this.state.value
            this.props.onUpdate(newValue)
            this.setState({
              editing: false
            })
          }}
          onChange={event => {
            let newValue = calculateNumbers(+event.target.value, this.props.min, this.props.max)
            if (this.props.currency) {
              newValue = roundMoney(newValue)
            }
            this.setState({
              value: newValue
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
        }}>{this.props.currency ? '$ ' + this.state.value.toFixed(2) : this.state.value}</span>
      )
    )
  }
}

export default EditableNumberField
