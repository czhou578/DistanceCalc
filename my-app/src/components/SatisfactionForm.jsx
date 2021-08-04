import React, { Component, useEffect, useRef, useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import styles from './satisForm.module.css'
import { Formik } from 'formik';
import * as yup from 'yup';
import { createStore } from 'redux';

export default function SatisfactionForm(props) {
  const [userFirstName, setUserFirstName] = useState('')
  const [userLastName, setUserLastName] = useState('')
  const [count, setCount] = useState(1)
  const ref1 = useRef();
  const initialValues = {
    firstName: '',
    lastName: '',
    email: ''
  }

  useEffect(() => {
    console.log('hello')
  })

  const validationSchema = yup.object({
    firstName: yup.string().required('Required').min(1, 'Must enter an FirstName'),
    lastName: yup.string().required('Required').min(1, 'Must enter an lastName'),
    email: yup.string().required('Required').min(1, 'Must enter an email')
  })

  function incrementCount(count) {
    if (count == 10) {
      console.log('this cannot happen')
    }
    setCount(count => count + 1)
  }

  const fName = () => {
    return {
      type: 'addedFirstName'
    }
  }

  const lName = () => {
    return {
      type: 'addedLastName'
    }
  }

  const updateFirstNameReducer = (state = '', action) => {
    switch (action.type) {
      case 'addedFirstName':
        return state + "text"
      default:
        return state;
    } 
  }

  const updateLastNameReducer = (state = '', action) => {
    switch (action.type) {
      case 'addedLastName':
        return state + "text2"
      default:
        return state  
    }
  }

  let store = createStore(updateLastNameReducer)
  store.subscribe(() => console.log(store.state))

  store.dispatch(lName())

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      validateOnChange={true}
    >
      {(formProps) => {
        const {
          handleChange,
          handleSubmit,
          isValid,
          isSubmitting,
          dirty,
          values,
          handleBlur,
          handleReset,
          errors,
          touched,
          helperText
        } = formProps;
        return (
          <div>
            <h1>Want to Subscribe?</h1>
            <div className={styles['text-wrapper']}>
              <form action="submit" onSubmit={handleSubmit} onReset={handleReset}>
                <TextField 
                id="standard-basic" 
                label="First Name" 
                color="red"
                  onChange={handleChange}
                  name="firstName"
                  value={values.firstName}  
                  onBlur={handleBlur}
                  error={touched.firstName && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />
                <div>
                  <TextField 
                    id="standard-basic2" 
                    label="Last Name" 
                    color="red" 
                    value={values.lastName} 
                    onChange={handleChange} 
                    name="lastName" 
                    onBlur={handleBlur}
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}

                    />
                </div>
                <div>
                  <TextField 
                  id="standard-basic3" 
                  label="Email Address" 
                  color="red" 
                  value={values.email} 
                  onChange={handleChange} 
                  name="email" 
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}

                  />
                </div>
                <div className={styles.rating}>
                  Rating (1-10)
                  <button onClick={incrementCount} className={styles.btn}>
                    +
                  </button>
                  <div ref={ref1}>{count}</div>
                </div>
                <Button variant="contained" color="primary" isValid={isValid} isSubmitting={isSubmitting} dirty={dirty}>
                  Submit
                </Button>

              </form>
            </div>
          </div>
        )
      }}


    </Formik>
  )
}