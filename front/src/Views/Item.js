import React, { Component } from 'react';

class Item extends Component {

  render() {
    console.log("render item");
    return (
      <tr>
          <td>{this.props.id}</td>
          <td>{this.props.name}</td>
          <td>{this.props.description}</td>
      </tr>
    )
  }
}

export default Item;
