import React, { Component } from 'react';
import Item from './Item';
import EditItem from './EditItem';
import { connect } from 'react-redux'

class ListItems extends Component {

  constructor(){
    super();
    this.state = { editItem:{id:-1} };
    this.loadList = this.loadList.bind(this);
  }

  
  loadList(){
    return new Promise((resolve, reject)=>{
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
          resolve(response.json());
        } else {
          reject("not possible to fetch list");
        }
      });
    });
  }
  
  componentDidMount(){
    this.loadList()
    .then((response) => {
      this.props.listLoaded(response);
    });
  }

  showEdit(itemToEdit, e){
    this.editItemComponent.setState(itemToEdit);
  }

  showNew(e){
    this.editItemComponent.setState({id:0, name:"", description:""});
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
            this.props.itemsList.map(item => {
                return <Item key={item.id} item={item} showEdit={this.showEdit.bind(this, item)} />
              }
            )
          }
          </tbody>
          <tfoot>
          <tr>
              <td colSpan="3"></td>
              <td colSpan="2"><input type="button" value="New" onClick={this.showNew.bind(this)} /></td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }

}


const mapStateToProps = state => ({
  itemsList: state.itemsReducer.itemsList
})

const mapDispatchToProps = dispatch => ({
  listLoaded: (list) => {
    dispatch({
      type:"FIRSTLISTITEMS",
      itemsList:list
    });
  }
});

export default connect(mapStateToProps,()=>{})(ListItems)
