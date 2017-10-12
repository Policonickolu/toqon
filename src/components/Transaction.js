import React, { Component } from 'react';
import './Transaction.css';


export default class Transaction extends Component {
  render() {

    return (
      <div className="Transaction">
        <div className="Trans-date">{this.props.date}</div>
        <div className="Trans-cp">{this.props.counterparty}</div>
        <div className="Trans-payment">{this.props.payment}</div>
        <div className="Trans-amount">{this.props.amount}</div>
        <div className="Trans-attach"><a href={this.props.attachements}><span>📎</span></a> {this.props.attachements ? "1" : ""}</div>
      </div>
    );
  }
}
