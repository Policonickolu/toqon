import React, { Component } from 'react'

import './TransactionList.css'

import AmountContainer from '../containers/AmountContainer'


export default class TransactionList extends Component {
  

  render() {

    var columns = [{class:"date", name:"Date"}, {class:"counterparty", name:"Counterparty Name"},
                    {class:"payment", name:"Payment type"}, {class:"amount", name:"Amount"}]
    
    var arrows = {}
    arrows[this.props.sortedBy] = this.props.asc ? <span class="arrow-up"></span> : <span class="arrow-down"></span>

    return (
      <table className="TransactionList">
        <tr>
          {

            columns.map((col) => {

              return <th className={col.class}
                          onClick={this.props.onHeaderClick}
                          style={(this.props.sortedBy === col.class ? {fontWeight:600} : {})}>
                          {col.name}
                          {arrows[col.class]}
                    </th>

            })

          }
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
                      <AmountContainer euro={t.amount} gbp={t.gbp} />
                      <td className="attachements" style={{fontWeight:"100"}}>
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

