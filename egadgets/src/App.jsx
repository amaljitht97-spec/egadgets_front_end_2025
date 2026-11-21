import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Products from './pages/Products'
import Detail from './pages/Detail'
import Cart from './pages/Cart'
import Order from './pages/Order'
import Pnf from './components/Pnf'

import { Routes,Route  } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

function App() {
  

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='auth' element={<Auth/>}/>
      <Route path='/products/:cat' element={<Products/>}/>
      <Route path='detail/:id' element={<Detail/>}/>
      <Route path='cart' element={<Cart/>}/>
      <Route path='order' element={<Order/>}/>
      <Route path='*' element={<Pnf/>}/>
    </Routes>

    <ToastContainer/>
    </>
  )
}

export default App
