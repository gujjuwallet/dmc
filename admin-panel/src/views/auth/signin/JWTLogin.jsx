import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { login } from '../../../services/authService'; // Updated login service

const JWTLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (email, password, setSubmitting) => {
    setLoading(true);
    try {
      const response = await login(email, password);
      setLoading(false);

      // Store the token and user data in localStorage
      sessionStorage.setItem('authToken', response.token);
      sessionStorage.setItem('user', JSON.stringify(response.user));

      // Navigate to the dashboard
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid login credentials');
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        handleLogin(values.email, values.password, setSubmitting);
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              className="form-control"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              type="email"
              placeholder="Email Address"
              value={values.email}
            />
            {touched.email && errors.email && <small className="text-danger form-text">{errors.email}</small>}
          </div>
          <div className="form-group mb-4">
            <input
              className="form-control"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              placeholder="Password"
              value={values.password}
            />
            {touched.password && errors.password && <small className="text-danger form-text">{errors.password}</small>}
          </div>

          {error && (
            <Alert variant="danger">
              {error}
            </Alert>
          )}

          <div className="custom-control custom-checkbox text-start mb-4 mt-2">
            <input type="checkbox" className="custom-control-input mx-2" id="customCheck1" />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>

          <Row>
            <Col>
              <Button
                className="btn-block mb-4"
                variant="primary"
                disabled={isSubmitting || loading}
                type="submit"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
            </Col>
          </Row>
        </form>
      )}
    </Formik>
  );
};

export default JWTLogin;