import axios from 'axios';

const API = axios.create({
  baseURL: 'http://your-backend-url/api', // Replace with your backend URL
  withCredentials: true, // Include cookies in requests
});

export const loginUser = async (email, password) => {
  const { data } = await API.post('/users/auth', { email, password });
  return data;
};

export const logoutUser = async () => {
  await API.post('/users/logout');
};

export const checkAuthStatus = async () => {
  try {
    const { data } = await API.get('/users/profile');
    return data;
  } catch (error) {
    return null;
  }
};
