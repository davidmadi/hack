import React, { Component } from 'react';
import Item from './Item';
import EditSubItem from './EditSubItem';
import { Link } from "react-router-dom";
import {createStore} from 'redux';
import ReducerFunction from '../Reducer/SubItemsReducer';

class SubItemsList extends Component {

  store = createStore(ReducerFunction);

  constructor(props){
    super(props);
    this.state = {itemid : props.match.params.itemid, listsubitems : []};
  }

  componentWillMount(){
    this.store.subscribe(() => {
      this.setState({listsubitems:this.store.getState()});
    });
  }

  componentDidMount(){

    const bod = JSON.stringify({id : this.state.itemid});
    fetch('http://localhost:8080/subitem/loadlist',
    {
        method: "POST",
        headers:{
          'content-type': 'application/json;charset=UTF-8'
        },
        body: bod
    })
    .then(response => {
      if(response.ok){
        return response.json();
      } else {
        throw new Error("não foi possível obter a lista");
      }
    })
    .then((response) => {
      this.store.dispatch({
        type:"FIRSTLISTITEMS",
        listsubitems:response
      });
      //this.setState({listsubitems:response});
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
        <EditSubItem ref={(edititem) => this.editItemComponent = edititem} />
        <table className="pure-table">
          <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Description</th>
                <th></th>
              </tr>
          </thead>
          {
            this.state.listsubitems.map(item => {
              return <tr>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td><input type="button" value="Edit" onClick={this.showEdit.bind(this, item)} itemid={item.id} /></td>
              </tr>
              }
            )
          }
        </table>
      </div>
    )
  }
}

export default SubItemsList;
