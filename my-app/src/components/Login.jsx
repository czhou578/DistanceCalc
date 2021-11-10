import React, {useRef} from "react";
import {Form, Button, Card } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"


export default function Login(props) {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
 
  return (
    <div>
      <Card style={{backgroundColor: 'darkgreen'}}>
        <Card.Body>
          <h2 className="text-center mb-4" style={{color: 'white'}}>Sign Up</h2>
            <Form>
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
              <Button type="submit" className="w-100">Sign Up</Button>
            </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2" style={{color: 'white'}}>
        Already have an account? Log In
      </div>
    </div>
  )
}