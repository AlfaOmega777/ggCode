import React, { useState, useEffect } from 'react';
import TodoList from '../todoList/todoList';
import authService from '../../services/authServices';

function Home() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const checkIsLogged = () => {
      const user = authService.getCurrentUser();
      if (user) {
        setIsLogged(true);
      }
    };

    checkIsLogged();
  }, []);

  return (
    <div className="container text-center mt-5">
      {isLogged ? (
        <TodoList />
      ) : (
        <p>Debes iniciar sesión para ver el contenido.</p>
      )}
    </div>
  );
}

export default Home;
