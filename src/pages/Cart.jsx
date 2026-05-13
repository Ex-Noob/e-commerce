import React from 'react'
import { useCart } from '../context/CartContext'
import { FaRegTrashAlt } from 'react-icons/fa';
import { MdDeliveryDining } from 'react-icons/md';
import { GiShoppingBag } from 'react-icons/gi';
import { LucideNotebookText } from 'lucide-react';
import { useUser } from '@clerk/react';
import { useNavigate } from 'react-router-dom';
import emptyCart from '../assets/empty-cart.png'
import { ShoppingCart } from 'lucide-react';

const Cart = ({ location, getLocation }) => {
  const { cartItem, updateQuantity, deleteItem } = useCart()
  const { user } = useUser()
  const navigate = useNavigate()

  const totalPrice = cartItem.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <div className='min-h-screen bg-linear-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] px-4 py-10'>
      {
        cartItem.length > 0 ? (
          <div className='max-w-6xl mx-auto'>
            {/* Header */}
            <div className='mb-8 flex items-center gap-3'>
              <ShoppingCart className='text-purple-300 w-8 h-8' />
              <h1 className='font-bold text-3xl text-white'>
                My Cart <span className='text-transparent bg-clip-text bg-linear-to-r from-red-400 to-purple-400'>({cartItem.length})</span>
              </h1>
            </div>

            <div className='grid md:grid-cols-[1fr_380px] grid-cols-1 gap-8 items-start'>

              {/* LEFT - Cart Items + Delivery */}
              <div className='space-y-5'>

                {/* Cart Items */}
                <div className='backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-6 space-y-4'>
                  <h2 className='text-white font-semibold text-lg border-b border-white/10 pb-3'>Order Items</h2>
                  {cartItem.map((item, index) => (
                    <div key={index} className='flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 transition-all'>
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className='w-20 h-20 rounded-xl object-cover border border-white/10 shrink-0'
                      />
                      <div className='flex-1 min-w-0'>
                        <h1 className='text-white font-semibold line-clamp-2 text-sm md:text-base'>{item.title}</h1>
                        <p className='text-transparent bg-clip-text bg-linear-to-r from-red-400 to-purple-400 font-bold text-lg'>${item.price}</p>
                      </div>
                      <div className='flex flex-col items-end gap-3 shrink-0'>
                        <div className='flex items-center gap-0 backdrop-blur-sm bg-white/10 border border-white/20 rounded-full overflow-hidden'>
                          <button
                            className='px-3 py-1.5 text-white hover:bg-white/10 transition-colors font-bold cursor-pointer'
                            onClick={() => updateQuantity(item.id, 'decrease')}
                          >−</button>
                          <span className='px-3 py-1.5 text-white font-semibold min-w-[2rem] text-center'>{item.quantity}</span>
                          <button
                            className='px-3 py-1.5 text-white hover:bg-white/10 transition-colors font-bold cursor-pointer'
                            onClick={() => updateQuantity(item.id, 'increase')}
                          >+</button>
                        </div>
                        <button
                          onClick={() => deleteItem(item.id)}
                          className='p-2 rounded-full bg-red-500/10 border border-red-400/20 hover:bg-red-500/30 transition-all cursor-pointer'
                        >
                          <FaRegTrashAlt className='text-red-400 w-4 h-4' />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Info */}
                <div className='backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-6'>
                  <h2 className='text-white font-semibold text-lg border-b border-white/10 pb-3 mb-5'>Delivery Info</h2>
                  <div className='grid grid-cols-1 gap-4'>
                    <div className='flex flex-col gap-1'>
                      <label className='text-gray-300 text-sm'>Full Name</label>
                      <input
                        type="text"
                        placeholder='Enter your Name'
                        className='bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all'
                        defaultValue={user?.fullName}
                      />
                    </div>
                    <div className='flex flex-col gap-1'>
                      <label className='text-gray-300 text-sm'>Address</label>
                      <input
                        type="text"
                        placeholder='Enter your Address'
                        className='bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all'
                        defaultValue={location?.town || ''}
                      />
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                      <div className='flex flex-col gap-1'>
                        <label className='text-gray-300 text-sm'>State</label>
                        <input
                          type="text"
                          placeholder='State'
                          className='bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all'
                          defaultValue={location?.city_district || ''}
                        />
                      </div>
                      <div className='flex flex-col gap-1'>
                        <label className='text-gray-300 text-sm'>Postcode</label>
                        <input
                          type="text"
                          placeholder='Postcode'
                          className='bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all'
                          defaultValue={location?.postcode || ''}
                        />
                      </div>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                      <div className='flex flex-col gap-1'>
                        <label className='text-gray-300 text-sm'>Country</label>
                        <input
                          type="text"
                          placeholder='Country'
                          className='bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all'
                          defaultValue={location?.country || ''}
                        />
                      </div>
                      <div className='flex flex-col gap-1'>
                        <label className='text-gray-300 text-sm'>Phone No.</label>
                        <input
                          type="text"
                          placeholder='Phone number'
                          className='bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all'
                        />
                      </div>
                    </div>
                  </div>

                  <div className='flex items-center my-5 gap-4'>
                    <div className='flex-1 h-px bg-white/10' />
                    <span className='text-gray-500 text-sm'>OR</span>
                    <div className='flex-1 h-px bg-white/10' />
                  </div>

                  <button
                    onClick={getLocation}
                    className='w-full relative inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white/10 border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 cursor-pointer'
                  >
                    📍 Detect My Location
                  </button>

                  <button className='mt-4 w-full relative inline-flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-red-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 cursor-pointer'>
                    Submit Order
                  </button>
                </div>
              </div>

              {/* RIGHT - Bill Summary */}
              <div className='backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-6 space-y-4 sticky top-5'>
                <h2 className='text-white font-semibold text-lg border-b border-white/10 pb-3'>Bill Details</h2>

                <div className='space-y-3'>
                  <div className='flex justify-between items-center text-gray-300'>
                    <span className='flex items-center gap-2'><LucideNotebookText className='w-4 h-4 text-purple-300' /> Items Total</span>
                    <span className='text-white font-medium'>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className='flex justify-between items-center text-gray-300'>
                    <span className='flex items-center gap-2'><MdDeliveryDining className='text-purple-300' /> Delivery</span>
                    <span className='text-green-400 font-medium'>FREE <span className='line-through text-gray-500 ml-1 text-sm'>$25</span></span>
                  </div>
                  <div className='flex justify-between items-center text-gray-300'>
                    <span className='flex items-center gap-2'><GiShoppingBag className='text-purple-300' /> Handling</span>
                    <span className='text-white font-medium'>$5</span>
                  </div>
                </div>

                <div className='h-px bg-white/10' />

                <div className='flex justify-between items-center'>
                  <span className='text-white font-bold text-lg'>Grand Total</span>
                  <span className='text-transparent bg-clip-text bg-linear-to-r from-red-400 to-purple-400 font-bold text-xl'>
                    ${(totalPrice + 5).toFixed(2)}
                  </span>
                </div>

                {/* Promo Code */}
                <div className='pt-2'>
                  <p className='text-gray-300 text-sm mb-2 font-medium'>Apply Promo Code</p>
                  <div className='flex gap-2'>
                    <input
                      type="text"
                      placeholder='Enter code'
                      className='flex-1 bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm'
                    />
                    <button className='bg-white/10 border border-white/20 text-white px-4 py-2 rounded-xl hover:bg-white/20 transition-all cursor-pointer text-sm font-medium'>
                      Apply
                    </button>
                  </div>
                </div>

                <button className='w-full relative inline-flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-red-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 cursor-pointer mt-2'>
                  Proceed to Checkout ⚡
                </button>

                <p className='text-center text-gray-500 text-xs'>🔒 Secured by 256-bit encryption</p>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex flex-col gap-4 justify-center items-center h-[70vh]'>
            <div className='backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-12 text-center'>
              <img src={emptyCart} alt="" className='w-48 mx-auto mb-4 opacity-70' />
              <h1 className='text-white font-bold text-3xl mb-2'>Your cart is empty</h1>
              <p className='text-gray-400 mb-6'>Looks like you haven't added anything yet!</p>
              <button
                className='relative inline-flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-red-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 cursor-pointer'
                onClick={() => navigate('/products')}
              >
                Start Shopping →
              </button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Cart