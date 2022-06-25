import { Component } from "react";
import "./components/home.css";
import InitialCityBox from "./components/InitialCityBox";
import "./components/ResultCard";
import SatisfactionForm from "./components/SatisfactionForm";

export default class Home extends Component {
  componentDidMount() {
    const script = document.createElement("script");
    script.src = "test2.js";
    script.type = "text/babel";
    script.async = true;

    document.body.appendChild(script);
  }

  render() {
    return (
      <div className="home">
        <div className="header">
          <h2>Route Time Calculator</h2>
          <div className="paragraph-wrapper">
            <p className="descrip">
              Enter one city in the US and choose where you want to go. The
              resulting distance will be calculated.
              <br></br>If the city you are looking for is not correct, an error
              will be thrown! Distance will be given in miles and <br></br> time
              will be given in hours and minutes. Any feedback is appreciated!
              This application uses the MapQuest API.{" "}
            </p>
          </div>
          <div className="box-container">
            <div className="from-box">
              <InitialCityBox />
            </div>
          </div>
          <div className="satisf-container">
            <SatisfactionForm />
          </div>
        </div>
        <footer>Copyright Colin Zhou 2020, 2022</footer>
      </div>
    );
  }
}
