import { Show, SignInButton, UserButton, useUser } from '@clerk/react'
import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

const ResponsiveMenu = ({ openNav, setOpenNav }) => {
  const { user } = useUser()

  const navLinks = [
    { to: '/', label: 'Home', emoji: '🏠' },
    { to: '/products', label: 'Products', emoji: '🛍️' },
    { to: '/about', label: 'About', emoji: '⚡' },
    { to: '/contact', label: 'Contact', emoji: '📬' },
  ]

  return (
    <>
      {/* Backdrop */}
      {openNav && (
        <div
          className='fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden'
          onClick={() => setOpenNav(false)}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 bottom-0 left-0 z-40 w-[78%] max-w-xs flex flex-col
        backdrop-blur-2xl bg-[#0f0c29]/95 border-r border-white/10 shadow-2xl shadow-purple-900/50
        transition-transform duration-400 ease-in-out md:hidden
        ${openNav ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Top glow accent */}
        <div className='absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-red-500 to-purple-600' />

        {/* User section */}
        <div className='px-6 pt-10 pb-6 border-b border-white/10'>
          <div className='flex items-center gap-3'>
            <div className='ring-2 ring-purple-500/50 ring-offset-2 ring-offset-[#0f0c29] rounded-full'>
              {user ? <UserButton /> : <FaUserCircle size={40} className='text-gray-400' />}
            </div>
            <div>
              <p className='text-white font-semibold'>{user ? `Hey, ${user.firstName}` : 'Welcome!'}</p>
              <p className='text-xs text-purple-300'>
                {user ? '✦ Premium Member' : 'Sign in to unlock perks'}
              </p>
            </div>
          </div>

          {!user && (
            <Show when="signed-out">
              <SignInButton>
                <button className='mt-4 w-full py-2 bg-linear-to-r from-red-500 to-purple-600 text-white text-sm font-semibold rounded-full hover:scale-105 transition-all cursor-pointer'>
                  Sign In
                </button>
              </SignInButton>
            </Show>
          )}
        </div>

        {/* Nav links */}
        <nav className='flex-1 px-4 py-6'>
          <ul className='flex flex-col gap-2'>
            {navLinks.map(({ to, label, emoji }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setOpenNav(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-linear-to-r from-red-500/20 to-purple-600/20 text-white border border-purple-400/30'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <span className='text-base'>{emoji}</span>
                <li className='list-none'>{label}</li>
              </NavLink>
            ))}
          </ul>
        </nav>

        {/* Bottom brand tag */}
        <div className='px-6 py-5 border-t border-white/10 text-center'>
          <p className='text-gray-500 text-xs'>Powered by <span className='text-transparent bg-clip-text bg-linear-to-r from-red-400 to-purple-400 font-bold'>E-Commerce</span></p>
        </div>
      </div>
    </>
  )
}

export default ResponsiveMenu