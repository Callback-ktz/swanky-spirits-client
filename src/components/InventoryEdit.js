import React from 'react'
import ReactDOM from 'react-dom'
import ContentEditable from 'react-contenteditable'
import inventoryJsx from './InventoryIndex'

class InventoryEdit extends React.Component {
  constructor (props) {
    super(props)
    this.contentEditable = React.createRef()
    this.state = {
      html: { inventoryJsx } }
  };

  handleChange = props => {
    this.setState({
      code: '',
      name: '',
      unit_price: '',
      quantity: ''
    })
  };

  render = () => {
    return <ContentEditable
      innerRef={this.contentEditable}
      html={this.state.html}
      disabled={false}
      onChange={this.handleChange}
    />
  };
};

const rootElement = document.getElementById('root')
ReactDOM.render(<InventoryEdit />, rootElement)
