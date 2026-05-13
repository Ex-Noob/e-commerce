import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const ProductListView = ({product}) => {
    const navigate = useNavigate()
    const {addToCart} = useCart()

  return (
    <div className='space-y-4 mt-2 rounded-md'>
      <div className='bg-gray-100 flex gap-7 items-center p-2 rounded-md'>
        <img src={product.thumbnail} alt={product.title} className='md:h-60 rounded-md cursor-pointer h-25 w-25' onClick={()=>navigate(`/products/${product.id}`)}/>
        <div className='space-y-2'>
            <h1 className='font-bold md:text-xl line-clamp-3 hover:text-red-400 md:w-full w-[220px] text-lg'>{product.title}</h1>
            <p className='font-semibold flex items-center md:text-lg text-sm'><span className='md:text-4xl text-2xl'>${product.price}</span> ({product.discountPercentage} % off)</p>
            <p className='text-sm'>Free delivery <strong>Fri, 18 Apr</strong>
                <br />
            Or fatest delivery <strong>Tomorrow, 17 Apr</strong>
            </p>
            <button onClick={()=>addToCart(product)} className='bg-red-500 text-white px-3 py-1 rounded-md'>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

export default ProductListView
