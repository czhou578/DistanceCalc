import React, { Component } from 'react';
import './InitialCityBox'
import './citybox.css'

export default class ResultCard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let distanceDisplay
    let timeDisplay
    let deleted = this.props.deleteData

    if (deleted == false) {
      distanceDisplay = <h2 id="distance">Distance: {this.props.didChangeDistance}</h2>
      timeDisplay = <h2 id="travelTime">Travel time: {this.props.didChangeTime()} </h2>

    } else {
      distanceDisplay = <h2 id="distance">Distance: </h2>
      timeDisplay = <h2 id="travelTime">Travel time: </h2>
    }

    return (
      <div className="result">
        {distanceDisplay}
        {timeDisplay}
      </div>
    )
  }
}

