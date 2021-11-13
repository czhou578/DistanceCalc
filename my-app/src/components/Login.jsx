import React, {useRef, useState} from "react";
import {Form, Button, Card, Container, Alert} from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import SignUp from "./SignUp";

export default function Login(props) {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { signup } = useAuth();
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault();
 
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
                <Route exact path="/Sign-Up" component={SignUp} />
              </Switch>
          <Card style={{backgroundColor: 'darkgreen'}}>
            <Card.Body>
              <h2 className="text-center mb-4" style={{color: 'white'}}>Log In</h2>
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
                  <Button type="submit" className="w-100" disabled={loading}>Log In</Button>
                </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2" style={{color: 'white'}}>
            Need an account? <Link to="/Sign-Up">Sign Up</Link>
          </div>
        </div>
    </Container>
          </Router>
    </AuthProvider>
  )
}