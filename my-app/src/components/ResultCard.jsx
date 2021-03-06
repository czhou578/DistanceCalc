import { Component } from "react";
import "./citybox.css";
import "./InitialCityBox";

export default class ResultCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let distanceDisplay;
    let timeDisplay;
    let deleted = this.props.deleteData;

    if (deleted == false && this.props.didChangeDistance != null) {
      distanceDisplay = (
        <h2 id="distance">Distance: {this.props.didChangeDistance} miles</h2>
      );
      timeDisplay = (
        <h2 id="travelTime">Travel time: {this.props.didChangeTime()} </h2>
      );
    } else {
      distanceDisplay = <h2 id="distance">Distance: </h2>;
      timeDisplay = <h2 id="travelTime">Travel time: </h2>;
    }

    return (
      <div className="result">
        {distanceDisplay}
        {timeDisplay}
      </div>
    );
  }
}
