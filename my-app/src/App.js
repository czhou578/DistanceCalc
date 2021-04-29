import './App.css';
import InitialCityBox from './components/InitialCityBox';
import'./components/ResultCard'
import React, { Component } from 'react';
import Log from './components/Log'


export default class App extends Component {
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
        </div>

      </div>
  
    ); 
      
  }
}

