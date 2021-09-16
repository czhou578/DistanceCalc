import InitialCityBox from './components/InitialCityBox';
import'./components/ResultCard'
import React, { Component } from 'react';
import GeoInputBox from './components/GeoInputBox';
import SatisfactionForm from './components/SatisfactionForm';
import './components/home.css'
import { Provider } from 'react-redux';
import allReducers from './reducers/index'
import { createStore, combineReducers, } from 'redux';


const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
export default class Home extends Component {
  constructor(props) {
    super(props)
    this.refer = React.createRef()
  }

  componentDidMount() {
    const script = document.createElement("script");
    script.src = "test2.js";
    script.type = "text/babel"
    script.async = true;

    document.body.appendChild(script);
  }



  render() {
    return (
      <div>
        <div className="header">
        <h2>Route Time Calculator</h2>
        <div>
          <p className="descrip">Enter one city in the US and choose where you want to go. The resulting distance will be calculated.
          <br></br>If the city you are looking for is not correct, an error will be thrown! Distance will be given in miles and <br></br> time
          will be given in hours and minutes. Any feedback is appreciated! This application uses the MapQuest API. </p>
        </div>
        <div className="box-container">
          <div className="from-box">
            <InitialCityBox ref={this.refer}/>
          </div>
        </div>
        <div className="longlat-explain">
          <div className="longitude-explain">
            <h2>How Longitude Works:</h2>
            <p>Longitude is a geographic coordinate that specifies
            the east-west position of a point on Earth's surface. It is
            usually expressed in degrees and by the Greek symbol lambda. </p>
          </div>
          <div className="latitude-explain">
            <h2>How Latitude Works</h2>
            <p>Latitude is the geographic coordinate that specifies <br></br>
            the north-south position of a point on Earth's surface. It is <br></br>
            an angle that ranges from 0 to 90, where 0 starts at the Equator<br></br>
            and 90 is at both the North and South Poles.</p>
          </div>
        </div>
        <div className="geobox-container">
          <h1>Use this calculator to find the latitude and longitude of two cities</h1>
          <GeoInputBox />
        </div>
        <div>
          <Provider store={store}> 
            <SatisfactionForm />
          </Provider>
        </div>
      </div>
    </div>

    )
  }
}