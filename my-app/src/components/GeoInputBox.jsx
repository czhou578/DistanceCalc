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

  componentDidMount = () => {
    this.returnGeoData()
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
          }),

          fetch('http://www.mapquestapi.com/geocoding/v1/address?key=HACo4SAj1MJfWSocfZTAEkOOlHd0xrIB'), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data2)
          }

        ])
        .then(data => {
          return data[0].json()
  
        }).then(data => {

          var test = JSON.parse(JSON.stringify(data.results[0].locations[0]))
          console.log(test)
          return Promise.resolve(test)
        
        }).then(data => {
          console.log(data.displayLatLng.lat)
          console.log(data.displayLatLng.lng)
        })
         
      })
  }
    
    // .then(allResponses => {
    //   const response = allResponses[0].json();
    //   const response2 = allResponses[1].json()
    //   return [response, response2]
    // }).then(dataArray => {
    //   console.log(dataArray[0])
    //   //this.setState({firstCityLatitude: dataArray.results[1][1].lat})
    //   // this.setState({firstCityLongitude: data.results[1][1].lng})

    // })

    // .then(res => {return res.json()})

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
            <Button type="submit" variant="contained" color="primary" onClick={this.componentDidMount} >
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