import React, { Component } from 'react';
import './InitialCityBox'

export default class ResultCard extends Component {
  constructor(props) {
    super(props)
  }

  myStyle = {
    position: "relative",
    width: "200px",
    height: '100px',
    left: '900px',
    bottom: '300px',
    backgroundColor: "lightBlue"
  }

  render() {
    return (
      <div className="result" style={this.myStyle}>
        <h2>Distance is {this.props.didChangeDistance} miles</h2>
        <h2>Travel time is {this.props.didChangeTime()} </h2>
      </div>
    )
  }
}

