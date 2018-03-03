import React, { Component } from 'react';
import logo from './logo.svg';
import './css/pure-min.css';
import './css/side-menu.css';
import Items from './Views/Items';
import About from './Views/About';
import MenuApp from './Views/MenuApp';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div id="layout">
          <a href="#menu" id="menuLink" className="menu-link">
            <span></span>
          </a>
          <div id="menu" className="menu">
            <MenuApp />
          </div>
          <div id="content">
            {this.props.children}
          </div>            
          <Route path="/items" component={Items} />
          <Route path="/about" component={About} />
        </div>
      </Router>
    )
  }
}

export default App;
