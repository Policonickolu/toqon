import React, { Component } from 'react'
import './Amount.css'



export default class Amount extends Component {

  render() {
    
    return  <td className="Amount" onClick={this.props.onClick}>
              <tr>
                <td className="euro">
                  {this.props.euro}
                </td>
                <td className="arrow">
                  {
                    this.props.toggled
                      ? <span className="arrow-down"></span>
                      : <span className="arrow-up"></span>
                  }
                </td>
              </tr>

              <tr style={this.props.toggled ? {} : {display: 'none'}}>
                <td className="gbp">
                  {this.props.gbp}
                </td>
                <td>
                </td>
              </tr>
            </td>      

  }
}