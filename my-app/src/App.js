import SignUp from "./components/SignUp";
import "./App.css";
import "./components/ResultCard";
import React, { Component } from "react";
import About from "./components/About";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Home from "./Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";
import GeoInputBox from "./components/GeoInputBox";
import SampleDataTable from "./components/SampleDataTable";
import Map from "./components/Map";

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
                <Link to="/map">
                  <li>Map</li>
                </Link>
              </ul>
            </nav>
          </div>
          <Switch>
            <PrivateRoute path="/Profile" component={Profile} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <Route exact path="/" component={Home} />
            <Route path="/About" component={About} />
            <Route path="/SignUp" component={SignUp} />
            <Route path="/LogIn" component={Login} />
            <Route path="/geobox" component={GeoInputBox} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/sampleData" component={SampleDataTable} />
            <Route path="/map" component={Map} />
          </Switch>
        </div>
      </Router>
    );
  }
}
