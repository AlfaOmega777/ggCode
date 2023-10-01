/* eslint linebreak-style: ["error", "windows"] */

import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { PersonFillUp } from 'react-bootstrap-icons';
import AuthService from '../../services/authServices';

function Login() {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const {
      name, value, type, checked,
    } = event.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const setValidUser = () => {
    const users = [
      { user: 'atuny0', pass: '9uQFF1Lh' },
      { user: 'aeatockj', pass: 'szWAG6hc' },
      { user: 'lskeelv', pass: 'Eolj9Svg28' },
      { user: 'kmeus4', pass: 'aUTdmmmbH' },
      { user: 'dpettegre6', pass: 'YVmhktgYVS' },
    ];
    const randUser = users[Math.floor(Math.random() * users.length)];

    setFormData({
      ...formData,
      userName: randUser.user,
      password: randUser.pass,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = formData.userName;
    const { password } = formData;
    const authService = AuthService;

    authService.login(username, password)
      .then((response) => {
        if (response.token) {
          navigate('/home');
          window.location.reload(false);
        } else {
          setError('Invalid credentials. Please check your username and password');
        }
      })
      .catch((respError) => {
        console.error(respError);
        setError('An error occurred while logging in. Please try again later.');
      });
  };

  return (
    <div className="container w-75">

      <form className="pt-4" onSubmit={handleSubmit}>
        <div className="title">
          <h3>Sign In</h3>
          <p
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Click me to get a valid username and password ;)"
            data-tooltip-place="right"
          >
            <PersonFillUp onClick={setValidUser} size={32} />

          </p>

        </div>

        <Tooltip id="my-tooltip" />

        <div className="mb-3">
          <label htmlFor="userName">
            User Name
            <input
              id="userName"
              name="userName"
              className="form-control"
              placeholder="Enter user name"
              value={formData.userName}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="pass">
            Password
            <input
              id="pass"
              name="password"
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        {error && <div className="mt-3 alert alert-danger">{error}</div>}
        <p className="forgot-password text-right">
          Forgot
          {' '}
          <a href="/surprise">password?</a>
        </p>
      </form>

    </div>

  );
}

export default Login;
