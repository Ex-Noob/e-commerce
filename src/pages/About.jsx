import React from 'react'
import { Link } from 'react-router-dom'
import BrandName from '../components/BrandName'

const About = () => {
  return (  
    <div className='min-h-screen bg-linear-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center px-4 py-10'>
      <div className='min-h-screen bg-linear-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-20'>
        <div className='backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-10 w-full max-w-5xl space-y-8'>
          <h1 className='text-4xl font-bold text-center text-white'>About <BrandName /></h1>

          <p className='text-white text-lg'>
            Welcome to <BrandName />, your one-stop destination for the latest and greatest in electronics. From cutting-edge gadgets to must-have accessories, we're here to power up your tech life with premium products and unbeatable service.
          </p>
          
          <div className='space-y-6'>
            <h2 className='text-2xl font-semibold text-white'>Our Mission</h2>
            <p className='text-white text-base'>
              At <BrandName />, our mission is to make innovative technology accessible to everyone. We're passionate about connecting people with the tools and tech they need to thrive in a digital world - all at competitive prices and delivered with speed and care.
            </p>
          </div>
          
          <div className='space-y-6'>
            <h2 className='text-2xl font-semibold text-white'>Why Choose <BrandName />?</h2>
            <ul className='list-disc pl-6 text-white space-y-2'>
              <li>Top-quality electronic products from trusted brands</li>
              <li>Lightning-fast and Secure shipping</li>
              <li>Reliable customer support, always ready to help</li>
              <li>Easy returns and hassle-free shopping experince</li>
            </ul>
          </div>

          <div className='space-y-6'>
            <h2 className='text-2xl font-semibold text-white'>Our Vision</h2>
            <p className='text-white text-base'>
              We envision a future where technology elevates everyday life. At <BrandName />, we're committed to staying ahead of the curve, offering cutting-edge solutions that are both practical and affordable.
            </p>
          </div>

          <div className='text-center mt-10'>
            <h3 className='text-xl font-semibold mb-2 text-white'>Join the <BrandName /> Family</h3>
            <p className='text-white mb-4'>
              Whether you're a tech enthusiast, a professional, or just looking for something cool and functional - <BrandName /> has something for everyone. 
            </p>
            <Link to={'/products'}>
              <button className='relative inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-red-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 cursor-pointer mt-2'>
                    Start Shopping
                    <span className='text-lg'>→</span>
                  </button>
            </Link>
          </div>
    
        </div>
      </div>
    </div>
  )
}

export default About