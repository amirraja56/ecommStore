import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { add } from '../store/cartSlice'
import { fetchProducts } from '../store/productSlice'
import Swal from 'sweetalert2'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

const ProductSlider = () => {
  const dispatch = useDispatch();
  const { data: products } = useSelector((state) => state.product)
  const cartItems = useSelector((state) => state.cart);

  const product = products.slice(7)

  useEffect(() => {
    dispatch(fetchProducts());
  }, [])

  const isInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

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

  return (
    <>
      <h1>New Arrivals</h1>
      <Swiper
        slidesPerView={6}
        spaceBetween={10}
        modules={[Autoplay]}
        autoplay={{ delay: 1000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        allowTouchMove={true}
        loop
        breakpoints={{
          200: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          340: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
        }}

      >
        <div className='row'>
          {product.map((product) => (
            <SwiperSlide>
              <div key={product.id} className="card mt-2" style={{ width: "10rem", height: "18rem" }}>
                <img src={product.image} className="card-img-top " style={{ height: "8rem",width:"8.5rem", margin: "10px" }} alt="..." />
                <div className="card-body p-2 d-flex flex-column justify-content-between">
                  <div style={{marginLeft:"10px"}}>
                    <h5 className="card-title" style={{ fontSize: "12px", height: "2.5rem", overflow: "hidden", marginTop: "10px" }}>
                      {product.title?.slice(0, 50)}
                    </h5>
                    <h4 className="cart-text-bold mt-1" style={{ fontSize: "20px", marginTop: "10px" }}>&#8360; {product.price}</h4>
                  </div>
                  {isInCart(product.id) ? (
                    <NavLink
                      to="/cart"
                      className="btn btn-primary"
                      style={{ position: "absolute", bottom: "10px", left: "10px", right: "10px", fontSize: "14px", textAlign: "center" }}
                    >
                      Go to Cart
                    </NavLink>
                  ) : (
                    <button
                      onClick={() => handleAdd(product)}
                      className="btn btn-success"
                      style={{ position: "absolute", bottom: "10px", left: "10px", right: "10px", fontSize: "14px" }}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </>
  )
}

export default ProductSlider