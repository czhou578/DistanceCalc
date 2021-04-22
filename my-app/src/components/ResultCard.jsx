import React, { Component } from 'react';
import './InitialCityBox'
import './citybox.css'

export default class ResultCard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="result">
        <h2>Distance: {this.props.didChangeDistance}</h2>
        <h2>Travel time: {this.props.didChangeTime()} </h2>
      </div>
    )
  }
}

