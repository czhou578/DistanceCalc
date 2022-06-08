import "bootstrap/dist/css/bootstrap.min.css";
import React, { useRef, useState } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthProvider, useAuth } from "../contexts/AuthContext";

export default function ForgotPassword(props) {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch (error) {
      setError("Failed to reset password.");
    }

    setLoading(false);
  }

  return (
    <AuthProvider>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card style={{ backgroundColor: "darkgreen" }}>
            <Card.Body>
              <h2 className="text-center mb-4" style={{ color: "white" }}>
                Password Reset
              </h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="danger">{message}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Button type="submit" className="w-100" disabled={loading}>
                  Reset Password
                </Button>
              </Form>
              <div className="w-100 text-center mt-3">
                <Link to="/LogIn">Login</Link>
              </div>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2" style={{ color: "white" }}>
            Need an account? <Link to="/SignUp">Sign Up</Link>
          </div>
        </div>
      </Container>
    </AuthProvider>
  );
}
