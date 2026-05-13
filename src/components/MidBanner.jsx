import React from 'react'
import banner from '../assets/banner1.jpg'
import { Link } from 'react-router-dom'

const MidBanner = () => {
  return (
    <div className='bg-linear-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] py-16 px-4'>
      <div
        className='relative max-w-6xl mx-auto rounded-3xl overflow-hidden h-80 md:h-[420px]'
        style={{
          backgroundImage: `url(${banner})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        {/* Dark gradient overlay — more dramatic */}
        <div className='absolute inset-0 bg-linear-to-r from-[#0f0c29]/95 via-[#0f0c29]/70 to-transparent' />
        <div className='absolute inset-0 bg-linear-to-t from-[#0f0c29]/80 via-transparent to-transparent' />

        {/* Glow accent */}
        <div className='absolute top-0 left-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none' />

        {/* Content */}
        <div className='relative z-10 h-full flex flex-col justify-center px-8 md:px-16 max-w-xl'>
          <span className='text-xs font-bold tracking-[0.25em] uppercase text-transparent bg-clip-text bg-linear-to-r from-red-400 to-purple-400 mb-3'>
            ✦ Limited Time Offer
          </span>
          <h1 className='text-2xl sm:text-3xl md:text-5xl font-black text-white leading-tight mb-4'>
            Next-Gen Electronics<br />
            <span className='text-transparent bg-clip-text bg-linear-to-r from-red-400 to-purple-400'>at Your Fingertips</span>
          </h1>
          <p className='text-gray-300 text-sm md:text-base mb-6 leading-relaxed'>
            Discover the latest tech with unbeatable prices and free shipping on all orders.
          </p>
          <div className='flex gap-3 flex-wrap'>
            <Link to='/products'>
              <button className='px-6 py-3 bg-linear-to-r from-red-500 to-purple-600 text-white font-semibold rounded-full shadow-lg shadow-purple-500/30 hover:shadow-purple-500/60 hover:scale-105 transition-all duration-300 cursor-pointer'>
                Shop Now →
              </button>
            </Link>
            <Link to='/about'>
              <button className='px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 cursor-pointer backdrop-blur-sm'>
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MidBanner