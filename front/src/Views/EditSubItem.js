import React, { Component } from 'react';
import Item from './Item';

class EditSubItem extends Component {

  constructor(props){
    super(props);
    this.state = {...props};
  }

  save(e){
    e.preventDefault();

    if (this.state.id > -1)
    {
      const itemToSave = this.state;

      fetch('http://localhost:8080/subitem/change',
      {
          method: "POST",
          headers:{
            'content-type': 'application/json;charset=UTF-8'
          },
          body: JSON.stringify(itemToSave)
      })
      .then(response => {
        if(response.ok){
          return response.json();
        } else {
          throw new Error("Item not saved");
        }
      })
      .then((response) => {
        this.setState({id:0, name:null});
      });
    }
  }

  changeName(e){
    this.setState({name:e.target.value});
  }
  changeDescription(e){
    this.setState({description:e.target.value});
  }

  render() {

    if (!this.state.name)
      return ("");

    return (
      <div id="edititem">
        <table className="pure-table">
          <tr>
            <td>Name</td>
            <td><input type="text" value={this.state.name} onChange={this.changeName.bind(this)} /></td>
          </tr>
          <tr>
            <td>Description</td>
            <td><input type="text" value={this.state.description} onChange={this.changeDescription.bind(this)} /></td>
          </tr>
          <tr>
            <td></td>
            <td><input type="button" value="Save" onClick={this.save.bind(this)}/></td>
          </tr>
        </table>
      </div>
    )
  }


}

export default EditSubItem;
