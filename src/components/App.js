import React, { Component } from 'react'
import './App.css'

import Menu from './Menu'
import Main from './Main'
import Aside from './Aside'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Menu/>
        <Main/>
        <Aside/>
      </div>
    );
  }
}