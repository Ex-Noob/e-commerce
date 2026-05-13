import React, { useEffect } from 'react'
import { getData } from '../context/DataContext'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'
import 'swiper/css/navigation'
import { Autoplay, Navigation } from 'swiper/modules';
import Category from './Category';
import { Link } from 'react-router-dom';

const Carousel = () => {
  const { data, fetchAllProducts } = getData()

  useEffect(() => {
    fetchAllProducts()
  }, [])

  return (
    <div className='bg-linear-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]'>
      <Swiper
        modules={[Autoplay, Navigation]}
        autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        navigation={true}
        loop={true}
        speed={700}
        slidesPerView={1}
        slidesPerGroup={1}
      >
        {data?.slice(0, 6).map((item, index) => (
          <SwiperSlide key={index}>
            <div className='relative flex flex-col md:flex-row gap-8 md:gap-16 justify-center items-center
              px-6 md:px-16 py-16 md:py-0 min-h-[520px] md:h-[600px] overflow-hidden'>

              {/* Ambient glow blobs */}
              <div className='absolute top-10 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl pointer-events-none' />
              <div className='absolute bottom-10 right-10 w-72 h-72 bg-red-500/15 rounded-full blur-3xl pointer-events-none' />

              {/* Text side */}
              <div className='relative z-10 flex flex-col gap-4 md:gap-5 md:max-w-[520px] text-center md:text-left'>
                <span className='inline-block text-xs font-bold tracking-[0.25em] uppercase text-transparent bg-clip-text bg-linear-to-r from-red-400 to-purple-400'>
                  ✦ Next-Gen Electronics
                </span>

                <h1 className='text-2xl sm:text-3xl md:text-5xl font-black uppercase leading-tight text-white line-clamp-3'>
                  {item.title}
                </h1>

                <p className='text-gray-400 text-sm md:text-base line-clamp-3 leading-relaxed'>
                  {item.description}
                </p>

                <div className='flex gap-3 flex-wrap justify-center md:justify-start mt-2'>
                  <Link to={`/products/${item.id}`}>
                    <button className='relative inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-red-500 to-purple-600 text-white font-semibold rounded-full shadow-lg shadow-purple-500/30 hover:shadow-purple-500/60 hover:scale-105 transition-all duration-300 cursor-pointer'>
                      Shop Now <span>→</span>
                    </button>
                  </Link>
                  <Link to='/products'>
                    <button className='px-6 py-3 bg-white/5 border border-white/15 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 cursor-pointer'>
                      Browse All
                    </button>
                  </Link>
                </div>

                {/* Mini stats */}
                <div className='flex gap-6 mt-2 justify-center md:justify-start'>
                  <div>
                    <p className='text-white font-bold text-lg'>${item.price}</p>
                    <p className='text-gray-500 text-xs'>Price</p>
                  </div>
                  <div className='w-px bg-white/10' />
                  <div>
                    <p className='text-green-400 font-bold text-lg'>{item.discountPercentage}% OFF</p>
                    <p className='text-gray-500 text-xs'>Discount</p>
                  </div>
                  <div className='w-px bg-white/10' />
                  <div>
                    <p className='text-yellow-400 font-bold text-lg'>★ {item.rating}</p>
                    <p className='text-gray-500 text-xs'>Rating</p>
                  </div>
                </div>
              </div>

              {/* Image side */}
              <div className='relative z-10 shrink-0'>
                {/* Outer glow ring */}
                <div className='absolute inset-0 rounded-full bg-linear-to-br from-red-500/30 to-purple-600/30 blur-2xl scale-110 pointer-events-none' />
                <div className='relative w-52 h-52 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-white/5 border border-white/15 backdrop-blur-sm p-4 shadow-2xl shadow-purple-500/20 flex items-center justify-center'>
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className='w-full h-full object-contain rounded-full hover:scale-110 transition-transform duration-700'
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Category />
    </div>
  )
}

export default Carousel