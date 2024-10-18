import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addPackage } from '../../services/api'; // Ensure your package API function is defined
import { useParams, useNavigate } from 'react-router-dom';

const AddPackage = () => {
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState({
    name: '',
    description: '',
    tags: '',
    destinations: '',
    tripType: 'Domestic',
    isOneWay: false,
    departureAirport: '',
    returnAirport: '',
    domesticDetails: { cities: '', transport: '', accommodations: '', localAttractions: '' },
    internationalDetails: { visaRequired: false, currency: '', airportTransfer: false, layovers: '' },
    weekendDetails: { activities: '', duration: '', nearbyAttractions: '' },
    agentRate: 0,
    clientRate: 0,
    availability: true,
  });

  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setPackageData({ ...packageData, [name]: checked });
    } else if (name.includes('domesticDetails') || name.includes('internationalDetails') || name.includes('weekendDetails')) {
      const [section, field] = name.split('.');
      setPackageData({ ...packageData, [section]: { ...packageData[section], [field]: value } });
    } else {
      setPackageData({ ...packageData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...packageData,
      tags: packageData.tags.split(',').map(tag => tag.trim()),
      destinations: packageData.destinations.split(',').map(dest => dest.trim()),
    };
    console.log("Formatted Data:", formattedData);
    setLoading(true); // Set loading state
    try {
      await addPackage(formattedData); // API call to add package
      toast.success('Package added successfully!');
      setTimeout(() => {
        navigate('/packages'); // Redirect to hotel list
      }, 2000);
      // Resetting the form data after successful submission
      setPackageData({
        name: '',
        description: '',
        tags: '',
        destinations: '',
        tripType: 'Domestic',
        isOneWay: false,
        departureAirport: '',
        returnAirport: '',
        domesticDetails: { cities: '', transport: '', accommodations: '', localAttractions: '' },
        internationalDetails: { visaRequired: false, currency: '', airportTransfer: false, layovers: '' },
        weekendDetails: { activities: '', duration: '', nearbyAttractions: '' },
        agentRate: 0,
        clientRate: 0,
        availability: true,
      });
    } catch (error) {
      console.error("Error adding package:", error); // Log the error for debugging
      toast.error('Failed to add package. Please try again later.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title as="h5">Add New Package</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Package Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={packageData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={packageData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="tags">
            <Form.Label>Tags (comma separated)</Form.Label>
            <Form.Control
              type="text"
              name="tags"
              value={packageData.tags}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="destinations">
            <Form.Label>Destinations (comma separated)</Form.Label>
            <Form.Control
              type="text"
              name="destinations"
              value={packageData.destinations}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="tripType">
            <Form.Label>Trip Type</Form.Label>
            <Form.Select name="tripType" value={packageData.tripType} onChange={handleChange}>
              <option value="Domestic">Domestic</option>
              <option value="International">International</option>
              <option value="Weekend">Weekend</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="isOneWay">
            <Form.Check
              type="checkbox"
              name="isOneWay"
              label="One Way"
              checked={packageData.isOneWay}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="departureAirport">
            <Form.Label>Departure Airport</Form.Label>
            <Form.Control
              type="text"
              name="departureAirport"
              value={packageData.departureAirport}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="returnAirport">
            <Form.Label>Return Airport</Form.Label>
            <Form.Control
              type="text"
              name="returnAirport"
              value={packageData.returnAirport}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Conditional Fields Based on Trip Type */}
          {packageData.tripType === 'Domestic' && (
            <div>
              <h6>Domestic Details</h6>
              <Form.Group controlId="domesticDetails.cities">
                <Form.Label>Cities</Form.Label>
                <Form.Control
                  type="text"
                  name="domesticDetails.cities"
                  value={packageData.domesticDetails.cities}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="domesticDetails.transport">
                <Form.Label>Transport</Form.Label>
                <Form.Control
                  type="text"
                  name="domesticDetails.transport"
                  value={packageData.domesticDetails.transport}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="domesticDetails.accommodations">
                <Form.Label>Accommodations</Form.Label>
                <Form.Control
                  type="text"
                  name="domesticDetails.accommodations"
                  value={packageData.domesticDetails.accommodations}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="domesticDetails.localAttractions">
                <Form.Label>Local Attractions</Form.Label>
                <Form.Control
                  type="text"
                  name="domesticDetails.localAttractions"
                  value={packageData.domesticDetails.localAttractions}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
          )}

          {packageData.tripType === 'International' && (
            <div>
              <h6>International Details</h6>
              <Form.Group controlId="internationalDetails.visaRequired">
                <Form.Check
                  type="checkbox"
                  name="internationalDetails.visaRequired"
                  label="Visa Required"
                  checked={packageData.internationalDetails.visaRequired}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="internationalDetails.currency">
                <Form.Label>Currency</Form.Label>
                <Form.Control
                  type="text"
                  name="internationalDetails.currency"
                  value={packageData.internationalDetails.currency}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="internationalDetails.airportTransfer">
                <Form.Check
                  type="checkbox"
                  name="internationalDetails.airportTransfer"
                  label="Airport Transfer"
                  checked={packageData.internationalDetails.airportTransfer}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="internationalDetails.layovers">
                <Form.Label>Layovers</Form.Label>
                <Form.Control
                  type="text"
                  name="internationalDetails.layovers"
                  value={packageData.internationalDetails.layovers}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
          )}

          {packageData.tripType === 'Weekend' && (
            <div>
              <h6>Weekend Details</h6>
              <Form.Group controlId="weekendDetails.activities">
                <Form.Label>Activities</Form.Label>
                <Form.Control
                  type="text"
                  name="weekendDetails.activities"
                  value={packageData.weekendDetails.activities}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="weekendDetails.duration">
                <Form.Label>Duration</Form.Label>
                <Form.Control
                  type="text"
                  name="weekendDetails.duration"
                  value={packageData.weekendDetails.duration}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="weekendDetails.nearbyAttractions">
                <Form.Label>Nearby Attractions</Form.Label>
                <Form.Control
                  type="text"
                  name="weekendDetails.nearbyAttractions"
                  value={packageData.weekendDetails.nearbyAttractions}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
          )}

          <Form.Group controlId="agentRate">
            <Form.Label>Agent Rate</Form.Label>
            <Form.Control
              type="number"
              name="agentRate"
              value={packageData.agentRate}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="clientRate">
            <Form.Label>Client Rate</Form.Label>
            <Form.Control
              type="number"
              name="clientRate"
              value={packageData.clientRate}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="availability">
            <Form.Check
              type="checkbox"
              name="availability"
              label="Available"
              checked={packageData.availability}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Package'}
          </Button>
        </Form>
      </Card.Body>
      <ToastContainer />
    </Card>
  );
};

export default AddPackage;