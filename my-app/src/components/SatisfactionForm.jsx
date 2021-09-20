import React, { Component, useEffect, useRef, useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import styles from './satisForm.module.css'
import { Formik } from 'formik';
import * as yup from 'yup';
import { Provider} from 'react-redux';
import IncrementBtn from './IncrementBtn';


export default function SatisfactionForm(props) {
  const [userFirstName, setUserFirstName] = useState('')
  const [userLastName, setUserLastName] = useState('')
  const [count, setCount] = useState(1)
  const [reset, didReset] = useState(false)
  const ref1 = useRef();
  const initialValues = {
    firstName: '',
    lastName: '',
    email: ''
  }

  useEffect(() => {
    
  }, [])

  const validationSchema = yup.object({
    firstName: yup.string().required('Required').min(1, 'Must enter an FirstName'),
    lastName: yup.string().required('Required').min(1, 'Must enter an lastName'),
    email: yup.string().required('Required').min(1, 'Must enter an email')
  })

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        validateOnChange={true}
        onSubmit={ (data, {resetForm}, e) => {
          resetForm()
        } }
      >
        {(formProps) => {
          const {
            handleChange,
            isSubmitting,
            dirty,
            isValid,
            values,
            handleBlur,
            handleReset,
            errors,
            touched,
            handleSubmit
          } = formProps;
          return (
              <div>
                <h1>Want to Subscribe?</h1>
                <div className={styles['text-wrapper']}>
                  <form action="submit" onReset={handleReset} onSubmit={handleSubmit}>
                    <TextField 
                    id="standard-basic" 
                    label="First Name" 
                    color="primary"
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
                        color="primary" 
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
                      color="primary" 
                      value={values.email} 
                      onChange={handleChange} 
                      name="email" 
                      onBlur={handleBlur}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      />
                    </div>
                    <div>
                      <h4>Give Rating (0-10)</h4>
                      <div className={styles.increDiv}>
                        <IncrementBtn state={reset} handler={didReset}/>
                      </div>
                    </div>
                    <Button variant="contained" disabled={!dirty || !isValid} color="primary" type="submit" onClick={() => didReset(!reset)}>
                      Submit
                    </Button>
                  </form>
                </div>
              </div>
          )
        }}
      </Formik>
    </div>
  )
}