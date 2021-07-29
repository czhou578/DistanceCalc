import React, { Component, useEffect, useRef, useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import styles from './satisForm.module.css'

export default function(props) {
  const [userFirstName, setUserFirstName] = useState('')
  const [userLastName, setUserLastName] = useState('')
  const [count, setCount] = useState(0)
  const ref1 = useRef();

  useEffect(() => {
    console.log('hello')
  })

  function incrementCount(count) {
    if (count == 10) {
      console.log('this cannot happen')
    }
    setCount(count => count + 1)
  }

  return (
    <div>
      <h1>Want to Subscribe?</h1>
      <div className={styles['text-wrapper']}>
        <TextField id="standard-basic" label="First Name" color="red"/>
        <div>
          <TextField id="standard-basic2" label="Last Name" color="red"/>
        </div>
        <div>
          <TextField id="standard-basic3" label="Email Address" color="red"/>
        </div>
        <div className={styles.rating}>
          Rating (1-10)
          <button onClick={incrementCount} className={styles.btn}>
            +
          </button>
          <div ref={ref1}>{count}</div>
        </div>
        <Button variant="contained" color="primary">
          Submit
        </Button>
      </div>

    </div>
  )
}