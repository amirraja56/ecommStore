import React, { useEffect } from 'react'
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

  const product = products.slice(7)

  useEffect(() => {
    dispatch(fetchProducts());
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

  return (
    <>
      <h1>New Arrivals</h1>
      <Swiper
        slidesPerView={6}
        spaceBetween={10}
        modules={[Autoplay]}
        autoplay={{ delay: 1000, disableOnInteraction: false, pauseOnMouseEnter:true }}
        allowTouchMove={true}
        loop
        breakpoints={{
          200:{
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
                <img src={product.image} className="card-img-top " style={{ height: "8rem" }} alt="..." />
                <div className="card-body p-2 d-flex flex-column">
                  <h5 className="card-title mt-1" style={{ fontSize: "12px" }}>{product.title?.slice(0, 50)}</h5>

                  <h4 className='cart-text-bold mt-0'>&#8360; {product.price}</h4>
                  <button onClick={() => handleAdd(product)} className="btn btn-success" style={{ position: "absolute", fontSize: "15px", marginTop: "100px", marginLeft: "20px" }}>Add to Cart</button>
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