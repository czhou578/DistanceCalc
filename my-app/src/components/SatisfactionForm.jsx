import React, { useCallback, useEffect, useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import styles from './satisForm.module.css'
import { Formik } from 'formik';
import * as yup from 'yup';
import IncrementBtn from './IncrementBtn';
import { useDispatch } from 'react-redux';

export default function SatisfactionForm(props) {
  const [reset, didReset] = useState(false)
  const initialValues = {
    firstName: '',
    lastName: '',
    email: ''
  }

  useEffect(() => {

  }, [])
  
  const dispatch = useDispatch()

  const submitCallback = useCallback(() => {
    dispatch({type: 'SUBMITTED'})
  })

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
                    <Button variant="contained" disabled={!dirty || !isValid} color="primary" type="submit" onClick={() => {didReset(!reset); submitCallback()}}>
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