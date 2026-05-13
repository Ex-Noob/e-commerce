import React, { useEffect, useState, useRef } from 'react'  // 👈 useRef added here!
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import axios from 'axios'
import Footer from './components/Footer'
import SingleProduct from './pages/SingleProduct'
import CategoryProduct from './pages/CategoryProduct'
import { useCart } from './context/CartContext'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  const [location, setLocation] = useState()
  const [openDropdown, setOpenDropdown] = useState(false)
  const { cartItem, setCartItem } = useCart()
  const isFirstRender = useRef(true)  // 👈 declare it here

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async pos => {
      const { latitude, longitude } = pos.coords
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      try {
        const location = await axios.get(url)
        const exactLocation = location.data.address
        setLocation(exactLocation)
        setOpenDropdown(false)
      } catch (error) {
        console.log(error)
      }
    })
  }

  useEffect(() => {
    getLocation()
  }, [])

  // ✅ Load cart FIRST
  useEffect(() => {
    const storedCart = localStorage.getItem('cartItem')
    if (storedCart) {
      setCartItem(JSON.parse(storedCart))
    }
  }, [])

  // ✅ Save cart but SKIP first render so it doesn't overwrite loaded data
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    localStorage.setItem('cartItem', JSON.stringify(cartItem))
  }, [cartItem])

  return (
    <BrowserRouter>
      <Navbar location={location} getLocation={getLocation} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/category/:category" element={<CategoryProduct />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<ProtectedRoute>
          <Cart location={location} getLocation={getLocation} />
        </ProtectedRoute>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App