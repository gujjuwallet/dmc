import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { getItineraryById, addItinerary, updateItinerary, getPackages, getHotels, getTransports } from '../../services/api';

const AddItinerary = () => {
  const { id } = useParams(); // If editing, get the itinerary ID
  const navigate = useNavigate();

  const [itineraryData, setItineraryData] = useState({
    package: '',
    hotel: '',
    transport: '',
    additionalServices: '',
    startDate: '',
    endDate: '',
    price: '',
    availability: true,
  });

  const [packages, setPackages] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [transports, setTransports] = useState([]);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const packageData = await getPackages();
        const hotelData = await getHotels();
        const transportData = await getTransports();
        setPackages(packageData);
        setHotels(hotelData);
        setTransports(transportData);
      } catch (error) {
        toast.error('Failed to load dropdown data.');
      }
    };

    fetchDropdownData();
    
    if (id) {
      // Fetch itinerary if editing
      const fetchItinerary = async () => {
        try {
          const data = await getItineraryById(id);
          setItineraryData({
            ...data,
            additionalServices: data.additionalServices.join(', '),
          });
        } catch (error) {
          toast.error('Failed to load itinerary.');
        }
      };
      fetchItinerary();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setItineraryData({ ...itineraryData, [name]: checked });
    } else {
      setItineraryData({ ...itineraryData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...itineraryData,
      additionalServices: itineraryData.additionalServices.split(',').map(service => service.trim()),
    };

    try {
      if (id) {
        await updateItinerary(id, formattedData);
        toast.success('Itinerary updated successfully!');
      } else {
        await addItinerary(formattedData);
        toast.success('Itinerary added successfully!');
      }
      setTimeout(() => navigate('/itineraries'), 2000);
    } catch (error) {
      toast.error('Failed to save itinerary.');
    }
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title as="h5">{id ? 'Edit' : 'Add'} Itinerary</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="packageId">
            <Form.Label>Package</Form.Label>
            <Form.Select name="package" value={itineraryData.package} onChange={handleChange} required>
              <option value="">Select Package</option>
              {packages.map(pkg => <option key={pkg._id} value={pkg._id}>{pkg.name}</option>)}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="hotel">
            <Form.Label>Hotel</Form.Label>
            <Form.Select name="hotel" value={itineraryData.hotel} onChange={handleChange} required>
              <option value="">Select Hotel</option>
              {hotels.map(hotel => <option key={hotel._id} value={hotel._id}>{hotel.name}</option>)}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="transport">
            <Form.Label>Transport</Form.Label>
            <Form.Select name="transport" value={itineraryData.transport} onChange={handleChange} required>
              <option value="">Select Transport</option>
              {transports.map(transport => <option key={transport._id} value={transport._id}>{transport.vehicleType}</option>)}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="additionalServices">
            <Form.Label>Additional Services (comma separated)</Form.Label>
            <Form.Control
              type="text"
              name="additionalServices"
              value={itineraryData.additionalServices}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="startDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={itineraryData.startDate}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="endDate">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={itineraryData.endDate}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={itineraryData.price}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="availability">
            <Form.Check
              type="checkbox"
              name="availability"
              checked={itineraryData.availability}
              onChange={handleChange}
              label="Available"
            />
          </Form.Group>

          <Button className="my-3" type="submit">{id ? 'Update' : 'Add'} Itinerary</Button>
        </Form>
      </Card.Body>
      <ToastContainer />
    </Card>
  );
};

export default AddItinerary;
