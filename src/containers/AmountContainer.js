import React, { Component } from 'react'


import Amount from '../components/Amount'


export default class AmountContainer extends Component {
  
  constructor(props){
    super(props)

    this.state = {
      toggled: false
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e){
    e.stopPropagation()

    console.log("lol")

    this.setState( prevState => ({ toggled: !prevState.toggled }) )

  }

  render() {

    return  <Amount euro={this.props.euro}
                    gbp={this.props.gbp}
                    onClick={this.handleClick}
                    toggled={this.state.toggled}/>

  }
}