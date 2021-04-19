import React from 'react';
import { Component } from 'react';
import ResultCard from './ResultCard'
import ReactDOM from 'react-dom';
import './citybox.css'


export default class InitialCityBox extends Component {
  constructor(props) {
    super(props)
    this.props = props
    this.firstRef = React.createRef()
    this.secondRef = React.createRef()
    this.thirdRef = React.createRef()
    this.fourthRef = React.createRef()
    this.buttonRef = React.createRef()
    this.componentDidMount = this.componentDidMount.bind(this)
    this.state = {
      data: [
        {
          cityName: '',
          stateAbbrev: '',
          finalCity: '',
          finalStateAbbrev: '',
          newSubmission: false
        },

        {
          finalDistance: null,
          finalTime: null
        }
      ]
    }
  }

  componentDidMount = () => {
    console.log('works')
    this.returnData()
  }

  returnData() {
    const startingCity = ReactDOM.findDOMNode(this.secondRef.current) 
    const selectAbbrev = ReactDOM.findDOMNode(this.firstRef.current);
    const inputFinalCity = ReactDOM.findDOMNode(this.thirdRef.current)
    const inputFinalAbbrev = ReactDOM.findDOMNode(this.fourthRef.current)
    var finished

    this.setState({cityName: startingCity.value, stateAbbrev: selectAbbrev.value, finalCity: inputFinalCity.value, finalStateAbbrev: inputFinalAbbrev.value
    , newSubmission: true},
      function() {
        const data = {"locations": [this.state.cityName, this.state.finalCity], "options": {"allToAll": false}}
        fetch('http://www.mapquestapi.com/directions/v2/routematrix?key=HACo4SAj1MJfWSocfZTAEkOOlHd0xrIB', {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        .then(res => {return res.json()}) //returns a promise
        .then((data) => {
          this.setState({finalDistance: data.distance[1] + " miles", finalTime: data.time[1]})
        })
        .catch(error => console.log('ERROR'))
      })
  }

  convertTimeMin = () => {
    if (this.state.finalTime === undefined) return ''
    let hours = Math.trunc((this.state.finalTime) / 3600)
    let remainingSec = this.state.finalTime - (hours * 3600) 
    let minutes = Math.trunc(remainingSec / 60)
    var finalTime = ""
    finalTime += hours + "hrs " 
    finalTime += minutes + "min"
    return finalTime
  }

  handleKeyPress = e => {
    e.preventDefault()
    if (e.keyCode === 13) {
      console.log(e.keyCode)
    }
    this.componentDidMount()
  }


  render() {
    return (
      <div>
        <h1>Current City</h1>
        <div>
          <form action="submit">
            <input type="text"placeholder="Enter City" ref={this.secondRef}/>
              <label htmlFor="states">State Abbrev.</label>
              <select name="states" id="states" ref={this.firstRef}>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
          </form>
          <h1>Destination City</h1>
          <div>
        <form action="submit">
          <input type="text"placeholder="Enter City" ref={this.thirdRef} onSubmit={this.handleKeyPress}/>
            <label htmlFor="states">State Abbrev.</label>
            <select name="states" id="states" ref={this.fourthRef}>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
          </form>
        <button type='submit' onClick={this.componentDidMount}>Submit</button>
        </div>
        <div className="resultWrapper">
          <ResultCard didChangeDistance={this.state.finalDistance} didChangeTime={this.convertTimeMin}/>
        </div>
      </div>
      </div>

    )
  }
}




