import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

export default function Navbar() {
  const items = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-success border border-black">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/home">Ecomm store</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item">
              <NavLink className="nav-link" to="/home">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/cart">Cart items: {items.length}</NavLink>
            </li>

            {!auth.isAuthenticated ? (
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">Login</NavLink>
              </li>
            ) : (
              <>
                <li className="nav-item d-flex align-items-center">
                  <span className="nav-link disabled">Hello, {auth.user?.username}</span>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
