import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import "../index.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

export default function SignIn() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    password: ''
  });


  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_SERVER}login`, user)
      // console.log(res);
      navigate('/cart')
    } catch (e) {
      console.log(e)
      if (e.code === "ERR_NETWORK") {
        Swal.fire({icon:"warning",title:"Backend not connected"})
      } else {
        Swal.fire("Invalid Login")
      }
    }

  };

  return (
    <>
      <div className="main-w3layouts wrapper">
        <h1>Login Now</h1>
        <div className="main-agileinfo">
          <div className="agileits-top">
            <form onSubmit={handleSubmit}>
              <input className="text user" type="text" name="username" onChange={handleChange} placeholder="Username" required />
              <input className="text pass" type="password" name="password" onChange={handleChange} placeholder="Password" required />
              <input type="submit" value="LOGIN" />
            </form>
            <p>Don't have an Account?  <NavLink to="/create"> SignUp Now!</NavLink></p>
          </div>
        </div>
      </div>
    </>
  )
}
