import React, { useState, useEffect } from 'react';
import { Table, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getPackages, deletePackage } from '../../services/api'; // Import API functions
import { ToastContainer, toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Toastify CSS

const PackageList = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch package options when component loads
        const fetchPackages = async () => {
            try {
                const data = await getPackages();
                setPackages(data);
                console.log(data);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch packages');
                setLoading(false);
            }
        };
        fetchPackages();
    }, []);

    // Custom confirmation using toast
    const confirmDelete = (id) => {
        toast.info(
            <>
                <div>
                    Are you sure you want to delete this package?
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
            await deletePackage(id);
            setPackages(packages.filter((pkg) => pkg._id !== id)); // Remove from state
            toast.success('Package deleted successfully!', {
                position: 'top-right',
                autoClose: 2000,
            });
            toast.dismiss();
        } catch (error) {
            setError('Failed to delete package');
            toast.error('Failed to delete package. Please try again.', {
                position: 'top-right',
                autoClose: 3000,
            });
            toast.dismiss();
        }
    };

    if (loading) return <p>Loading packages...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Card>
            <Card.Header>
                <Card.Title as="h5">Package List</Card.Title>
                <Link to="/packages/add">
                    <Button variant="primary">Add Package</Button>
                </Link>
            </Card.Header>
            <Card.Body>
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>Package Name</th>
                            <th>Destination</th>
                            <th>Trip Type</th>
                            <th>Rate</th>
                            <th>Availability</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {packages.map((pkg) => (
                            <tr key={pkg._id}>
                                <td>{pkg.name}</td>
                                <td>{pkg.destinations}</td>
                                <td>{pkg.tripType}</td>
                                <td>{pkg.agentRate}</td>
                                <td>
                                    <h6>{pkg.availability ? 'Available' : 'Not Available'}</h6>
                                </td>
                                <td>
                                    <Link to={`/packages/edit/${pkg._id}`}>
                                        <Button variant="warning">Edit</Button>
                                    </Link>{' '}
                                    <Button variant="danger" onClick={() => confirmDelete(pkg._id)}>
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

export default PackageList;