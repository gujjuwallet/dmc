import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getHotelById, updateHotel } from '../../services/api'; // Import your API functions

const HotelEdit = () => {
  const { id } = useParams(); // Get the hotel ID from the URL
  const navigate = useNavigate();

  const [hotelData, setHotelData] = useState({
    name: '',
    location: '',
    contact: '',
    amenities: [],
    rooms: [{ roomType: '', rate: '' }], // Initialize with one empty room
    contractRates: {
      agentRate: '',
      corporateRate: '',
    },
    availability: true,
  });

  const [loading, setLoading] = useState(true); // To handle loading state

  // Fetch the hotel data when component loads
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await getHotelById(id); // Fetch hotel by ID
        setHotelData({
          name: response.data.name || '',
          location: response.data.location || '',
          contact: response.data.contact || '',
          amenities: response.data.amenities || [],
          rooms: response.data.rooms || [{ roomType: '', rate: '' }],
          contractRates: {
            agentRate: response.data.contractRates?.agentRate || '', // Ensure safe access
            corporateRate: response.data.contractRates?.corporateRate || '', // Ensure safe access
          },
          availability: response.data.availability !== undefined ? response.data.availability : true, // Default to true if not provided
        });
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        toast.error('Failed to fetch hotel details.');
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  // Handle input change
  const handleChange = (e, index = null) => {
    const { name, value } = e.target;
    
    if (name.startsWith('roomType') || name.startsWith('rate')) {
      const updatedRooms = [...hotelData.rooms];
      updatedRooms[index][name] = value;
      setHotelData({ ...hotelData, rooms: updatedRooms });
    } else if (name === 'amenities') {
      const amenitiesArray = value.split(',').map(item => item.trim());
      setHotelData({ ...hotelData, [name]: amenitiesArray });
    } else if (name === 'agentRate' || name === 'corporateRate') {
      // Handle contract rates separately
      setHotelData({ 
        ...hotelData, 
        contractRates: { 
          ...hotelData.contractRates, 
          [name]: value 
        } 
      });
    } else {
      setHotelData({ ...hotelData, [name]: value });
    }
  };

  // Add new room field
  const addRoom = () => {
    setHotelData({
      ...hotelData,
      rooms: [...hotelData.rooms, { roomType: '', rate: '' }],
    });
  };

  // Remove room field
  const removeRoom = (index) => {
    const updatedRooms = hotelData.rooms.filter((room, roomIndex) => roomIndex !== index);
    setHotelData({ ...hotelData, rooms: updatedRooms });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalData = {
      ...hotelData,
      contractRates: {
        agentRate: hotelData.contractRates.agentRate,
        corporateRate: hotelData.contractRates.corporateRate,
      },
    };

    try {
      const response = await updateHotel(id, finalData); // Use update API
      if (response.status === 200) {
        toast.success('Hotel updated successfully!', {
          position: 'top-right',
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate('/hotels'); // Redirect to hotel list
        }, 2000);
      }
    } catch (error) {
      toast.error(`Error updating hotel: ${error.response ? error.response.data.message : error.message}`, {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state until data is fetched
  }

  return (
    <Card>
      <Card.Header>
        <Card.Title as="h5">Edit Hotel</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="hotelName">
            <Form.Label>Hotel Name</Form.Label>
            <Form.Control type="text" name="name" value={hotelData.name} onChange={handleChange} required />
          </Form.Group>

          <Form.Group controlId="hotelLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control type="text" name="location" value={hotelData.location} onChange={handleChange} required />
          </Form.Group>

          <Form.Group controlId="hotelContact">
            <Form.Label>Contact</Form.Label>
            <Form.Control type="text" name="contact" value={hotelData.contact} onChange={handleChange} />
          </Form.Group>

          <Form.Group controlId="hotelAmenities">
            <Form.Label>Amenities (comma-separated)</Form.Label>
            <Form.Control
              type="text"
              name="amenities"
              value={hotelData.amenities.join(', ')}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Dynamic Room Fields */}
          {hotelData.rooms.map((room, index) => (
            <div key={index} className="mb-3">
              <Form.Group controlId={`roomType-${index}`}>
                <Form.Label>Room Type</Form.Label>
                <Form.Control
                  type="text"
                  name="roomType"
                  value={room.roomType}
                  onChange={(e) => handleChange(e, index)}
                  required
                />
              </Form.Group>

              <Form.Group controlId={`rate-${index}`}>
                <Form.Label>Rate</Form.Label>
                <Form.Control
                  type="number"
                  name="rate"
                  value={room.rate}
                  onChange={(e) => handleChange(e, index)}
                  required
                />
              </Form.Group>

              {/* Remove room button */}
              {index > 0 && (
                <Button className="d-inline-flex my-3" variant="danger" onClick={() => removeRoom(index)}>
                  Remove Room
                </Button>
              )}
            </div>
          ))}

          {/* Button to add new room field */}
          <Button variant="secondary" onClick={addRoom}>
            Add Another Room
          </Button>

          <Form.Group controlId="agentRate" className="mt-3">
            <Form.Label>Agent Rate</Form.Label>
            <Form.Control
              type="number"
              name="agentRate"
              value={hotelData.contractRates.agentRate}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="corporateRate">
            <Form.Label>Corporate Rate</Form.Label>
            <Form.Control
              type="number"
              name="corporateRate"
              value={hotelData.contractRates.corporateRate}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="hotelAvailability">
            <Form.Label>Availability</Form.Label>
            <Form.Check
              type="checkbox"
              name="availability"
              label="Available"
              checked={hotelData.availability}
              onChange={() => setHotelData({ ...hotelData, availability: !hotelData.availability })}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Update Hotel
          </Button>
        </Form>
        <ToastContainer />
      </Card.Body>
    </Card>
  );
};

export default HotelEdit;
