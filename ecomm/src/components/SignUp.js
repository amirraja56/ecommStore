import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function SignUp() {
  const [input, setInput] = useState({
    username: '',
    email: '',
    number: '',
    password: '',
    cpassword: ''
  });

  const [loading, setLoading] = useState(false); // ✅ loading state

  const handlechange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, cpassword } = input;

    if (password !== cpassword) {
      Swal.fire({ icon: 'warning', title: 'Passwords do not match' });
      return;
    }

    setLoading(true); //  show loader

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_SERVER}create`, input);

      Swal.fire({
        icon: "success",
        title: "Successfully Created",
        showConfirmButton: false,
        footer: "<a href='/login'>Back to login</a>",
      });

    } catch (e) {
      if (e.code === "ERR_NETWORK") {
        Swal.fire({ icon: "question", title: "Backend not connected" });
      } else {
        Swal.fire({ icon: "error", title: "Oops...", text: "User already exists" });
      }
    } finally {
      setLoading(false); // hide loader
    }
  };

  return (
    <>
      <div className="main-w3layouts wrapper">
        <h1>Create an Account</h1>
        <div className="main-agileinfo">
          <div className="agileits-top">
            {loading ? (
              <div className="text-center mt-3">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Creating...</span>
                </div>
                <p className="mt-2">Creating your account...</p>
              </div>
            ) : (
              <>
                <form onSubmit={handleSubmit}>
                  <input onChange={handlechange} className="text" type="text" name="username" placeholder="Username" required />
                  <input onChange={handlechange} className="text email" type="text" name="email" placeholder="Email" required />
                  <input onChange={handlechange} className="text number" type="number" name="number" placeholder="Number" required />
                  <input onChange={handlechange} className="text" type="password" name="password" placeholder="Password" required />
                  <input onChange={handlechange} className="text w3lpass" type="password" name="cpassword" placeholder="Confirm Password" required />
                  <input type="submit" value="SIGNUP" />
                </form>
                <p>Already Registered? <NavLink to="/login"> Login Now!</NavLink></p>
              </>
            )}

          </div>
        </div>
      </div>
    </>
  );
}
