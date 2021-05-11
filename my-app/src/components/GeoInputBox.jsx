import React from 'react';
import { Component } from 'react';
import Button from '@material-ui/core/Button';


export default class GeoInputBox extends Component {
  constructor(props) {
    super(props)
    this.firstRef = React.createRef()
    this.secondRef = React.createRef()

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
    const enteredFirstCity = ReactDOM.findDOMNode(this.firstRef.current)
    const enteredSecondCity = ReactDOM.findDOMNode(this.secondRef.current)

    this.setState({firstCity: enteredFirstCity, secondCity: enteredSecondCity}, 
      function() {
        const data = {"location": enteredFirstCity, "options": {"thumbmaps": false}}
        const data2 = {"location": enteredSecondCity, "options": {"thumbmaps": false}}
        fetch('http://www.mapquestapi.com/geocoding/v1/address?key=HACo4SAj1MJfWSocfZTAEkOOlHd0xrIB'), {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(data)
        },
        fetch('http://www.mapquestapi.com/geocoding/v1/address?key=HACo4SAj1MJfWSocfZTAEkOOlHd0xrIB'), {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(data2)
        }
        .then(res => {return res.json()})
      })
  }


  render() {
    return (
      <div>
        <div>
          <form action="submit">
            <input type="text" placeholder="Enter" ref={this.firstRef}/>
          </form>
          <form action="submit">
            <input type="text" placeholder="Enter" ref={this.secondRef}/>
          </form>
          <div>
            <Button variant="contained" color="primary">
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