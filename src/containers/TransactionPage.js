import React, { Component } from 'react'

import './TransactionPage.css';
import {transactionsAPI, euroToGbp} from '../api'
import TransactionList from '../components/TransactionList'
import Aside from '../components/Aside'


export default class TransactionPage extends Component {
  
  constructor(props){
    super(props)

    this.state = {
      transactions: [],
      sortedBy: "date",
      asc: false,
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

      }else if(sortedBy === "counterparty"){

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

    // We do as if the 3 last transactions were new

    res.transactions[0].recent = true
    res.transactions[1].recent = true
    res.transactions[2].recent = true

    /////

    res.transactions.map( (t) => {
      return t.gbp = euroToGbp(t.amount)
    })

    this.setState({
      transactions: res.transactions
    })
  }

  handleHeaderClick(e){

    var sortedBy = e.target.parentNode.attributes.class || e.target.attributes.class
    sortedBy = sortedBy.value

    var asc = (this.state.sortedBy === sortedBy ? !this.state.asc : this.state.asc)
    var trans = this.state.transactions

    this.setState({
      sortedBy: sortedBy,
      transactions: trans.sort(this.sort(sortedBy, asc)),
      asc: asc
    })

  }

  handleClick(e){
    
    var target = e.target;

    while(!target.attributes.index) {

      target = target.parentNode

    }

    var id = target.attributes.index.value


    var shiftKey = e.shiftKey

    this.setState(prevState => {
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

    var transactions = this.state.transactions.map(function(t, index){

      var amount = (t.debit ? '− ' : '+ ') + (Math.abs(t.amount) + ' ').replace('.',',') + t.currency
      var gbp = (t.debit ? '− ' : '+ ') + (Math.abs(t.gbp) + ' ').replace('.',',') + " GBP"
      var date = new Date(t.created_at).toLocaleDateString().replace(/\//g,'-')
      
      return {
        key           : index,
        index         : t.id,
        date          : date,
        counterparty  : t.counterparty_name,
        amount        : amount,
        gbp           : gbp,
        payment       : t.operation_type,
        attachements  : t.attachements,
        selected      : this.state.selected.includes(t.id),
        recent        : t.recent
      }
      
    }.bind(this))


    var data = {};

    if(this.state.selected.length === 1){
      for(var t of this.state.transactions){

        if(this.state.selected.includes(t.id)){
          
          let date = new Date(t.created_at).toLocaleDateString()
          let amount = (t.debit ? '− ' : '+ ') + (Math.abs(t.amount) + ' ').replace('.',',') + t.currency

          let d = {
            date          : date,
            counterparty  : t.counterparty_name,
            payment       : t.operation_type,
            amount        : amount,
            attachements  : t.attachements
          }
          data.details = d
        }

      }
    }else if(this.state.selected.length > 1){
      data.selected = this.state.selected
    }

    return (
      <div className="Page">
        <div className="Table">
          <div className="Table-wrap">

            <TransactionList  onHeaderClick={this.handleHeaderClick}
                              onClick={this.handleClick}
                              transactions={transactions}
                              sortedBy={this.state.sortedBy}
                              asc={this.state.asc} />
          </div>
        </div>
        <Aside data={data} />
      </div>
    )
  }
}