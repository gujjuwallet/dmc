// src/components/transport/TransportList.js

import React, { useState, useEffect } from 'react';
import { Table, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getTransports, deleteTransport } from '../../services/api'; // Import API functions
import { ToastContainer, toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Toastify CSS

const TransportList = () => {
    const [transports, setTransports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch transport options when component loads
        const fetchTransports = async () => {
            try {
                const data = await getTransports();
                setTransports(data);
                console.log(data);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch transports');
                setLoading(false);
            }
        };
        fetchTransports();
    }, []);

    // Custom confirmation using toast
    const confirmDelete = (id) => {
        toast.info(
            <>
                <div>
                    Are you sure you want to delete this transport option?
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
            await deleteTransport(id);
            setTransports(transports.filter((transport) => transport._id !== id)); // Remove from state
            toast.success('Transport option deleted successfully!', {
                position: 'top-right',
                autoClose: 2000,
            });
            toast.dismiss();
        } catch (error) {
            setError('Failed to delete transport option');
            toast.error('Failed to delete transport option. Please try again.', {
                position: 'top-right',
                autoClose: 3000,
            });
            toast.dismiss();
        }
    };

    if (loading) return <p>Loading transports...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Card>
            <Card.Header>
                <Card.Title as="h5">Transport List</Card.Title>
                <Link to="/transport/add">
                    <Button variant="primary">Add Transport</Button>
                </Link>
            </Card.Header>
            <Card.Body>
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>Vehicle Type</th>
                            <th>Pickup Location</th>
                            <th>Dropoff Location</th>
                            <th>Rate</th>
                            <th>Availability</th>
                            <th>Time of Day</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transports.map((transport) => (
                            <tr key={transport._id}>
                                <td>{transport.vehicleType}</td>
                                <td>{transport.route.pickup}</td>
                                <td>{transport.route.dropoff}</td>
                                <td>{transport.rate}</td>
                                <td>
                                    <h6>{transport.availability ? 'Available' : 'Not Available'}</h6>
                                </td>
                                <td>{transport.timeOfDay}</td>
                                <td>
                                    <Link to={`/transport/edit/${transport._id}`}>
                                        <Button variant="warning">Edit</Button>
                                    </Link>{' '}
                                    <Button variant="danger" onClick={() => confirmDelete(transport._id)}>
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

export default TransportList;
