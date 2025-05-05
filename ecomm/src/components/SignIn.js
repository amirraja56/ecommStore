import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';
import '../index.css';

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false); // Loader state

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader

    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_SERVER}login`, user);

      // Dispatch login success
      dispatch(loginSuccess(res.data));

      // Redirect to home
      navigate('/home');
    } catch (e) {
      console.log(e);
      if (e.code === 'ERR_NETWORK') {
        Swal.fire({ icon: 'warning', title: 'Backend not connected' });
      } else {
        Swal.fire('Invalid Login');
      }
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <div className="main-w3layouts wrapper">
      <h1>Login Now</h1>
      <div className="main-agileinfo">
        <div className="agileits-top">

          {loading ? (
            <div className="text-center mt-3">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                className="text user"
                type="text"
                name="username"
                onChange={handleChange}
                placeholder="Username"
                required
              />
              <input
                className="text pass"
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Password"
                required
              />
              <input type="submit" value="LOGIN" />
            </form>
          )}

          <p>Don't have an Account? <NavLink to="/create">SignUp Now!</NavLink></p>
        </div>
      </div>
    </div>
  );
}
