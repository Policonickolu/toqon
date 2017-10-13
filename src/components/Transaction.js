import React, { Component } from 'react'
import './Transaction.css'


export default class Transaction extends Component {
  

  render() {

    var style = this.props.selected ? { backgroundColor:'lightblue' } : {}

    return (
      <div onClick={this.props.onClick} index={this.props.index} className="Transaction" style={style}>
        <div className="Trans-date">{this.props.date}</div>
        <div className="Trans-cp">{this.props.counterparty}</div>
        <div className="Trans-payment">{this.props.payment}</div>
        <div className="Trans-amount">{this.props.amount}</div>
        <div className="Trans-attach"><a href={this.props.attachements}><span>📎</span></a> {this.props.attachements ? "1" : ""}</div>
      </div>
    )
  }
}
