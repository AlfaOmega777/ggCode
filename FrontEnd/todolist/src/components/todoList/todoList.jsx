import React, { useState, useEffect } from 'react';
import TodoItem from '../todo/todo';
import authService from '../../services/authServices';
import todoServices from '../../services/todoServices';

function TodoList() {
  const [inputTask, setInputTask] = useState('');
  const user = authService.getCurrentUser();
  const [list, setList] = useState([]);
  const handleInputChange = (event) => {
    setInputTask(event.target.value);
  };

  useEffect(() => {
    const loadUserTodos = async () => {
      const todos = await todoServices.getTodoForUser(user);
      if (todos) {
        setList(todos);
      }
    };
    loadUserTodos();
  }, []);

  const handleDeleteTodo = async (id) => {
    const secureId = id > 150 ? 25 : id;
    const deletedTodo = await todoServices.deleteTodo(secureId, user);
    console.log('Todo deleted with auth in dummyjson:');
    console.log(deletedTodo);
    const newList = list.filter((todo) => todo.id !== id);

    setList(newList);
  };

  const handleAddTodo = async (todo) => {
    const newTodo = await todoServices.addTodo(todo, user);
    console.log('New todo added with auth in dummyjson:');
    console.log(newTodo);
    const newTask = {
      id: Math.floor(Math.random() * (300 - 151 + 1)) + 151,
      todo: newTodo.todo,
      handleDeleteTodo,
    };

    setList([...list, newTask]);
    setInputTask('');
  };

  return (
    <div>

      <h2 className="mb-5">{`Welcome ${user.firstName} ${user.lastName}`}</h2>

      <div className="input-group mb-3">
        <input
          className="form-control"
          type="text"
          value={inputTask}
          onChange={handleInputChange}
          placeholder="Enter a task"
          aria-label="Ingresa un texto"
          aria-describedby="button-addon2"
        />
        <button onClick={() => handleAddTodo(inputTask)} type="submit" className="btn btn-primary">ADD</button>
      </div>

      <div className="row">
        { list.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            text={todo.todo}
            completed={todo.completed}
            onDelete={handleDeleteTodo}
          />
        ))}
      </div>

    </div>

  );
}

export default TodoList;
