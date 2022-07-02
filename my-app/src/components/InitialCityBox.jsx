import Button from "@material-ui/core/Button";
import { createTheme, StylesProvider } from "@material-ui/core/styles";
import ReplayRoundedIcon from "@material-ui/icons/ReplayRounded";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import "./citybox.css";
import Log from "./Log";
import ResultCard from "./ResultCard";

export class InitialCityBox extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.firstRef = React.createRef();
    this.secondRef = React.createRef();
    this.thirdRef = React.createRef();
    this.fourthRef = React.createRef();
    this.buttonRef = React.createRef();
    this.state = {
      data: [
        {
          newSubmission: false,
        },
      ],
      deleteResultData: false,
      propsReceived: false,
    };
  }

  theme = createTheme({
    props: {
      MuiCircularProgress: {
        size: 20,
        thickness: 3.5,
      },
    },
  });

  reset = () => {
    document.getElementById("first-form").value = "";
    document.getElementById("second-form").value = "";
    document.getElementsByClassName("states")[0].value = "AL";
    document.getElementsByClassName("states")[1].value = "AL";
    return this.setState({ deleteResultData: true });
  };

  componentDidMount = () => {
    this.returnData();
  };

  componentDidUpdate = async (previousProps, previousState) => {
    const data = {
      locations: [
        this.props.userEnteredStartCity,
        this.props.userEnteredDestCity,
      ],
      options: { allToAll: false },
    };

    fetch(
      "http://www.mapquestapi.com/directions/v2/routematrix?key=HACo4SAj1MJfWSocfZTAEkOOlHd0xrIB",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => {
        return res.json();
      }) //returns a promise
      .then((data) => {
        this.props.retrievedInitCityResults(data.distance[1], data.time[1]);
        if (this.state.propsReceived === false) {
          this.setState({ propsReceived: true });
        }
      })
      .catch((error) => console.log(error));
  };

  returnData() {
    const startingCity = ReactDOM.findDOMNode(this.secondRef.current);
    const selectAbbrev = ReactDOM.findDOMNode(this.firstRef.current);
    const inputFinalCity = ReactDOM.findDOMNode(this.thirdRef.current);
    const inputFinalAbbrev = ReactDOM.findDOMNode(this.fourthRef.current);

    if (startingCity.value === "" || inputFinalCity.value === "") {
      return;
    }

    this.props.enteredCities(
      startingCity.value,
      inputFinalCity.value,
      selectAbbrev.value,
      inputFinalAbbrev.value
    );
    this.setState({ newSubmission: true });
  }

  convertTimeMin = () => {
    if (this.props.resultTime === undefined) return "";
    let hours = Math.trunc(this.props.resultTime / 3600);
    let remainingSec = this.props.resultTime - hours * 3600;
    let minutes = Math.trunc(remainingSec / 60);
    var finalTime = "";
    finalTime += hours + "hrs ";
    finalTime += minutes + "min";
    return finalTime;
  };

  onClick = () => {
    this.setState({ deleteResultData: false });
    this.componentDidMount();
  };

  didAllPropsChange = () => {
    if (
      this.props.resultDistance !== null &&
      this.props.resultTime !== null &&
      this.props.userEnteredStartCity !== "" &&
      this.props.userEnteredDestCity !== ""
    ) {
      return true;
    }
    return false;
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    if (
      this.didAllPropsChange() === false &&
      nextProps.resultDistance !== null &&
      nextProps.resultTime !== null
    ) {
      return false;
    }

    if (
      this.state.deleteResultData === false &&
      nextState.deleteResultData === false &&
      nextProps.userEnteredStartCity === "" &&
      nextProps.userEnteredDestCity === ""
    ) {
      console.log("joma tech");
      return false;
    }
    console.log("props changed right: " + this.didAllPropsChange());
    console.log("startcity: " + nextProps.userEnteredStartCity);
    console.log("finalcity: " + nextProps.userEnteredDestCity);
    console.log("distance: " + nextProps.resultDistance);
    console.log("time: " + nextProps.resultTime);

    return true;
  };

  render() {
    return (
      <div className="citybox-wrapper">
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
            <input
              type="text"
              placeholder="Enter City"
              ref={this.secondRef}
              id="first-form"
            />
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
              <input
                type="text"
                placeholder="Enter City"
                ref={this.thirdRef}
                className="input-2"
                id="second-form"
              />
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
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={this.onClick}
              >
                Submit
              </Button>
            </StylesProvider>
          </div>
          <div className="resultWrapper">
            <ResultCard
              didChangeDistance={this.props.resultDistance}
              didChangeTime={this.convertTimeMin}
              deleteData={this.state.deleteResultData}
            />
          </div>
        </div>
        <div className="log-wrapper">
          <span>Search History</span>
          <Log
            logInfo={[
              this.props.userEnteredStartCity,
              this.props.enteredStartCityAbrev,
              this.props.userEnteredDestCity,
              this.props.enteredEndCityAbrev,
              this.props.resultDistance,
              this.convertTimeMin,
              this.state.deleteResultData,
            ]}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userEnteredStartCity: state.cityReducer.userEnteredFromCity,
    userEnteredDestCity: state.cityReducer.userEnteredToCity,
    enteredStartCityAbrev: state.cityReducer.startCityAbrev,
    enteredEndCityAbrev: state.cityReducer.endCityAbrev,
    resultDistance: state.retrievedInitCityResults.distance,
    resultTime: state.retrievedInitCityResults.travelTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    enteredCities: (startCity, endCity, startCityAbrev, endCityAbrev) => {
      dispatch({
        type: "saveUserEnteredCities",
        startCity: startCity,
        endCity: endCity,
        startCityAbrev: startCityAbrev,
        endCityAbrev: endCityAbrev,
      });
    },
    retrievedInitCityResults: (finalDistance, finalTime) => {
      dispatch({
        type: "saveCityResults",
        distance: finalDistance,
        time: finalTime,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InitialCityBox);
