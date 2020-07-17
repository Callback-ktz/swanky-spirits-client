import React from 'react'
import InputRange from 'react-input-range'
import ReactDOM from 'react-dom'

class EditNumber extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      value: { min: 0, max: 999 }
    }
  }

  render () {
    return (
      <InputRange
        maxValue={999}
        minValue={0}
        value={this.state.value}
        onChange={value => this.setState({ value })} />
    )
  }
}

ReactDOM.render(
  <EditNumber />,
  document.getElementById('app')
)

export default EditNumber
