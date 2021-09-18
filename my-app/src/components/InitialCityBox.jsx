import React from 'react';
import { Component } from 'react';
import ResultCard from './ResultCard'
import ReactDOM from 'react-dom';
import './citybox.css'
import Button from '@material-ui/core/Button';
import { StylesProvider } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import ReplayRoundedIcon from '@material-ui/icons/ReplayRounded';
import Log from './Log'
import { useDispatch } from 'react-redux';
import * as actionTypes from '../actions/index'
import { connect } from 'react-redux';

export class InitialCityBox extends Component {
  constructor(props) {
    super(props)
    this.props = props
    this.firstRef = React.createRef()
    this.secondRef = React.createRef()
    this.thirdRef = React.createRef()
    this.fourthRef = React.createRef()
    this.buttonRef = React.createRef()
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
      ],
      showLoading: false,
      deleteResultData: false
    }

    this.counter = 0;
  }

  theme = createMuiTheme({
    props: {
      MuiCircularProgress: {
        size: 20,
        thickness: 3.5
      },
    },
  });

  reset = () => {
    document.getElementById('first-form').value = ''
    document.getElementById('second-form').value = ''
    document.getElementsByClassName('states')[0].value = 'AL'
    document.getElementsByClassName('states')[1].value = 'AL'
    return this.setState({deleteResultData: true})
  }


  componentDidMount = () => {
    this.returnData()
  }

  showLoad = () => {
    return this.setState({showLoading: true})
  }

  returnData() {
    const startingCity = ReactDOM.findDOMNode(this.secondRef.current) 
    const selectAbbrev = ReactDOM.findDOMNode(this.firstRef.current); 
    const inputFinalCity = ReactDOM.findDOMNode(this.thirdRef.current)
    const inputFinalAbbrev = ReactDOM.findDOMNode(this.fourthRef.current)

    // useDispatch(actionTypes.saveFirstCity)
    this.props.enteredCities(startingCity.value, inputFinalCity.value);

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
        .then(res => {this.setState({showLoading: false}); return res.json()}) //returns a promise
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

  onClick = () => {
    this.setState({deleteResultData: false})
    this.showLoad()
    this.componentDidMount()
  }

  shouldComponentUpdate = (nextProps, nextState) => {

    // if (this.state.deleteResultData === false && nextState.deleteResultData === false && this.state.finalDistance != null && this.state.showLoading === false && nextState.showLoading === false) {
    //   return false;
    // }

    if (this.state.deleteResultData === false && nextState.deleteResultData === false && this.state.finalDistance != null && this.state.showLoading === false && nextState.showLoading === true) {
      return true;
    }

    if (this.state.deleteResultData === false && nextState.deleteResultData === false && this.state.finalDistance != null && this.state.showLoading === true && nextState.showLoading === false) {
      return false;
    }

    // if (this.state.finalDistance == null && nextState.finalDistance != null) {
    //   return true;
    // }

    // if (this.state.showLoading === true && nextState.showLoading === false) {
    //   return true;
    // } 


    return true;
  }
  
  render() {
    console.log(this.props);

    const show = this.state.showLoading

    return (
      <div>
        <div className="top-header">
          <h1>Current City</h1>
          <div className="logo-descrip">
            <span>Reset</span>
            <StylesProvider injectFirst>
              <ReplayRoundedIcon onClick={this.reset}></ReplayRoundedIcon>
            </StylesProvider>
          </div>
        </div>
        <div>
          <form action="submit">
            <input type="text"placeholder="Enter City" ref={this.secondRef} id="first-form" />
              <label htmlFor="states">State Abbrev.</label>
              <select name="states" className="states" ref={this.firstRef}>
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
          <input type="text"placeholder="Enter City" ref={this.thirdRef} className="input-2" id='second-form'/>
            <label htmlFor="states">State Abbrev.</label>
            <select name="states" className="states" ref={this.fourthRef}>
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

          <StylesProvider injectFirst>
            <Button type='submit' variant="contained" color="primary" onClick={this.onClick}>Submit</Button>
          </StylesProvider>
          <ThemeProvider theme={this.theme}>
            {show && <CircularProgress color="secondary" />}
          </ThemeProvider>
        </div>
        <div className="resultWrapper">
          <ResultCard didChangeDistance={this.state.finalDistance} didChangeTime={this.convertTimeMin} deleteData={this.state.deleteResultData}/>
        </div>
      </div>
        <div className="log-wrapper">
        <span>Search History</span>
          <Log logInfo={[this.state.cityName, this.state.stateAbbrev, this.state.finalCity, this.state.finalStateAbbrev, this.state.finalDistance, this.convertTimeMin, 
          this.state.deleteResultData]} loadingShow={this.state.showLoading}/>
        </div>
      </div>

    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    enteredCities: (startCity, endCity) => {dispatch(actionTypes.saveUserEnteredCities(startCity, endCity))}
  }
}

export default connect(null, mapDispatchToProps)(InitialCityBox)




