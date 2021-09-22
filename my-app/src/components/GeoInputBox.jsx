import React from 'react';
import { Component } from 'react';
import Button from '@material-ui/core/Button';
import './geobox.css'
import ReplayRoundedIcon from '@material-ui/icons/ReplayRounded';
import { StylesProvider } from "@material-ui/core/styles";
import LatLongDisplay from './LatlongDisplay';
import { connect } from 'react-redux';

export class GeoInputBox extends Component {
  constructor(props) {
    super(props)
    this.props = props
    this.state = {
      didReset: false
    }
  }

  reset = () => {
    document.getElementById('first-city').value = '';
    document.getElementById('second-city').value = '';
    return this.setState({didReset: true})
  }

  componentDidUpdate = async () => {
    console.log('location1: ' + this.props.geoFirstCity)
    const data = {"location": this.props.geoFirstCity, "options": {"thumbMaps": false}} //correct
    const data2 = {"location": this.props.geoSecondCity, "options": {"thumbMaps": false}}

    try {
      Promise.all([
        fetch('http://www.mapquestapi.com/geocoding/v1/address?key=HACo4SAj1MJfWSocfZTAEkOOlHd0xrIB', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        }).then((res) => res.json()),
        
        fetch('http://www.mapquestapi.com/geocoding/v1/address?key=HACo4SAj1MJfWSocfZTAEkOOlHd0xrIB', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data2)
  
        }).then((res) => res.json())
  
      ]) .then(([urlOne, urlTwo]) => { //retrieving data properly
      var test = JSON.parse(JSON.stringify(urlOne.results[0].locations[0]))
      return Promise.all([test, urlTwo])

    })
    .then(data => {

      this.props.retrievedFirstCityResults(data[0].displayLatLng.lat, data[0].displayLatLng.lng)
      var test2 = JSON.parse(JSON.stringify(data[1].results[0].locations[0]))
      return Promise.resolve(test2)

    }) .then(data => {
      this.props.retrievedSecondCityResults(data.displayLatLng.lat, data.displayLatLng.lng)
    })
      
    } catch (error) {
      console.log(error)
    }
  }

  returnGeoData = () => {
    const enteredFirstCity = document.getElementById('first-city')
    const enteredSecondCity = document.getElementById('second-city')

    if (enteredFirstCity.value == '' || enteredSecondCity.value == '') {
      return
    }

    this.props.enteredGeoCities(enteredFirstCity.value, enteredSecondCity.value) //store in redux
  }

  render() {
    const states = [this.props.firstCityLatitude, this.props.firstCityLongitude, this.props.secondCityLatitude, this.props.secondCityLongitude]
    return (
      <div>
        <div className="logo-descrip">
          <span>Reset</span>
          <StylesProvider injectFirst>
            <ReplayRoundedIcon onClick={this.reset}></ReplayRoundedIcon>
          </StylesProvider>
        </div>        
        <div>
          <h1>First City </h1>
          <form action="submit" id="form-1">
            <input type="text" placeholder="Enter first city" ref={this.firstRefR} id="first-city"/>
          </form>
          <h1>Second City </h1>
          <form action="submit" id="form-2">
            <input type="text" placeholder="Enter second city" ref={this.secondRef} id="second-city"/>
          </form>
          <div>
            <Button type="submit" variant="contained" color="primary" onClick={this.returnGeoData} >
              Calculate
            </Button>
          </div>
        </div>
        <div id="display-container">
          <LatLongDisplay citiesInfo={states}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    geoFirstCity: state.geoCityReducer.cityOne,
    geoSecondCity: state.geoCityReducer.cityTwo,
    firstCityLatitude: state.firstGeoCityReducerResults.firstCityLatitude,
    firstCityLongitude: state.firstGeoCityReducerResults.firstCityLongitude,
    secondCityLatitude: state.firstGeoCityReducerResults.secondCityLatitude,
    secondCityLongitude: state.firstGeoCityReducerResults.secondCityLongitude

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    enteredGeoCities: (cityOne, cityTwo) => { dispatch({type: 'saveGeoCities', cityOne: cityOne, cityTwo: cityTwo})},
    retrievedFirstCityResults: (latitude, longitude) => { dispatch({type: 'firstCityResults', c1Latitude: latitude, c1Longitude: longitude})},
    retrievedSecondCityResults: (latitude, longitude) => { dispatch({type: 'secondCityResults', c2Latitude: latitude, c2Longitude: longitude})}
  
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GeoInputBox)




