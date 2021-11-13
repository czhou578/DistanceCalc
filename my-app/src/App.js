import SignUp from './components/SignUp'
import './App.css';
import'./components/ResultCard'
import React, { Component } from 'react';
import About from './components/About';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { Link } from 'react-router-dom';
import Home from './Home';


export default class App extends Component {
  constructor(props) {
    super(props)
    this.refer = React.createRef()
  }

  componentDidMount() {
    const script = document.createElement("script");
    script.src = "test2.js";
    script.type = "text/babel"
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
                <Link to='/'>
                  <li>Home</li>
                </Link>
                <Link to='/About'>
                  <li>About</li>
                </Link>
                <Link to='/SignUp'>
                  <li>Sign Up</li>
                </Link>
              </ul>
            </nav>
          </div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/About" component={About} />
            <Route path="/SignUp" component={SignUp} /> 
          </Switch>  
        </div>
      </Router>
    ); 
      
  }
}

