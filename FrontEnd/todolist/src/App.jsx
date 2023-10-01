import { React, useState, useEffect } from 'react';
import {
  Routes, Route, Link, Navigate,
} from 'react-router-dom';
import AuthService from './services/authServices';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import Home from './components/home/home';
import 'bootstrap/dist/css/bootstrap.min.css';
import ComingSoon from './components/soon/comingSoon';
import Welcome from './components/welcome/welcome';

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, [Home]);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/home" className="nav-link">
              Home
            </Link>
          </li>
        </div>

        {currentUser ? (
          <div className="navbar-nav ms-auto">
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                Logout
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/signup" className="nav-link">
                Sign up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container justify-content-center d-flex w-50 mt-3">
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/surprise" element={<ComingSoon />} />
          <Route path="/" element={<Navigate to="/welcome" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
