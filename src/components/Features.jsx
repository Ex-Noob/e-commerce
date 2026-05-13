import { Clock, Lock, RotateCcw, Truck } from 'lucide-react'
import React from 'react'

const features = [
  { icon: Truck,     text: 'Free Shipping',   subtext: 'On Orders Over $100',         color: 'from-blue-500 to-cyan-400' },
  { icon: Lock,      text: 'Secure Payment',  subtext: '100% Protected Payments',     color: 'from-green-500 to-emerald-400' },
  { icon: RotateCcw, text: 'Easy Returns',    subtext: '30-Day Return Policy',         color: 'from-red-500 to-pink-400' },
  { icon: Clock,     text: '24/7 Support',    subtext: 'Dedicated Customer Service',  color: 'from-purple-500 to-violet-400' },
]

const Features = () => {
  return (
    <div className='bg-linear-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] py-16 px-4'>
      <div className='max-w-6xl mx-auto'>

        <div className='text-center mb-10'>
          <span className='text-xs font-bold tracking-[0.25em] uppercase text-transparent bg-clip-text bg-linear-to-r from-red-400 to-purple-400'>
            ✦ Why Choose Us
          </span>
          <h2 className='text-2xl md:text-3xl font-black text-white mt-2'>Everything you need, nothing you don't</h2>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='group backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center gap-4 hover:bg-white/10 hover:border-purple-400/30 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300'
            >
              {/* Icon with gradient glow bg */}
              <div className={`p-4 rounded-2xl bg-linear-to-br ${feature.color} shadow-lg`}>
                <feature.icon className='w-7 h-7 text-white' />
              </div>
              <div>
                <p className='text-white font-bold text-base'>{feature.text}</p>
                <p className='text-gray-400 text-sm mt-1 leading-relaxed'>{feature.subtext}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Features