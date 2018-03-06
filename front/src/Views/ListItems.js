import React, { Component } from 'react';
import Item from './Item';
import EditItem from './EditItem';
import { Link } from "react-router-dom";

class ListItems extends Component {

  constructor(){
    super();
    this.state = {itemsList:[], editItem:null};
  }

  componentDidMount(){

    fetch('http://localhost:8080/item/loadlist',
    {
        method: "POST",
        headers:{
          'content-type': 'application/json;charset=UTF-8'
        },
        body: {}
    })
    .then(response => {
      if(response.ok){
        return response.json();
      } else {
        throw new Error("não foi possível obter a lista");
      }
    })
    .then((response) => {
      this.setState({itemsList:response});
    });

  }

  showEdit(itemToEdit, e){
    e.preventDefault();
    this.editItemComponent.setState(itemToEdit);
  }

  gotoSubItems(itemToGo, e){
    e.preventDefault();


  }

  render() {
    return (
      <div id="listofitems">
        <EditItem ref={(edititem) => this.editItemComponent = edititem} />
        <table className="pure-table">
          <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Description</th>
                <th></th>
                <th></th>
              </tr>
          </thead>
          {
            this.state.itemsList.map(item => {
              return <tr>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td><input type="button" value="Edit" onClick={this.showEdit.bind(this, item)} itemid={item.id} /></td>
                  <td><Link to={`/SubItems/${item.id}`} >Go</Link></td>
              </tr>
              }
            )
          }
        </table>
      </div>
    )
  }
}

export default ListItems;
