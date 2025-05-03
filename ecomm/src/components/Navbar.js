import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
export default function Navbar() {
const items = useSelector((state)=>state.cart);
// console.log(items.length)

  return (
   <>
 <nav className="navbar navbar-expand-lg bg-body-success border border-black">
  <div className="container-fluid">
    <a className="navbar-brand" href="">Ecomm store</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to='/cart'>Cart items:{items.length}</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to='/login'>Login</NavLink>
        </li>
      
      </ul>
     
    </div>
  </div>
</nav>
   </>
  )
}
