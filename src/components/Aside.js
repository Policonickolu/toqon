import React, { Component } from 'react';
import './Aside.css';


export default class Aside extends Component {
  

  render() {

    var display; 

    if(this.props.data.selected){

      display = <ul><h3>Selected Transactions ID</h3>{ this.props.data.selected.map( (el) => { return <li>{el}</li> } ) }</ul>

    }else if(this.props.data.details){

      let det = this.props.data.details
  
      display = <ul><h3>Selected Transaction</h3><li>{det.date}</li><li>{det.counterparty}</li><li>{det.payment}</li><li>{det.amount}</li><li><a href={det.attachements}><span>📎</span></a></li></ul>
    
    }else{

      display = <p className="Aside-message">Click on one or several transactions to see details</p>

    }


    return (
      <div className="Aside">
        <div className="Aside-header"></div>
        {display}
      </div>
    );
  }
}