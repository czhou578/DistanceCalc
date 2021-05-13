import React from 'react';
import { Component } from 'react';
import Button from '@material-ui/core/Button';
import ReactDOM from 'react-dom';


export default class GeoInputBox extends Component {
  constructor(props) {
    super(props)
    this.props = props
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

  componentDidMount = () => {
    this.returnGeoData()
  } 

  returnGeoData = () => {
    const enteredFirstCity = ReactDOM.findDOMNode(this.firstRef.current)
    console.log(enteredFirstCity.value)
    const enteredSecondCity = ReactDOM.findDOMNode(this.secondRef.current)

    if (enteredFirstCity != null || enteredSecondCity != null) {
      this.setState({firstCity: enteredFirstCity, secondCity: enteredSecondCity}, 
        function() {
          const data = {"location": this.state.firstCity, "options": {"thumbMaps": false}}
          //const data2 = {"location": enteredSecondCity, "options": {"thumbMaps": false}}
  
          fetch('http://www.mapquestapi.com/geocoding/v1/address?key=HACo4SAj1MJfWSocfZTAEkOOlHd0xrIB', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          })
          .then(res => {return res.json()})
          .then(data => {
            this.setState({firstCityLatitude: data.results[1][1].lat})
          })
  
          // fetch('http://www.mapquestapi.com/geocoding/v1/address?key=HACo4SAj1MJfWSocfZTAEkOOlHd0xrIB'), {
          //   method: 'POST',
          //   headers: {
          //     'Content-type': 'application/json',
          //   },
          //   body: JSON.stringify(data2)
          // }
          // .then(res => {return res.json()})
          .catch(error => console.log('ERROR'))
        })
    }

  }


  render() {
    return (
      <div>
        <div>
          <form action="submit">
            <input type="text" placeholder="Enter first city" ref={this.firstRef}/>
          </form>
          <form action="submit">
            <input type="text" placeholder="Enter second city" ref={this.secondRef}/>
          </form>
          <div>
            <Button type="submit" variant="contained" color="primary" onClick={this.componentDidMount()} >
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