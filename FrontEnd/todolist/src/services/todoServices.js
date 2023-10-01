import authHeader from './authHeader';
import baseService from './baseServices';

const getTodoForUser = async (user) => {
  const { id } = user || { id: 0 };
  const header = authHeader(user);
  try {
    const data = await baseService.get(`todos/forUser/${id}`, header);

    if (data) {
      return data.todos.todos;
    }
    throw new Error('The response was empty');
  } catch (error) {
    console.error('Error making GET request', error);
    throw error;
  }
};

const addTodo = async (todo, user) => {
  try {
    const header = authHeader(user);
    const { id } = user;
    const data = await baseService.post('todos/', { todo, completed: false, userId: id }, header);

    if (data) {
      return data.todo;
    }
    throw new Error('The response was empty');
  } catch (error) {
    console.error('Error making GET request', error);
    throw error;
  }
};

const deleteTodo = async (id, user) => {
  try {
    const header = authHeader(user);
    const data = await baseService.del(`todos/${id}`, header);

    if (data) {
      return data.todo;
    }
    throw new Error('The response was empty');
  } catch (error) {
    console.error('Error making GET request', error);
    throw error;
  }
};

const updateTodo = async (id, todo, completed, user) => {
  try {
    const header = authHeader(user);
    const data = await baseService.put(`todos/${id}`, { todo, completed }, header);

    if (data) {
      return data.todo;
    }
    throw new Error('The response was empty');
  } catch (error) {
    console.error('Error making GET request', error);
    throw error;
  }
};

const todoServices = {
  getTodoForUser,
  addTodo,
  deleteTodo,
  updateTodo,
};

export default todoServices;
