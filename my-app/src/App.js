import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import "./App.css";
import About from "./components/About";
import Countries from "./components/Countries";
import ForgotPassword from "./components/ForgotPassword";
import GeoInputBox from "./components/GeoInputBox";
import Login from "./components/Login";
import MapComponent from "./components/Map";
import "./components/ResultCard";
import SampleDataTable from "./components/SampleDataTable";
import SignUp from "./components/SignUp";
import Home from "./Home";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.refer = React.createRef();
  }

  componentDidMount() {
    const script = document.createElement("script");
    script.src = "test2.js";
    script.type = "text/babel";
    script.async = true;

    document.body.appendChild(script);
  }

  render() {
    return (
      <Router>
        <div>
          <div className="navbar-container">
            <nav>
              <ul>
                <Link to="/">
                  <li>Home</li>
                </Link>
                <Link to="/About">
                  <li>About</li>
                </Link>
                <Link to="/geobox">
                  <li>Lat/Long Calculator</li>
                </Link>
                <Link to="/sampleData">
                  <li>Sample Data</li>
                </Link>
                <Link to="/countries">
                  <li>Countries</li>
                </Link>
                <Link to="/map">
                  <li>Map</li>
                </Link>
              </ul>
            </nav>
          </div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/About" component={About} />
            <Route path="/SignUp" component={SignUp} />
            <Route path="/LogIn" component={Login} />
            <Route path="/geobox" component={GeoInputBox} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/sampleData" component={SampleDataTable} />
            <Route path="/map" component={MapComponent} />
            <Route path={"/countries"} component={Countries} />
          </Switch>
        </div>
      </Router>
    );
  }
}
