import axios from 'axios';

const API_URL = 'https://dmc-94pi.onrender.com/api';

// Get all hotels
export const getHotels = async () => {
  const response = await axios.get(`${API_URL}/hotels`);
  return response.data;
};

// Get a single hotel by ID
export const getHotelById = async (id) => {
  const response = await axios.get(`${API_URL}/hotels/${id}`);
  return response;
};

// Add a new hotel
export const addHotel = async (hotelData) => {
  const response = await axios.post(`${API_URL}/hotels`, hotelData);
  return response;
};

// Update an existing hotel
export const updateHotel = async (id, hotelData) => {
  const response = await axios.put(`${API_URL}/hotels/${id}`, hotelData);
  return response;
};

// Delete a hotel
export const deleteHotel = async (id) => {
  return await axios.delete(`${API_URL}/hotels/${id}`);
};

// Get all transports
export const getTransports = async () => {
  const response = await axios.get(`${API_URL}/transport`);
  return response.data;
};

// Get a single transport by ID
export const getTransportById = async (id) => {
  const response = await axios.get(`${API_URL}/transport/${id}`);
  return response;
};

// Add a new transport
export const addTransport = async (transportData) => {
  const response = await axios.post(`${API_URL}/transport`, transportData);
  return response;
};

// Update an existing transport
export const updateTransport = async (id, transportData) => {
  const response = await axios.put(`${API_URL}/transport/${id}`, transportData);
  return response;
};

// Delete a transport
export const deleteTransport = async (id) => {
  return await axios.delete(`${API_URL}/transport/${id}`);
};

// Packages
// Get all packages
export const getPackages = async () => {
  const response = await axios.get(`${API_URL}/packages`);
  return response.data;
};

// Get a single package by ID
export const getPackageById = async (id) => {
  const response = await axios.get(`${API_URL}/packages/${id}`);
  return response.data;
};

// Add a new package
export const addPackage = async (packageData) => {
  const response = await axios.post(`${API_URL}/packages`, packageData);
  return response;
};

// Update an existing package
export const updatePackage = async (id, packageData) => {
  const response = await axios.put(`${API_URL}/packages/${id}`, packageData);
  return response.data;
};

// Delete a package
export const deletePackage = async (id) => {
  return await axios.delete(`${API_URL}/packages/${id}`);
};


// Itineraries
// Get all itineraries
export const getItineraries = async () => {
  const response = await axios.get(`${API_URL}/itineraries`);
  return response.data;
};

// Get single itinerary by ID
export const getItineraryById = async (id) => {
  const response = await axios.get(`${API_URL}/itineraries/${id}`);
  return response.data;
};

// Add new itinerary
export const addItinerary = async (itineraryData) => {
  const response = await axios.post(`${API_URL}/itineraries`, itineraryData);
  return response.data;
};

// Update itinerary by ID
export const updateItinerary = async (id, itineraryData) => {
  const response = await axios.put(`${API_URL}/itineraries/${id}`, itineraryData);
  return response.data;
};

// Delete itinerary by ID
export const deleteItinerary = async (id) => {
  const response = await axios.delete(`${API_URL}/itineraries/${id}`);
  return response.data;
};

// Users
export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const deleteUser = async (id) => {
  return await axios.delete(`${API_URL}/users/${id}`);
};
// Similarly, create functions for transports, itineraries, packages, etc.
