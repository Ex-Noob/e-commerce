import { Show, SignInButton, UserButton } from '@clerk/react'
import { MapPin } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { CgClose } from 'react-icons/cg'
import { FaCaretDown } from 'react-icons/fa'
import { IoCartOutline } from 'react-icons/io5'
import { Link, NavLink } from 'react-router-dom'
import BrandName from './BrandName'
import { useCart } from '../context/CartContext'
import { HiMenuAlt1, HiMenuAlt3 } from 'react-icons/hi'
import ResponsiveMenu from './ResponsiveMenu'

const Navbar = ({ location, getLocation, openDropdown, setOpenDropdown }) => {
  const { cartItem } = useCart()
  const [openNav, setOpenNav] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleDropdown = () => setOpenDropdown(!openDropdown)

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0f0c29]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-purple-900/30'
          : 'bg-linear-to-b from-[#0f0c29] to-[#0f0c29]/80 backdrop-blur-md border-b border-white/5'
      }`}>
        <div className='max-w-6xl mx-auto px-4 py-3 flex justify-between items-center'>

          {/* LEFT — Brand + Location */}
          <div className='flex gap-6 items-center'>
            <Link to='/'>
              <h1 className='font-bold text-2xl md:text-3xl tracking-tight'>
                <BrandName />
              </h1>
            </Link>

            {/* Location pill — desktop only */}
            <button
              onClick={toggleDropdown}
              className='hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-gray-300 hover:bg-white/10 hover:border-purple-400/30 transition-all text-sm'
            >
              <MapPin className='w-3.5 h-3.5 text-red-400' />
              <span className='font-medium max-w-[120px] truncate'>
                {location
                  ? `${location.city || location.town || location.city_district || ''}, ${location.country || ''}`
                  : 'Set location'}
              </span>
              <FaCaretDown className={`w-3 h-3 transition-transform ${openDropdown ? 'rotate-180' : ''}`} />
            </button>

            {/* Location dropdown */}
            {openDropdown && (
              <div className='absolute top-16 left-4 md:left-48 w-64 backdrop-blur-xl bg-[#1a1340]/95 border border-white/15 rounded-2xl shadow-2xl shadow-purple-900/40 p-5 z-50'>
                <div className='flex justify-between items-center mb-4'>
                  <h2 className='text-white font-semibold'>Change Location</h2>
                  <button onClick={toggleDropdown} className='p-1 rounded-full hover:bg-white/10 transition-colors'>
                    <CgClose className='text-gray-400 hover:text-white' />
                  </button>
                </div>
                {location && (
                  <p className='text-gray-400 text-sm mb-3'>
                    📍 {location.city || location.town || location.city_district}, {location.country}
                  </p>
                )}
                <button
                  onClick={() => { getLocation(); setOpenDropdown(false) }}
                  className='w-full relative inline-flex items-center justify-center gap-2 px-4 py-2 bg-linear-to-r from-red-500 to-purple-600 text-white text-sm font-semibold rounded-full hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300 cursor-pointer'
                >
                  📡 Detect my location
                </button>
              </div>
            )}
          </div>

          {/* RIGHT — Nav links + Cart + Auth */}
          <div className='flex items-center gap-5'>

            {/* Desktop nav links */}
            <ul className='hidden md:flex gap-1 items-center'>
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? 'bg-linear-to-r from-red-500/20 to-purple-600/20 text-white border border-purple-400/30'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  <li className='list-none'>{label}</li>
                </NavLink>
              ))}
            </ul>

            {/* Cart icon */}
            <Link to='/cart' className='relative group'>
              <div className='p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-400/30 transition-all group-hover:scale-110'>
                <IoCartOutline className='h-5 w-5 text-gray-300 group-hover:text-white transition-colors' />
              </div>
              {cartItem.length > 0 && (
                <span className='absolute -top-1.5 -right-1.5 bg-linear-to-r from-red-500 to-purple-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-lg'>
                  {cartItem.length}
                </span>
              )}
            </Link>

            {/* Auth — desktop */}
            <div className='hidden md:block'>
              <Show when="signed-out">
                <SignInButton>
                  <button className='px-4 py-2 bg-linear-to-r from-red-500 to-purple-600 text-white text-sm font-semibold rounded-full hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300 cursor-pointer'>
                    Sign In
                  </button>
                </SignInButton>
              </Show>
              <Show when="signed-in">
                <div className='ring-2 ring-purple-500/40 ring-offset-2 ring-offset-transparent rounded-full hover:ring-purple-500/60 transition-all'>
                  <UserButton />
                </div>
              </Show>
            </div>

            {/* Hamburger — mobile */}
            <button
              onClick={() => setOpenNav(!openNav)}
              className='md:hidden p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all'
            >
              {openNav
                ? <HiMenuAlt3 className='h-5 w-5 text-white' />
                : <HiMenuAlt1 className='h-5 w-5 text-white' />
              }
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer so content doesn't hide behind fixed navbar */}
      <div className='h-[60px]' />

      <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav} />
    </>
  )
}

export default Navbar