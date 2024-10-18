import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Toastify CSS
import { addHotel } from '../../services/api'; // Use the addHotel API function

const HotelAdd = () => {
  const [hotelData, setHotelData] = useState({
    name: '',
    location: '',
    contact: '',
    amenities: [],
    rooms: [{ roomType: '', rate: '' }], // Initialize with one empty room
    agentRate: '',
    corporateRate: '',
    availability: true,
  });
  
  const navigate = useNavigate();

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;
    
    // Handle room field changes separately
    if (name.startsWith('roomType') || name.startsWith('rate')) {
      const updatedRooms = [...hotelData.rooms];
      updatedRooms[index][name] = value;
      setHotelData({ ...hotelData, rooms: updatedRooms });
    } else if (name === 'amenities') {
      const amenitiesArray = value.split(',').map(item => item.trim()); // Split by comma and trim spaces
      setHotelData({ ...hotelData, [name]: amenitiesArray });
    } else {
      setHotelData({ ...hotelData, [name]: value });
    }
  };

  // Add new room field set
  const addRoom = () => {
    setHotelData({
      ...hotelData,
      rooms: [...hotelData.rooms, { roomType: '', rate: '' }],
    });
  };

  // Remove room field set
  const removeRoom = (index) => {
    const updatedRooms = hotelData.rooms.filter((room, roomIndex) => roomIndex !== index);
    setHotelData({ ...hotelData, rooms: updatedRooms });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contractRates = {
      agentRate: hotelData.agentRate,
      corporateRate: hotelData.corporateRate,
    };

    const finalData = {
      ...hotelData,
      contractRates,
    };

    try {
      const response = await addHotel(finalData); // Use the addHotel API function
      console.log(response)
      if (response.status === 201) {
        toast.success('Hotel added successfully!', {
          position: 'top-right',
          autoClose: 2000, // Auto close after 2 seconds
        });

        // Redirect to the hotel list page after a delay
        setTimeout(() => {
          navigate('/hotels');
        }, 2000);
      }
    } catch (error) {
      toast.error(`Error adding hotel: ${error.response ? error.response.data.message : error.message}`, {
        position: 'top-right',
        autoClose: 3000, // Auto close after 3 seconds
      });
      console.error('Error adding hotel:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title as="h5">Add New Hotel</Card.Title>
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
              value={hotelData.amenities.join(', ')} // Display as a comma-separated string
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
              value={hotelData.agentRate}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="corporateRate">
            <Form.Label>Corporate Rate</Form.Label>
            <Form.Control
              type="number"
              name="corporateRate"
              value={hotelData.corporateRate}
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
            Submit
          </Button>
        </Form>
         {/* Add ToastContainer for displaying notifications */}
         <ToastContainer />
      </Card.Body>
    </Card>
  );
};

export default HotelAdd;