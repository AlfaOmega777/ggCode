import axios from 'axios';
import baseService from './baseServices';

const API_URL = 'http://localhost:4491/api/users';

const signup = (username, password) => axios
  .post(`${API_URL}/signup`, {
    username,
    password,
  })
  .then((response) => {
    if (response.data.accessToken) {
      sessionStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
  });

const login = async (username, password) => {
  try {
    const data = await baseService.post('users/login', { username, password });

    if (data.token) {
      sessionStorage.setItem('user', JSON.stringify(data));
    }

    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const logout = () => {
  sessionStorage.removeItem('user');
};

const getCurrentUser = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  return user;
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default authService;
