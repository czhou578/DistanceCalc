import React from 'react';
import { Component } from 'react';
import Button from '@material-ui/core/Button';


export default class GeoInputBox extends Component {
  constructor(props) {
    super(props)
    this.firstRef = React.createRef()
    this.secondRef = React.createRef()

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