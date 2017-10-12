import React, { Component } from 'react'
import './Content.css';

import Transaction from './Transaction'
import './Transaction.css';
import transactionsAPI from '../api'

export default class Content extends Component {
  
  constructor(props){
    super(props)

    this.state = {
      transactions:[],
      sortedBy: "date",
      asc: true
    }

    this.loadData = this.loadData.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.sort = this.sort.bind(this)
  }

  sort(sortedBy, asc){

    return function(a , b){

      if(sortedBy === "date"){

        return (new Date(a.created_at) - new Date(b.created_at)) * (asc ? 1 : -1)

      }else if(sortedBy === "cp"){

        return a.counterparty_name.localeCompare(b.counterparty_name) * (asc ? 1 : -1)

      }else if(sortedBy === "payment"){

        return a.operation_type.localeCompare(b.operation_type) * (asc ? 1 : -1)

      }else if(sortedBy === "amount"){

        return (parseFloat(a.amount) - parseFloat(b.amount)) * (asc ? 1 : -1)

      }else{

        return 0
      }

    }

  }

  async loadData(){
    let res = await transactionsAPI()
    res.transactions.sort(this.sort(this.state.sortedBy, this.state.asc))
    this.setState({
      transactions: res.transactions
    })
  }

  handleClick(e){

    let sortedBy = e.target.attributes.value.value

    let asc = (this.state.sortedBy === sortedBy ? !this.state.asc : this.state.asc)

    let trans = this.state.transactions

    this.setState({
      sortedBy: sortedBy,
      transactions: trans.sort(this.sort(sortedBy, asc)),
      asc: asc
    })

  }

  componentDidMount(){
   this.loadData()
  }

  render() {

    var transactions = this.state.transactions.map(function(trans){
      
      var date = new Date(trans.created_at)
      
      return <Transaction  
        key={trans.id} 
        date={date.toLocaleDateString()}
        counterparty={trans.counterparty_name}
        amount={trans.amount + " " + trans.currency}
        payment={trans.operation_type} 
        attachements={trans.attachements[0].url}
      />
    
    })

    return (
      <div className="Table">
        <div className="Table-panel">
          <div className="Table-wrap">
            <div className="Transaction">
              <div className="Trans-date" onClick={this.handleClick} value="date">Date</div>
              <div className="Trans-cp" onClick={this.handleClick} value="cp">Counterparty Name</div>
              <div className="Trans-payment" onClick={this.handleClick} value="payment">Payment type</div>
              <div className="Trans-amount" onClick={this.handleClick} value="amount">Amount</div>
              <div className="Trans-attach"><span>📎</span></div>
            </div>
            {transactions}
          </div>
        </div>
      </div>
    )
  }
}