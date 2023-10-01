/* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <div className="container w-75">
      <form>
        <h3 className="pt-4">Sign Up</h3>

        <div className="mb-3">
          <label htmlFor="firstName">
            First name
            <input
              type="text"
              id="firstName"
              className="form-control"
              placeholder="First name"
            />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="lastName">
            Last name
            <input
              type="text"
              id="lastName"
              className="form-control"
              placeholder="Last name"
            />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="userName">
            User name
            <input
              type="text"
              id="userName"
              className="form-control"
              placeholder="Enter user name"
            />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="email">
            Email address
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter email"
            />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="password">
            Password
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter password"
            />
          </label>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered
          {' '}

          <Link to="/login">
            <span>
              sign in?
            </span>
          </Link>

        </p>
      </form>
    </div>
  );
}

export default Signup;
