import React from 'react'
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import { Provider } from 'react-redux'
import Home from './components/Home'
import Cart from './components/Cart'
import Navbar from './components/Navbar'
import store from './store/store'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Error from './components/Error'
import Checkout from './components/Checkout'
import Success from './components/Success'
import Cancel from './components/Cancel'
export default function App() {
  return (
   <>
<Provider store={store}>
<BrowserRouter>
   <Navbar/>
  <Routes>
    <Route path='/' Component={Home} />
    <Route path='/cart' Component={Cart} />
    <Route  path='/login' Component={SignIn}/>
    <Route  path='/create' Component={SignUp}/>
    <Route path='/checkout' Component={Checkout}/>
    <Route path='/success' Component={Success}/>
    <Route path='/cancel' Component={Cancel}/>
    <Route path='*' Component={Error} />
  </Routes>
</BrowserRouter>
</Provider>
   </>
  )
}

