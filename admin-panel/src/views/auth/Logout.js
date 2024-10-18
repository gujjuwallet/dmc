import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/authService'; // Import the logout service

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Call logout service to clear sessionStorage and redirect to login
    logout();
    navigate('/login');
  }, [navigate]);

  return null;
};

export default Logout;
