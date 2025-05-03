import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Error() {
    return (

        <>
            <div className="main-w3layouts wrapper text-center m-5">
                <h1> Oopps.. Page not found</h1>
                <NavLink to="/" className="btn btn-box bg-success m-5">Back to Home Page</NavLink>
            </div>
        </>

    )
}
