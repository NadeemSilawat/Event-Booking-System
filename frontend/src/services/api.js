import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Events API
export const eventsAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.city) params.append('city', filters.city);
    if (filters.category) params.append('category', filters.category);
    if (filters.search) params.append('search', filters.search);
    
    return axios.get(`${API_BASE_URL}/events?${params.toString()}`);
  },
  
  getById: (id) => {
    return axios.get(`${API_BASE_URL}/events/${id}`);
  }
};

// Bookings API
export const bookingsAPI = {
  create: (bookingData) => {
    return axios.post(`${API_BASE_URL}/bookings`, bookingData);
  },
  
  getAll: () => {
    return axios.get(`${API_BASE_URL}/bookings`);
  },
  
  getById: (id) => {
    return axios.get(`${API_BASE_URL}/bookings/${id}`);
  }
};

// Filters API
export const filtersAPI = {
  getCategories: () => {
    return axios.get(`${API_BASE_URL}/categories`);
  },
  
  getCities: () => {
    return axios.get(`${API_BASE_URL}/cities`);
  }
};

export default {
  events: eventsAPI,
  bookings: bookingsAPI,
  filters: filtersAPI
};
