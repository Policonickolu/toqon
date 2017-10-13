import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './Menu.css';

export default class Menu extends Component {
  render() {
    return (
      <div className="Menu">
        <div className="Menu-header">
          <div className="Menu-title"><Link to="/">FINPAL</Link></div>
        </div>
        <ul>
          <li>Overview</li>
          <li><Link to="/transactions" className="active">Transactions (3)</Link></li>
        </ul>
        <ul>
          <li>Transfers (2)</li>
          <li>Invoices (1)</li>
        </ul>
        <ul>
          <li>Manage cards</li>
          <li>Manage accounts</li>
        </ul>
        <ul>
          <li>Team</li>
          <li>Integrations</li>
          <li>Settings</li>
        </ul>
        <div className="Menu-button">UPGRADE ACCOUNT</div>
      </div>
    );
  }
}
