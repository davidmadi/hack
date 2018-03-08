import React, { Component } from 'react';
import Item from './Item';
import EditItem from './EditItem';
import { Link } from "react-router-dom";
import {createStore} from 'redux';
import ReducerFunction from '../Reducer/ItemsReducer';

class ListItems extends Component {

  store = createStore(ReducerFunction);

  constructor(){
    super();
    this.state = {itemsList:[], editItem:null};
  }

  componentWillMount(){
    this.store.subscribe(() => {
      this.setState({itemsList:this.store.getState()});
    });
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
        throw new Error("not possible to fetch list");
      }
    })
    .then((response) => {
      this.store.dispatch({
        type:"FIRSTLISTITEMS",
        itemsList:response
      });
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
        <EditItem ref={(edititem) => this.editItemComponent = edititem} store={this.store} />
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
          <tbody>
          {
            this.state.itemsList.map(item => {
              return <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td><input type="button" value="Edit" onClick={this.showEdit.bind(this, item)} /></td>
                  <td><Link to={`/SubItems/${item.id}`} >Go</Link></td>
              </tr>
              }
            )
          }
          </tbody>
        </table>
      </div>
    )
  }
}

export default ListItems;
