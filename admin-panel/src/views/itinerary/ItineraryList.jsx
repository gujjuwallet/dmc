import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, Card } from 'react-bootstrap';
import { getItineraries, deleteItinerary } from '../../services/api'; // API functions
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Toastify CSS

const ItineraryList = () => {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const data = await getItineraries();
        console.log(data); 
        setItineraries(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load itineraries.');
        setLoading(false);
      }
    };
    fetchItineraries();
  }, []);

  const confirmDelete = (id) => {
    toast.info(
      <>
        <div>Are you sure you want to delete this itinerary?</div>
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
      await deleteItinerary(id);
      setItineraries(itineraries.filter((itinerary) => itinerary._id !== id)); // Remove from state
      toast.success('Itinerary deleted successfully!', {
        position: 'top-right',
        autoClose: 2000,
      });
      toast.dismiss();
    } catch (error) {
      setError('Failed to delete itinerary.');
      toast.error('Failed to delete itinerary. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
      });
      toast.dismiss();
    }
  };

  if (loading) return <p>Loading itineraries...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Card>
      <Card.Header>
        <Card.Title as="h5">Itineraries</Card.Title>
        <Link to="/itineraries/add" className="btn btn-primary">
          Add Itinerary
        </Link>
      </Card.Header>
      <Card.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Package</th>
              <th>Hotel</th>
              <th>Transport</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Price</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {itineraries.map((itinerary) => (
              <tr key={itinerary._id}>
                <td>{itinerary.package?.name || 'N/A'}</td>
                <td>{itinerary.hotel?.name || 'N/A'}</td>
                <td>{itinerary.transport?.vehicleType || 'N/A'}</td>
                <td>{new Date(itinerary.startDate).toLocaleDateString()}</td>
                <td>{new Date(itinerary.endDate).toLocaleDateString()}</td>
                <td>{itinerary.price}</td>
                <td>{itinerary.availability ? 'Available' : 'Not Available'}</td>
                <td>
                  <Link to={`/itineraries/edit/${itinerary._id}`} className="btn btn-primary btn-sm">
                    Edit
                  </Link>{' '}
                  <Button variant="danger" size="sm" onClick={() => confirmDelete(itinerary._id)}>
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

export default ItineraryList;