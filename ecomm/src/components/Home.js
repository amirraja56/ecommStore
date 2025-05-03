import React from 'react'
import Products from './Products'
import Carousel from './Carousel'
import ProductSlider from './ProductSlider'
export default function home() {
  return (
    <div className='container'>
        <h2 className='header' style={{textAlign:"center"}}> Welcome to Product Store</h2>
            <Carousel/>
        <section className='product'>
            <Products/>
            <ProductSlider/>
        </section>
    </div>
  )
}
