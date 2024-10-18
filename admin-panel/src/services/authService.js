import axios from 'axios';

const API_URL ='https://dmc-7wwk.onrender.com/';

// Function to handle user login
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, { email, password });
    
    // Save token in localStorage or cookies
    if (response.data.token) {
      sessionStorage.setItem('authToken', response.data.token);
      sessionStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data; // Return user and token details
    }
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

// Function to log out the user
export const logout = () => {
  // localStorage.removeItem('authToken');
  // localStorage.removeItem('user');
  sessionStorage.removeItem('authToken');
  sessionStorage.removeItem('user');
};

// Function to check if the user is authenticated
export const isAuthenticated = () => {
  return !!sessionStorage.getItem('authToken');
};

// Function to get user details
export const getUserDetails = () => {
  const user = sessionStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};