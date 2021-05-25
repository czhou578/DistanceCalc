import React from 'react';
import { Component } from 'react';
import Button from '@material-ui/core/Button';
import ReactDOM from 'react-dom';


export default class GeoInputBox extends Component {
  constructor(props) {
    super(props)
    this.props = props

    this.state = {
      data: [
        {
          firstCity: "",
          secondCity: "",
          firstCityLatitude: "",
          secondCityLatitude: "",
          firstCityLongitude: "",
          secondCityLongitude: "",
        }
      ]
    }
  }

  returnGeoData = () => {
    const enteredFirstCity = document.getElementById('first-city')
    const enteredSecondCity = document.getElementById('second-city')
    
    this.setState({firstCity: enteredFirstCity.value, secondCity: enteredSecondCity.value}, 
      function() {
        const data = {"location": this.state.firstCity, "options": {"thumbMaps": false}}
        const data2 = {"location": this.state.secondCity, "options": {"thumbMaps": false}}

        Promise.all([

          fetch('http://www.mapquestapi.com/geocoding/v1/address?key=HACo4SAj1MJfWSocfZTAEkOOlHd0xrIB', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          }).then(res => res.json()),

          fetch('http://www.mapquestapi.com/geocoding/v1/address?key=HACo4SAj1MJfWSocfZTAEkOOlHd0xrIB', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data2)

          }).then(res => res.json())

         // results[0].locations[0].displayLatLng.lat
        ]).then(([urlOne, urlTwo]) => { //retrieving data properly
          // let first = urlOne.json()
          console.log(urlOne)
          console.log(urlTwo)

          var test = JSON.parse(JSON.stringify(urlOne.results[0].locations[0]))
          return Promise.all([test, urlTwo])

        })
        .then(data => {
          this.setState({firstCityLatitude: data[0].displayLatLng.lat, firstCityLongitude: data[0].displayLatLng.lng})
          console.log(data[0].displayLatLng.lat)
          console.log(data[0].displayLatLng.lng)

          var test2 = JSON.parse(JSON.stringify(data[1].results[0].locations[0]))
          return Promise.resolve(test2)

        }) .then(data => {
          this.setState({secondCityLatitude: data.displayLatLng.lat, secondCityLongitude: data.displayLatLng.lng})

          console.log(data.displayLatLng.lat)
          console.log(data.displayLatLng.lng)

        })
        // .then(data => {
        //   this.setState({firstCityLatitude: data[0].displayLatLng.lat, firstCityLongitude: data[0].displayLatLng.lng})
        //   console.log(data[0].displayLatLng.lat)
        //   console.log(data[0].displayLatLng.lng)

        //   // console.log('hello' + JSON.stringify(data[1].results[0].locations[0]))
        //   console.log(data[1].displayLatLng.lat)
        //   console.log(data[1].displayLatLng.lng)
          
        //   return data[1]
        //   // return Promise.all(test)
        // })
        // .then(data => {
        //   console.log(data)
          
        //   // return Promise.resolve(test2)
        // })
        
        // .then(data => {
        //   return data[1].json()

        // }).then(data => {
        //   const data2 = JSON.parse(JSON.stringify(data.results[0].locations[0]))
        //   return Promise.resolve(data2)

        // }).then(data => {
        //   this.setState({secondCityLatitude: data.displayLatLng.lat, secondCityLongitude: data.displayLatLng.lng})

        // })
         
      })
  }

  render() {

    return (
      <div>
        <div>
          <form action="submit">
            <input type="text" placeholder="Enter first city" ref={this.firstRefR} id="first-city"/>
          </form>
          <form action="submit">
            <input type="text" placeholder="Enter second city" ref={this.secondRef} id="second-city"/>
          </form>
          <div>
            <Button type="submit" variant="contained" color="primary" onClick={this.returnGeoData} >
              Calculate
            </Button>
            <Button variant="contained" color="secondary">
              Reset
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

//