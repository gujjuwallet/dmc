import React, { useState, useEffect } from 'react';
import { Table, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getHotels, deleteHotel } from '../../services/api'; // Import API functions
import { ToastContainer, toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Toastify CSS

const HotelList = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch hotels when component loads
        const fetchHotels = async () => {
            try {
                const data = await getHotels();
                setHotels(data);
                console.log(data)
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch hotels');
                setLoading(false);
            }
        };
        fetchHotels();
    }, []);

    // Custom confirmation using toast
    const confirmDelete = (id) => {
        toast.info(
            <>
                <div>
                    Are you sure you want to delete this hotel?
                </div>
                <div>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(id)}>
                        Yes
                    </Button>
                    <Button variant="secondary" size="sm" style={{ marginLeft: '10px' }} onClick={() => toast.dismiss()}>
                        No
                    </Button>
                </div>
            </>,
            {
                position: 'top-center',
                autoClose: false, // Prevents auto close
                closeOnClick: false, // Prevents closing on clicking outside
                hideProgressBar: true, // Removes progress bar
            }
        );
    };

    const handleDelete = async (id) => {
        try {
            await deleteHotel(id);
            setHotels(hotels.filter((hotel) => hotel._id !== id)); // Remove from state
            toast.success('Hotel deleted successfully!', {
                position: 'top-right',
                autoClose: 2000,
            });
            toast.dismiss()
        } catch (error) {
            setError('Failed to delete hotel');
            toast.error('Failed to delete hotel. Please try again.', {
                position: 'top-right',
                autoClose: 3000,
            });
            toast.dismiss()
        }
    };

    if (loading) return <p>Loading hotels...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Card>
            <Card.Header>
                <Card.Title as="h5">Hotel List</Card.Title>
                <Link to="/hotels/add-hotel">
                    <Button variant="primary">Add Hotel</Button>
                </Link>
            </Card.Header>
            <Card.Body>
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Contact</th>
                            <th>Amenities</th>
                            <th>Room</th>
                            <th>Availability</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hotels.map((hotel) => (

                            <tr key={hotel._id}>
                                <td>{hotel.name}</td>
                                <td>{hotel.location}</td>
                                <td>{hotel.contact}</td>
                                <td>{hotel.amenities.join(', ')}</td>
                                <td>
                                    {/* Display room types and rates */}
                                    {hotel.rooms.map((room, index) => (
                                        <div key={index}>
                                            {room.roomType} - Rate: {room.rate}
                                        </div>
                                    ))}
                                </td>
                                <td>
                                    <h6>{hotel.availability ? 'Available' : 'Not Available'}</h6>
                                </td>
                                <td>
                                    <Link to={`/hotels/edit-hotel/${hotel._id}`}>
                                        <Button variant="warning">Edit</Button>
                                    </Link>{' '}
                                    <Button variant="danger" onClick={() => confirmDelete(hotel._id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

            </Card.Body>
            <ToastContainer />
        </Card>
    );
};

export default HotelList;