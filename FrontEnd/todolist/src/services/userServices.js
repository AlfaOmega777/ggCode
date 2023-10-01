import axios from 'axios';
import authHeader from './authHeader';
import authService from './authServices';

const API_URL = 'http://localhost:4491/api/todos/forUser/';

const getTodoForUser = async (user) => {
  const header = { headers: authHeader(user) };
  const { id } = user || { id: 0 };
  try {
    const response = await axios.get(`${API_URL}${id}`, header);

    if (response.data) {
      return response.data.todos.todos;
    }
    throw new Error('The response was empty');
  } catch (error) {
    console.error('Error making GET request', error);
    throw error;
  }
};

const userServices = {
  getTodoForUser,
};

export default userServices;
