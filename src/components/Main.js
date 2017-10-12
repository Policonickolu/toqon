import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import './Main.css';
import Content from './Content';


export default class Main extends Component {
  render() {
    return (
      <div className="Main">
        <div className="Main-header"></div>
        <Route path="/transactions" component={Content} />
      </div>
    );
  }
}