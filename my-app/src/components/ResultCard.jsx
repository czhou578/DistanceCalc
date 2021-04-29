import React, { Component } from 'react';
import './InitialCityBox'
import './citybox.css'

export default class ResultCard extends Component {
  constructor(props) {
    super(props)
  }

  didDeleteData = () => {
    console.log(this.props.deleteData)
    if (this.props.deleteData) {
      return document.getElementById('distance').innerHTML = 'Distance: '
    } else {
      return this.props.didChangeDistance
    }
  }

  render() {
    return (
      <div className="result">
        <h2 id="distance">Distance: {this.props.didChangeDistance} {this.didDeleteData}</h2>
        <h2 id="travelTime">Travel time: {this.props.didChangeTime()} </h2>
      </div>
    )
  }
}

