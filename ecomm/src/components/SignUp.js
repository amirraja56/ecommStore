import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2';
export default function SignUp() {

  const [input, setInput] = useState({
    username: '',
    email: '',
    number: '',
    password: '',
    cpassword: ''
  });

  const handlechange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pass = input.password;
    const cpass = input.cpassword;
    try {
      if (pass === cpass) {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_SERVER}create`, input)
        // console.log(res)
        Swal.fire({
          icon: "success",
          title: "Successfully Created",
          showConfirmButton: false,
          footer: "<a href='/login'>Back to login</a>",
        })
      } else {
        alert('Password does not match')
      }
    } catch (e) {
      // alert("User is already Exit")
      if (e.code === "ERR_NETWORK") {
        Swal.fire({ icon: "question", title: "Backend not connected" })
      } else {
        Swal.fire({ icon: "error", title: "Oops...", text: "User is already Exit" })
      }
    }
  }
  return (
    <>
      <div className="main-w3layouts wrapper">
        <h1>Create an Account</h1>
        <div className="main-agileinfo">
          <div className="agileits-top">
            <form onSubmit={handleSubmit}>
              <input onChange={handlechange} className="text" type="text" name="username" placeholder="Username" required />
              <input onChange={handlechange} className="text email" type="text" name="email" placeholder="Email" required />
              <input onChange={handlechange} className="text number" type="number" name="number" placeholder="Number" required />
              <input onChange={handlechange} className="text" type="password" name="password" placeholder="Password" required />
              <input onChange={handlechange} className="text w3lpass" type="password" name="cpassword" placeholder="Confirm Password" required />
              <input type="submit" value="SIGNUP" />
            </form>
            <p>Already Registered? <NavLink to="/login"> Login Now!</NavLink></p>
          </div>
        </div>
      </div>
    </>
  )
}