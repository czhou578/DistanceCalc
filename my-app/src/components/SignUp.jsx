import React, {useRef, useState} from "react";
import {Form, Button, Card, Container, Alert} from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Login from "./Login";

export default function SignUp(props) {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth();
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match')
    }
    try {
      setError('')
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      
    } catch (error) {
      setLoading(false)
      setError('Failed to create an account')
    }

  }

  return (
    <AuthProvider> 
      <Router> 
      <Container className="d-flex align-items-center justify-content-center"
        style={{minHeight: "100vh"}}>
          <div className="w-100" style={{maxWidth: "400px"}}>
                <Switch>
                  <Route exact path="/LogIn" component={Login} />
                </Switch>
            <Card style={{backgroundColor: 'darkgreen'}}>
              <Card.Body>
                <h2 className="text-center mb-4" style={{color: 'white'}}>Sign Up</h2>
                  {error && <Alert variant="danger">{error}</Alert>}
                  <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" ref={emailRef} required/>
                    </Form.Group>
                    <Form.Group id="password">
                      <Form.Label color="green">Password</Form.Label>
                      <Form.Control type="password" ref={passwordRef} required/>
                    </Form.Group>
                    <Form.Group id="password-confirm">
                      <Form.Label>Password Confirmation</Form.Label>
                      <Form.Control type="password" ref={passwordConfirmRef} required/>
                    </Form.Group>
                    <Button type="submit" className="w-100" disabled={loading}>Sign Up</Button>
                  </Form>
              </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2" style={{color: 'white'}}>
              Already have an account? <Link to="/LogIn">Log In</Link>
            </div>
          </div>
      </Container>
      </Router>
    </AuthProvider>
  )
}