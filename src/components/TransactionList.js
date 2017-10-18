import React, { Component } from 'react'
import './TransactionList.css'


export default class Transaction extends Component {
  

  render() {



    var arrows = {}

    arrows[this.props.sortedBy] = this.props.asc ? <span class="arrow-up"></span> : <span class="arrow-down"></span>

    return (
      <table className="TransactionList">
        <tr>
          <th className="date"
              onClick={this.props.onHeaderClick}
              style={(this.props.sortedBy === 'date' ? {fontWeight:600} : {})}>
              Date
              {arrows.date}
          </th>
          <th className="counterparty"
              onClick={this.props.onHeaderClick}
              style={(this.props.sortedBy === 'counterparty' ? {fontWeight:600} : {})}>
              Counterparty Name
              {arrows.counterparty}
          </th>
          <th className="payment"
              onClick={this.props.onHeaderClick}
              style={(this.props.sortedBy === 'payment' ? {fontWeight:600} : {})}>
              Payment Type
              {arrows.payment}
          </th>
          <th className="amount"
              onClick={this.props.onHeaderClick}
              style={(this.props.sortedBy === 'amount' ? {fontWeight:600} : {})}>
              {arrows.amount}              
              Amount
          </th>
          <th className="arrow"></th>
          <th className="attachements"><span>📎</span></th>
        </tr>
        {
          this.props.transactions.map( (t) => {

            var style = {}
            if(t.selected)
              style['backgroundColor'] = 'lightblue'
            if(t.recent)
              style['fontWeight'] = 600

            return  <tr className="Transaction"
                        onClick={this.props.onClick}
                        index={t.index}
                        style={style}>
                      <td className="date">{t.date}</td>
                      <td className="counterparty">{t.counterparty}</td>
                      <td className="payment">{t.payment}</td>
                      <td className="amount">{t.amount}</td>
                      <td className="arrow"><span className="arrow-up" onClick={(e) => (e.stopPropagation())}></span></td>
                      <td className="attachements">
                        { 
                          t.attachements.map( (a, i) => {
                            return <div><a href={a.url}><span>📎</span></a> {i+1}</div>
                          })
                        }
                      </td>
                    </tr>
          })
        }
      </table>
    )
  }
}

