// src/components/transport/AddTransport.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addTransport } from '../../services/api'; // Add transport API

const TransportAdd = () => {
  const navigate = useNavigate();

  const [transportData, setTransportData] = useState({
    vehicleType: '',
    route: { pickup: '', dropoff: '' },
    rate: '',
    availability: true,
    timeOfDay: 'Morning', // Default value
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('route.')) {
      setTransportData((prevState) => ({
        ...prevState,
        route: { ...prevState.route, [name.split('.')[1]]: value },
      }));
    } else {
      setTransportData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTransport(transportData);
      toast.success('Transport option added successfully!');
      setTimeout(() => {
        navigate('/transport'); // Navigate back to transport list
      }, 2000);
    } catch (error) {
      toast.error('Failed to add transport option.');
    }
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title as="h5">Add Transport</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="vehicleType">
            <Form.Label>Vehicle Type</Form.Label>
            <Form.Control
              type="text"
              name="vehicleType"
              value={transportData.vehicleType}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="route.pickup">
            <Form.Label>Pickup Location</Form.Label>
            <Form.Control
              type="text"
              name="route.pickup"
              value={transportData.route.pickup}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="route.dropoff">
            <Form.Label>Dropoff Location</Form.Label>
            <Form.Control
              type="text"
              name="route.dropoff"
              value={transportData.route.dropoff}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="rate">
            <Form.Label>Rate</Form.Label>
            <Form.Control
              type="number"
              name="rate"
              value={transportData.rate}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="availability">
            <Form.Check
              type="checkbox"
              name="availability"
              checked={transportData.availability}
              onChange={(e) => handleChange({ target: { name: 'availability', value: e.target.checked } })}
              label="Available"
            />
          </Form.Group>
          <Form.Group controlId="timeOfDay">
            <Form.Label>Time of Day</Form.Label>
            <Form.Select name="timeOfDay" value={transportData.timeOfDay} onChange={handleChange} required>
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Evening">Evening</option>
              <option value="Night">Night</option>
            </Form.Select>
          </Form.Group>
          <Button className="d-inline-flex my-3" variant="primary" type="submit">
            Add Transport
          </Button>
        </Form>
      </Card.Body>
      <ToastContainer />
    </Card>
  );
};

export default TransportAdd;