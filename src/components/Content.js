import React, { Component } from 'react'
import './Content.css';

import Transaction from './Transaction'
import Aside from './Aside'

import './Transaction.css';
import transactionsAPI from '../api'

export default class Content extends Component {
  
  constructor(props){
    super(props)

    this.state = {
      transactions:[],
      sortedBy: "date",
      asc: true,
      selected: []
    }

    this.loadData = this.loadData.bind(this)
    this.handleHeaderClick = this.handleHeaderClick.bind(this)
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

  handleHeaderClick(e){

    let sortedBy = e.target.attributes.value.value

    let asc = (this.state.sortedBy === sortedBy ? !this.state.asc : this.state.asc)

    let trans = this.state.transactions

    this.setState({
      sortedBy: sortedBy,
      transactions: trans.sort(this.sort(sortedBy, asc)),
      asc: asc
    })

  }

  handleClick(e){

    let id = e.target.parentNode.attributes.index || e.target.attributes.index
    id = id.value

    var shiftKey = e.shiftKey

    this.setState((prevState) => {
      let selected = prevState.selected.slice()
      
      if(shiftKey){
        if(selected.includes(id)){
          selected.splice(selected.indexOf(id), 1)
        }else{
          selected.push(id)
        }
      }else{
        if(selected.includes(id)){
          selected = []
        }else{
          selected = [id]
        } 
      }

      return {
        selected: selected
      }
    })

  }

  componentDidMount(){
    this.loadData()
  }

  render() {

    var transactions = this.state.transactions.map(function(trans, index){
      
      var date = new Date(trans.created_at)

      return <Transaction  
        key={index}
        index={trans.id} 
        date={date.toLocaleDateString()}
        counterparty={trans.counterparty_name}
        amount={trans.amount + " " + trans.currency}
        payment={trans.operation_type} 
        attachements={trans.attachements[0].url}
        selected={this.state.selected.includes(trans.id)}
        onClick={this.handleClick}
      />
    
    }.bind(this))


    var data = {};

    if(this.state.selected.length == 1){
      for(var trans of this.state.transactions){

        if(trans.id === this.state.selected[0]){
          
          var d = {}

          var date = new Date(trans.created_at)
          d.date = date.toLocaleDateString()
          d.counterparty = trans.counterparty_name
          d.payment = trans.operation_type
          d.amount = trans.amount + " " + trans.currency
          d.attachements = trans.attachements[0].url

          data.details = d
        }

      }
    }else if(this.state.selected.length > 1){
      data.selected = this.state.selected
    }

    return (
      <div className="Table">
        <div className="Table-panel">
          <div className="Table-wrap">
            <div className="Transaction">
              <div className="Trans-date" onClick={this.handleHeaderClick} value="date">Date</div>
              <div className="Trans-cp" onClick={this.handleHeaderClick} value="cp">Counterparty Name</div>
              <div className="Trans-payment" onClick={this.handleHeaderClick} value="payment">Payment type</div>
              <div className="Trans-amount" onClick={this.handleHeaderClick} value="amount">Amount</div>
              <div className="Trans-attach"><span>📎</span></div>
            </div>
            {transactions}
          </div>
        </div>
        <Aside data={data} />
      </div>
    )
  }
}