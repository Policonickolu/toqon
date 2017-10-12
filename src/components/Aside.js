import React, { Component } from 'react';
import './Aside.css';


export default class Aside extends Component {
  render() {
    return (
      <div className="Aside">
        <div className="Aside-header"></div>
        <p className="Aside-message">
          Click on one or several transactions to see details
        </p>
      </div>
    );
  }
}