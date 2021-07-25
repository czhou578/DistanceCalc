import React, { Component, useState } from 'react';
import { TextField } from '@material-ui/core';


export default function(props) {
  const [userFirstName, setUserFirstName] = useState('')
  const [userLastName, setUserLastName] = useState('')


  return (
    <div>
      <h1>Want to Subscribe?</h1>
      <div className="text-wrapper">
        <TextField id="standard-basic" label="Standard" color="red"/>

      </div>

    </div>
  )
}