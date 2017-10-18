import React, { Component } from 'react'
import './App.css'

import Menu from '../components/Menu'
import Main from './Main'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Menu/>
        <Main/>
      </div>
    );
  }
}