import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { remove, increment, decrement } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import "./cart.css"


export default function Cart() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const products = useSelector((state) => state.cart)
  const price = products.map((item) => item.price*item.quantity);
  const totalSum = price.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const handleRemove = (product) => {
    dispatch(remove(product));
    Swal.fire("Product removed");
  };

  const incrementQuantity = (id) => {
    dispatch(increment(id))
  };

  const decrementQuantity = (id) => {
    // console.log(item)
    dispatch(decrement(id))
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (totalSum !== 0) {
      navigate('/checkout')
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Cart could not be empty!',
        footer: ' &larr;<a href="/">Back to Shop</a>'
      })
    }
  }

  return (
    <>
      <div className="card my-1 ">
        <div className="row">
          <div className="col-md-8 cart">
            <div className="title">
              <div className="row">
                <div className="col"><h4><b>Shopping Cart</b></h4></div>
                <div className="col align-self-center text-right text-muted">{products.length} items</div>
              </div>
            </div>

            {products.map((product) => (
              <div className="row border-top border-bottom">
                <div className="row main align-items-center">
                  <div className="col-2"><img className="img-fluid" src={product.image} /></div>
                  <div className="col">
                    {/* <div className="row text-muted">{product.title}</div> */}
                    <div className="row">{product.title}</div>
                  </div>
                  <div className="col">
                    <a type='button' onClick={() => { decrementQuantity(product.id) }}>-&emsp;</a>
                    <a className="border">{product.quantity}</a>
                    <a type='button' onClick={() => { incrementQuantity(product.id) }}>&emsp;+</a>
                  </div>
                  <div className="col" >&#8360; {product.price*product.quantity} <span className="close">
                    <button onClick={() => handleRemove(product.id)} className="btn btn-success">remove</button>
                  </span></div>
                </div>
              </div>
            ))}

            <div className="back-to-shop"><a href="/"> &larr; </a><span className="text-muted">Back to shop</span></div>
          </div>
          <div className="col-md-4 summary">
            <div><h5><b>Summary</b></h5></div>
            <hr />
            <div className="row">
              <div className="col" style={{ paddingLeft: "0" }}>ITEMS {products.length}</div>
              <div className="col text-right">&#8360; {totalSum}</div>
            </div>
            <form>
              <p>SHIPPING </p>
              <select><option className="text-muted">Standard-Delivery- &#8360;30.00</option></select>
              <p>GIVE CODE</p>
              <input id="code" placeholder="Enter your code" />
            </form>
            <div className="row" style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}>
              <div className="col">TOTAL PRICE</div>
              <div className="col text-right">&#8360; {totalSum ? totalSum + 30 : totalSum}</div>
            </div>
            <button className="button" onClick={handleCheckout}>Proceed to buy</button>
          </div>
        </div>

      </div>

    </>
  )
}
