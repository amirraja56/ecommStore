import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import Swal from 'sweetalert2';

export default function Checkout() {

  const products = useSelector((state) => state.cart)

  const totalPrice = products.map((item) => item.price);
  const totalSum = totalPrice.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  // payment Integration
  const makePayment = async () => {
    const stripe = await loadStripe(`${process.env.REACT_APP_CHECKOUT_STRIPE}`);
    const body = {
      product: products,
    }
    const headers = {
      "Content-Type": "application/json"
    }
    const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}checkout`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    }).catch(err=>{
      console.log(err)
      Swal.fire({icon:"warning",title:"Backend not connected"})
    })

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id
    })
    if (result.error) {
      console.log(result.error);
    }

  };

  return (
    <>
      <div className="container my-1 py-1">
        <section>
          <div className="row">
            <div className="col-md-4 mb-4 position-static">
              <div className="card mb-4">
                <div className="card-header">
                  <h5 className="mb-0 text-font">{products.length} Items <span className="float-end mt-1"
                    style={{ fontSize: "13px" }}><NavLink className="nav-link" to="/cart">Edit</NavLink></span></h5>
                </div>


                <div className="card-body">
                  {products.map((product) => (
                    <div className="row border-top border-bottom">
                      <div className="row main align-items-center">
                        <div className="col-2"><img className="img-fluid" src={product.image} style={{ width: "100px" }} /></div>
                        <div className="col">
                          <div className="row">{product.title}</div>
                        </div>
                        <div className="col">
                          <a href="#"></a><a href="#" className="border">1</a><a href="#"></a>
                        </div>
                        <div className="col" >&#8360; {product.price} <span className="close">
                        </span></div>
                      </div>
                    </div>
                  ))}

                  {/* {products.map((product) => (
                  <div className="row">
                  <hr/>
                    <div className="col-md-4">
                      <img src={product.image}
                        className="rounded-3" style={{ width: "100px" }} alt="Loading" />
                    </div>
                    <div className="col-md-6 ms-3">
                      <span className="mb-0 text-price">&#8360; {product.price}</span>
                      <p className="mb-0 text-descriptions">{product.title} </p>
                      <span className="text-descriptions fw-bold">Black</span> <span
                        className="text-descriptions fw-bold">UK 8</span>
                      <p className="text-descriptions mt-0">Qty:<span className="text-descriptions fw-bold">1</span>
                      </p>
                    </div>
                  </div>
                ))} */}



                  <div className="card-footer">
                    <ul className="list-group list-group-flush">
                      <li
                        className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0 text-muted">
                        Subtotal
                        <span >&#8360; {totalSum}</span>
                      </li>
                      <li
                        className="list-group-item d-flex justify-content-between align-items-center px-0 fw-bold text-uppercase">
                        Total to pay
                        <span className='h5'>&#8360; {totalSum}</span>
                      </li>
                    </ul>
                  </div>

                </div>
              </div>
            </div>

            <div className="col-md-8 mb-4">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0 text-font text-uppercase">Delivery address</h5>
                </div>

                <div className="card-body">
                  <form>
                    <div className="row">
                      <div className="col">
                        <div data-mdb-input-init className="form-outline">
                          <label className="form-label" for="form11Example1">First name</label>
                          <input id="form11Example1" className="form-control" />

                        </div>
                      </div>
                      <div className="col">
                        <div data-mdb-input-init className="form-outline">
                          <label className="form-label" for="form11Example2">Last name</label>
                          <input id="form11Example2" className="form-control" />
                        </div>
                      </div>
                    </div>

                    <div data-mdb-input-init className="form-outline">
                      <label className="form-label" for="form11Example4">Address</label>
                      <input id="form11Example4" className="form-control" />
                    </div>

                    <div data-mdb-input-init className="form-outline">
                      <label className="form-label" for="form11Example5">Email</label>
                      <input id="form11Example5" className="form-control" />
                    </div>


                    <div data-mdb-input-init className="form-outline">
                      <label className="form-label" for="form11Example6">Phone</label>
                      <input id="form11Example6" className="form-control" />
                    </div>


                    <div data-mdb-input-init className="form-outline">
                      <label className="form-label" for="form11Example7">Additional information</label>
                      <textarea className="form-control" id="form11Example7" rows="4"></textarea>
                    </div>

                  </form>
                </div>

              </div>
              <div className="text-center">
                <button onClick={makePayment} type="button" className="btn button-order col-md-10">Confirm & Place order</button>
              </div>

            </div>
          </div>

        </section>


      </div>
    </>
  )
}
