import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getPackageById, updatePackage } from '../../services/api'; // Import your API functions

const EditPackage = () => {
  const { id } = useParams(); // Get the hotel ID from the URL
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

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        const data = await getPackageById(id); // Fetch package details
        const formattedData = {
          ...data,
          tags: Array.isArray(data.tags) ? data.tags.join(', ') : data.tags,
          destinations: Array.isArray(data.destinations) ? data.destinations.join(', ') : data.destinations,
        };
        
        setPackageData(formattedData);
      } catch (error) {
        toast.error('Failed to load package data.');
      }
    };

    fetchPackageData();
  }, [id]);

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
    try {
      await updatePackage(id, formattedData); // Make sure this API function is defined
      toast.success('Package updated successfully!');
      setTimeout(() => {
        navigate('/packages'); // Redirect to hotel list
      }, 2000);
    } catch (error) {
      toast.error('Failed to update package.');
    }
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title as="h5">Edit Package</Card.Title>
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
            <Form.Select name="tripType" value={packageData.tripType} onChange={handleChange} required>
              <option value="Domestic">Domestic</option>
              <option value="International">International</option>
              <option value="Weekend">Weekend</option>
            </Form.Select>
          </Form.Group>

          {/* Conditional Fields based on Trip Type */}
          {packageData.tripType === 'Domestic' && (
            <>
              <Form.Group controlId="domesticDetails.cities">
                <Form.Label>Cities</Form.Label>
                <Form.Control
                  type="text"
                  name="domesticDetails.cities"
                  value={packageData.domesticDetails.cities}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="domesticDetails.transport">
                <Form.Label>Transport</Form.Label>
                <Form.Control
                  type="text"
                  name="domesticDetails.transport"
                  value={packageData.domesticDetails.transport}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="domesticDetails.accommodations">
                <Form.Label>Accommodations</Form.Label>
                <Form.Control
                  type="text"
                  name="domesticDetails.accommodations"
                  value={packageData.domesticDetails.accommodations}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="domesticDetails.localAttractions">
                <Form.Label>Local Attractions</Form.Label>
                <Form.Control
                  type="text"
                  name="domesticDetails.localAttractions"
                  value={packageData.domesticDetails.localAttractions}
                  onChange={handleChange}
                />
              </Form.Group>
            </>
          )}

          {packageData.tripType === 'International' && (
            <>
              <Form.Group controlId="internationalDetails.visaRequired">
                <Form.Check
                  type="checkbox"
                  name="internationalDetails.visaRequired"
                  checked={packageData.internationalDetails.visaRequired}
                  onChange={handleChange}
                  label="Visa Required"
                />
              </Form.Group>
              <Form.Group controlId="internationalDetails.currency">
                <Form.Label>Currency</Form.Label>
                <Form.Control
                  type="text"
                  name="internationalDetails.currency"
                  value={packageData.internationalDetails.currency}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="internationalDetails.airportTransfer">
                <Form.Check
                  type="checkbox"
                  name="internationalDetails.airportTransfer"
                  checked={packageData.internationalDetails.airportTransfer}
                  onChange={handleChange}
                  label="Airport Transfer Included"
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
            </>
          )}

          {packageData.tripType === 'Weekend' && (
            <>
              <Form.Group controlId="weekendDetails.activities">
                <Form.Label>Activities</Form.Label>
                <Form.Control
                  type="text"
                  name="weekendDetails.activities"
                  value={packageData.weekendDetails.activities}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="weekendDetails.duration">
                <Form.Label>Duration</Form.Label>
                <Form.Control
                  type="text"
                  name="weekendDetails.duration"
                  value={packageData.weekendDetails.duration}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="weekendDetails.nearbyAttractions">
                <Form.Label>Nearby Attractions</Form.Label>
                <Form.Control
                  type="text"
                  name="weekendDetails.nearbyAttractions"
                  value={packageData.weekendDetails.nearbyAttractions}
                  onChange={handleChange}
                />
              </Form.Group>
            </>
          )}

          <Form.Group controlId="isOneWay">
            <Form.Check
              type="checkbox"
              name="isOneWay"
              checked={packageData.isOneWay}
              onChange={handleChange}
              label="One Way Trip"
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
              checked={packageData.availability}
              onChange={handleChange}
              label="Available"
            />
          </Form.Group>

          <Button className="d-inline-flex my-3" variant="primary" type="submit">
            Update Package
          </Button>
        </Form>
      </Card.Body>
      <ToastContainer />
    </Card>
  );
};

export default EditPackage;