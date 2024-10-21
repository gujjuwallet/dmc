import React, { useEffect, useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getHotelById, updateHotel } from '../../services/api'; // Assuming these API services are defined

const HotelEdit = () => {
  const { id } = useParams(); // Get hotel ID from URL
  const navigate = useNavigate();

  const [hotelData, setHotelData] = useState({
    name: '',
    location: '',
    contact: '',
    description: '',
    amenities: [],
    facilities: [],
    rooms: [{ roomType: '', rate: '', roomAmenities: '', seasonalRates: [{ season: '', rate: '' }] }],
    contractRates: {
      agentRate: '',
      corporateRate: ''
    },
    specialContractRates: {
      weekendRate: '',
      longStayRate: ''
    },
    rating: '',
    cancellationPolicy: '',
    checkInTime: '',
    checkOutTime: '',
    availability: true,
  });

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await getHotelById(id);
        const data = response.data;
        setHotelData({
          ...data,
          amenities: data.amenities || [],
          facilities: data.facilities || [],
          rooms: data.rooms || [{ roomType: '', rate: '', roomAmenities: '', seasonalRates: [{ season: '', rate: '' }] }],
          contractRates: data.contractRates || [{ agentRate: '', corporateRate: ''}],
          specialContractRates: data.specialContractRates || [{ weekendRate: '', longStayRate: ''}],
        });
      } catch (error) {
        toast.error('Error fetching hotel details', { position: 'top-right' });
      }
    };
    
    fetchHotel();
  }, [id]);

  const handleChange = (e, roomIndex = null, seasonIndex = null) => {
    const { name, value, type, files} = e.target;

    if (type === 'file') {
      setHotelData({ ...hotelData, image: files[0] });  // Update image state
    } else if (roomIndex !== null && seasonIndex === null) {
      const updatedRooms = [...hotelData.rooms];
      updatedRooms[roomIndex][name] = value;
      setHotelData({ ...hotelData, rooms: updatedRooms });
    } else if (seasonIndex !== null) {
      const updatedRooms = [...hotelData.rooms];
      updatedRooms[roomIndex].seasonalRates[seasonIndex][name] = value;
      setHotelData({ ...hotelData, rooms: updatedRooms });
    } else if (name.startsWith('roomType') || name.startsWith('rate') || name.startsWith('roomAmenities')) {
      const updatedRooms = [...hotelData.rooms];
      updatedRooms[index][name] = value;
      setHotelData({ ...hotelData, rooms: updatedRooms });
    } else if (name.startsWith('season') || name.startsWith('seasonRate')) {
      const updatedRooms = [...hotelData.rooms];
      updatedRooms[index].seasonalRates[seasonIndex][name === 'season' ? 'season' : 'rate'] = value;
      setHotelData({ ...hotelData, rooms: updatedRooms });
    } else if (name === 'amenities' || name === 'facilities') {
      // const amenitiesArray = value.split(',').map(item => item.trim());
      // setHotelData({ ...hotelData, [name]: amenitiesArray });
      const arrayValue = value.split(',').map(item => item.trim());
      setHotelData({ ...hotelData, [name]: arrayValue });
    } else if (name === 'agentRate' || name === 'corporateRate') {
      setHotelData({
        ...hotelData,
        contractRates: {
          ...hotelData.contractRates,
          [name]: value
        }
      });
    } else if (name === 'weekendRate' || name === 'longStayRate') {
      setHotelData({
        ...hotelData,
        specialContractRates: {
          ...hotelData.specialContractRates,
          [name]: value
        }
      });
    } else if (name === 'availability') {
      setHotelData({ ...hotelData, [name]: e.target.checked });
    }else {
      setHotelData({ ...hotelData, [name]: value });
    }
  };

  const addRoom = () => {
    setHotelData({
      ...hotelData,
      rooms: [...hotelData.rooms, { roomType: '', rate: '', roomAmenities: '', seasonalRates: [{ season: '', rate: '' }] }],
    });
  };

  const removeRoom = (index) => {
    const updatedRooms = hotelData.rooms.filter((_, roomIndex) => roomIndex !== index);
    setHotelData({ ...hotelData, rooms: updatedRooms });
  };

  const addSeasonalRate = (roomIndex) => {
    const updatedRooms = [...hotelData.rooms];
    updatedRooms[roomIndex].seasonalRates.push({ season: '', rate: '' });
    setHotelData({ ...hotelData, rooms: updatedRooms });
  };

  const removeSeasonalRate = (roomIndex, seasonIndex) => {
    const updatedRooms = [...hotelData.rooms];
    updatedRooms[roomIndex].seasonalRates = updatedRooms[roomIndex].seasonalRates.filter((_, index) => index !== seasonIndex);
    setHotelData({ ...hotelData, rooms: updatedRooms });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contractRates = {
      agentRate: hotelData.contractRates.agentRate,
      corporateRate: hotelData.contractRates.corporateRate,
    };

    const specialContractRates = {
      weekendRate: hotelData.specialContractRates.weekendRate,
      longStayRate: hotelData.specialContractRates.longStayRate
    };

    const finalData = {
      ...hotelData,
      contractRates,
      specialContractRates,
    };

    const formData = new FormData();
    for (const key in finalData) {
      formData.append(key, finalData[key]);
    }

    try {
      const response = await updateHotel(id, finalData);
      if (response.status === 200) {
        toast.success('Hotel updated successfully!', { position: 'top-right', autoClose: 2000 });
        setTimeout(() => navigate('/hotels'), 2000);
      }
    } catch (error) {
      toast.error(`Error updating hotel: ${error.response ? error.response.data.message : error.message}`, { position: 'top-right', autoClose: 3000 });
    }
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title as="h5">Edit Hotel</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {/* Standard Fields */}
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

          <Form.Group controlId="hotelDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={hotelData.description} onChange={handleChange} />
          </Form.Group>

          <Form.Group controlId="hotelFacilities">
            <Form.Label>Facilities (comma separated)</Form.Label>
            <Form.Control type="text" name="facilities" value={hotelData.facilities.join(', ')} onChange={handleChange} />
          </Form.Group>

          <Form.Group controlId="hotelAmenities">
            <Form.Label>Amenities (comma separated)</Form.Label>
            <Form.Control type="text" name="amenities" value={hotelData.amenities.join(', ')} onChange={handleChange} />
          </Form.Group>

          <Form.Group controlId="hotelRating">
            <Form.Label>Rating</Form.Label>
            <Form.Control type="number" name="rating" value={hotelData.rating} onChange={handleChange} min="1" max="5" />
          </Form.Group>

          <Form.Group controlId="cancellationPolicy">
            <Form.Label>Cancellation Policy</Form.Label>
            <Form.Control as="textarea" rows={3} name="cancellationPolicy" value={hotelData.cancellationPolicy} onChange={handleChange} />
          </Form.Group>

          <Form.Group controlId="checkInTime">
            <Form.Label>Check-in Time</Form.Label>
            <Form.Control type="time" name="checkInTime" value={hotelData.checkInTime} onChange={handleChange} />
          </Form.Group>

          <Form.Group controlId="checkOutTime">
            <Form.Label>Check-out Time</Form.Label>
            <Form.Control type="time" name="checkOutTime" value={hotelData.checkOutTime} onChange={handleChange} />
          </Form.Group>

          {/* Room Information */}
          {hotelData.rooms.map((room, roomIndex) => (
            <div key={roomIndex} style={{ marginBottom: '20px' }}>
              <h5 className='mt-3'>Room {roomIndex + 1}</h5>
              <Form.Group controlId={`roomType${roomIndex}`}>
                <Form.Label>Room Type</Form.Label>
                <Form.Control type="text" name="roomType" value={room.roomType} onChange={(e) => handleChange(e, roomIndex)} required />
              </Form.Group>

              <Form.Group controlId={`roomRate${roomIndex}`}>
                <Form.Label>Room Rate</Form.Label>
                <Form.Control type="number" name="rate" value={room.rate} onChange={(e) => handleChange(e, roomIndex)} required />
              </Form.Group>

              <Form.Group controlId={`roomAmenities${roomIndex}`}>
                <Form.Label>Room Amenities (comma separated)</Form.Label>
                <Form.Control type="text" name="roomAmenities" value={room.roomAmenities} onChange={(e) => handleChange(e, roomIndex)} />
              </Form.Group>

              {/* Seasonal Rates */}
              <h6>Seasonal Rates</h6>
              {room.seasonalRates.map((seasonalRate, seasonIndex) => (
                <div key={seasonIndex} style={{ marginBottom: '10px' }}>
                  <Form.Group controlId={`season${roomIndex}-${seasonIndex}`}>
                    <Form.Label>Season</Form.Label>
                    <Form.Control type="text" name="season" value={seasonalRate.season} onChange={(e) => handleChange(e, roomIndex, seasonIndex)} />
                  </Form.Group>

                  <Form.Group controlId={`seasonRate${roomIndex}-${seasonIndex}`}>
                    <Form.Label>Rate</Form.Label>
                    <Form.Control type="number" name="rate" value={seasonalRate.rate} onChange={(e) => handleChange(e, roomIndex, seasonIndex)} />
                  </Form.Group>

                  <Button className='mt-3' variant="danger" onClick={() => removeSeasonalRate(roomIndex, seasonIndex)}>Remove Seasonal Rate</Button>
                </div>
              ))}
              <Button variant="primary" onClick={() => addSeasonalRate(roomIndex)}>Add Seasonal Rate</Button>
              
              <Button variant="danger" onClick={() => removeRoom(roomIndex)} style={{ marginTop: '10px' }}>Remove Room</Button>
            </div>
          ))}

          <Button variant="primary" onClick={addRoom} style={{ marginTop: '20px' }}>Add Room</Button>

          {/* Contract Rates */}
          <h5>Contract Rates</h5>
          <Form.Group controlId="agentRate">
            <Form.Label>Agent Rate</Form.Label>
            <Form.Control type="number" name="agentRate" value={hotelData.contractRates.agentRate} onChange={handleChange} required />
          </Form.Group>

          <Form.Group controlId="corporateRate">
            <Form.Label>Corporate Rate</Form.Label>
            <Form.Control type="number" name="corporateRate" value={hotelData.contractRates.corporateRate} onChange={handleChange} required />
          </Form.Group>

          <Form.Group controlId="weekendRate">
            <Form.Label>Weekend Rate</Form.Label>
            <Form.Control type="number" name="weekendRate" value={hotelData.specialContractRates.weekendRate} onChange={handleChange} />
          </Form.Group>

          <Form.Group controlId="longStayRate">
            <Form.Label>Long Stay Rate</Form.Label>
            <Form.Control type="number" name="longStayRate" value={hotelData.specialContractRates.longStayRate} onChange={handleChange} />
          </Form.Group>

          {/* Availability */}
          <Form.Group controlId="availability">
            <Form.Check type="checkbox" label="Available" name="availability" checked={hotelData.availability} onChange={() => setHotelData({ ...hotelData, availability: !hotelData.availability })} />
          </Form.Group>

          <Button variant="success" type="submit">Update Hotel</Button>
        </Form>
      </Card.Body>
      <ToastContainer />
    </Card>
  );
};

export default HotelEdit;
