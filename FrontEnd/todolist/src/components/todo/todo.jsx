import React, { useState } from 'react';
import {
  Trash3, PencilSquare, Check2Square, Save,
} from 'react-bootstrap-icons';
import './todo.css';
import todoServices from '../../services/todoServices';
import authService from '../../services/authServices';

function TodoItem({
  id, text, completed, onDelete,
}) {
  const [task, setTask] = useState(text);
  const [isCompleted, setCompleted] = useState(completed);
  const [isEditing, setIsEditing] = useState(false);
  const handleDelete = () => {
    onDelete(id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (todoId, todo, comp) => {
    const user = await authService.getCurrentUser();
    const updatedTodo = await todoServices.updateTodo(todoId, todo, comp, user);
    console.log('Todo updated with auth in dummyjson:');
    console.log(updatedTodo);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const todoTextStyle = {
    backgroundColor: isCompleted ? '#85EB7A' : '#e4ede6',
    textDecoration: isCompleted ? 'line-through' : 'auto',
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-8">
          {isEditing ? (
            <input
              type="text"
              value={task}
              onChange={handleChange}
              className="form-control"
              style={todoTextStyle}
            />
          ) : (
            <div
              className="todoText"
              style={todoTextStyle}
            >
              {task}
            </div>
          )}
        </div>
        <div className="col px-1">
          <button
            type="button"
            onClick={() => setCompleted(!isCompleted)}
            className="btn btn-primary w-100 h-100"
          >
            <Check2Square />
          </button>
        </div>
        <div className="col px-1">
          {isEditing ? (
            <button
              type="button"
              onClick={() => handleSave(id, task, isCompleted)}
              className="btn btn-success w-100 h-100"
            >
              <Save />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleEdit}
              className="btn btn-secondary w-100 h-100"
            >
              <PencilSquare />
            </button>
          )}
        </div>
        <div className="col px-1">
          <button
            type="button"
            onClick={handleDelete}
            className="btn btn-danger w-100 h-100"
          >
            <Trash3 />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
