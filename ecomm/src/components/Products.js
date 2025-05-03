import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { add } from '../store/cartSlice'
import { fetchProducts } from '../store/productSlice'
import { STATUS } from '../store/productSlice'
import Swal from 'sweetalert2'
export default function Products() {
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state) => state.product)
  // const [products, setProducts] = useState([]);
  // console.log(products.price)
  const product = products.slice(0,6)
console.log({product});

  useEffect(() => {
    dispatch(fetchProducts());
    // const getproducts = async () => {
    //   const res = await fetch('https://fakestoreapi.com/products')
    //   const data = await res.json();
    //   setProducts(data)

    // }
    // getproducts();
  }, [])

  const handleAdd = (product) => {
    dispatch(add(product));
    Swal.fire({
      position: "top",
      icon: "success",
      title: "Added to Cart",
      showConfirmButton: false,
      timer: 1000
    });
  }
  if (status === STATUS.LOADING) {

    return <div className='text-center pt-5'>
      <div class="spinner-border" style={{ width: "5rem", height: "5rem" }} role="status"></div>
    </div>
  }
  if (status === STATUS.ERROR) {
    return <div className='container text-center pt-5'>
      <h1>⚠</h1>
      <h2>No connection to the internet</h2>
      <p>This Display has a connection to your network but no connection to the internet.</p>
    </div>
  }

  return (
    <>
    <h1>Best Selling</h1>
      <div className='row'>
        {product.map((product) => (
          <div key={product.id} className="card mt-2" style={{ width: "10rem", height: "18rem" }}>
            <img src={product.image} className="card-img-top" style={{ height: "8rem" }} alt="..." />
            <div className="card-body p-2 d-flex flex-column">
              <h5 className="card-title mt-1" style={{ fontSize: "12px" }}>{product.title?.slice(0,50)}</h5>
          
              <h4 className='cart-text-bold mt-0'>&#8360; {product.price}</h4>
              <button onClick={() => handleAdd(product)} className="btn btn-success" style={{position:"absolute", fontSize: "15px", marginTop: "100px",marginLeft:"8px" }}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
