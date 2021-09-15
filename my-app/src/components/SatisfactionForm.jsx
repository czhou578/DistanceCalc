import React, { Component, useEffect, useRef, useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import styles from './satisForm.module.css'
import { Formik } from 'formik';
import * as yup from 'yup';
import { createStore, combineReducers} from 'redux';
import allReducers from '../reducers/index'

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
  }, [])

  const validationSchema = yup.object({
    firstName: yup.string().required('Required').min(1, 'Must enter an FirstName'),
    lastName: yup.string().required('Required').min(1, 'Must enter an lastName'),
    email: yup.string().required('Required').min(1, 'Must enter an email')
  })

  const store = createStore(allReducers)

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      validateOnChange={true}
      // onSubmit={reducer}
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
              <form action="submit" onReset={handleReset}>
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
                <div>
                  <h4>Give Rating</h4>
                  <p></p>
                <button className={styles.ratingBtn}>+</button>

                </div>
                <Button variant="contained" color="primary" isValid={isValid} isSubmitting={isSubmitting} dirty={dirty} type="submit">
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