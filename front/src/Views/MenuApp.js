import React, { Component } from 'react';
import { Link } from "react-router-dom";

class MenuApp extends Component{
    state = { activeItem: 'items' }

    handleItemClick = (e) => {
      this.setState({ activeItem: e.target.name });
    }
  
    render(){
      const { activeItem } = this.state

      return (
      <div className="menu">
        <div className="pure-menu">
            <a className="pure-menu-heading" href="#">Menu</a>
            <ul className="pure-menu-list">
                <li className="pure-menu-item"  onClick={this.handleItemClick}><Link name="items" to="/items" className="pure-menu-link">Items</Link></li>
                <li className="pure-menu-item"  onClick={this.handleItemClick}><Link name="about" to="/about" className="pure-menu-link">About</Link></li>
            </ul>
        </div>
      </div>
      )
  }
}

export default MenuApp;
