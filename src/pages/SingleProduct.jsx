import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../assets/Loading4.webm'
import Breadcrums from '../components/Breadcrums';
import { IoCartOutline } from 'react-icons/io5';
import { useCart } from '../context/CartContext';
import { Star, ShieldCheck, RotateCcw, Truck, Zap } from 'lucide-react';

const SingleProduct = () => {
    const params = useParams()
    const [SingleProduct, setSingleProduct] = useState('')
    const [selectedImage, setSelectedImage] = useState('')
    const [quantity, setQuantity] = useState(1)
    const { addToCart } = useCart()

    const getSingleProduct = async () => {
        try {
            const res = await axios.get(`https://dummyjson.com/products/${params.id}`)
            const product = res.data;
            setSingleProduct(product)
            setSelectedImage(product.thumbnail)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSingleProduct()
        window.scrollTo(0, 0)
    }, [])

    const OriginalPrice = Math.round(SingleProduct.price + (SingleProduct.price * SingleProduct.discountPercentage / 100))

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'}`}
            />
        ))
    }

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(SingleProduct)
        }
    }

    return (
        <>
            {
                SingleProduct ? (
                    <div className='min-h-screen bg-linear-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] px-4 py-10'>
                        {/* Breadcrumb styled for dark bg */}
                        <div className='max-w-6xl mx-auto mb-6'>
                            <p className='text-gray-400 text-sm'>
                                <span className='hover:text-white cursor-pointer transition-colors'>Home</span>
                                <span className='mx-2 text-gray-600'>/</span>
                                <span className='hover:text-white cursor-pointer transition-colors'>Products</span>
                                <span className='mx-2 text-gray-600'>/</span>
                                <span className='text-purple-300 line-clamp-1'>{SingleProduct.title}</span>
                            </p>
                        </div>

                        <div className='max-w-6xl mx-auto'>
                            <div className='backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-6 md:p-10'>
                                <div className='grid md:grid-cols-2 grid-cols-1 gap-10'>

                                    {/* LEFT - Images */}
                                    <div className='flex flex-col gap-4'>
                                        {/* Main Image */}
                                        <div className='backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-center overflow-hidden'>
                                            <img
                                                src={selectedImage}
                                                alt={SingleProduct.title}
                                                className='w-full max-h-96 object-contain rounded-xl hover:scale-105 transition-transform duration-500'
                                            />
                                        </div>

                                        {/* Thumbnail Strip */}
                                        {SingleProduct.images?.length > 1 && (
                                            <div className='flex gap-3 overflow-x-auto pb-2'>
                                                {SingleProduct.images.map((img, i) => (
                                                    <img
                                                        key={i}
                                                        src={img}
                                                        alt={`view-${i}`}
                                                        onClick={() => setSelectedImage(img)}
                                                        className={`w-16 h-16 object-cover rounded-xl cursor-pointer border-2 transition-all shrink-0 ${selectedImage === img ? 'border-purple-400 scale-105' : 'border-white/20 hover:border-purple-300'}`}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* RIGHT - Details */}
                                    <div className='flex flex-col gap-5'>
                                        {/* Badge */}
                                        <div className='flex gap-2 flex-wrap'>
                                            <span className='text-xs uppercase tracking-widest px-3 py-1 bg-purple-500/30 border border-purple-400/40 text-purple-300 rounded-full'>
                                                {SingleProduct.category}
                                            </span>
                                            {SingleProduct.brand && (
                                                <span className='text-xs uppercase tracking-widest px-3 py-1 bg-red-500/20 border border-red-400/30 text-red-300 rounded-full'>
                                                    {SingleProduct.brand}
                                                </span>
                                            )}
                                        </div>

                                        {/* Title */}
                                        <h1 className='text-2xl md:text-3xl font-bold text-white leading-tight'>
                                            {SingleProduct.title}
                                        </h1>

                                        {/* Rating */}
                                        <div className='flex items-center gap-2'>
                                            <div className='flex gap-0.5'>{renderStars(SingleProduct.rating)}</div>
                                            <span className='text-gray-400 text-sm'>({SingleProduct.rating}/5)</span>
                                            <span className='text-gray-500 text-sm'>· {SingleProduct.stock} in stock</span>
                                        </div>

                                        {/* Price */}
                                        <div className='backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4'>
                                            <div className='flex items-end gap-3 flex-wrap'>
                                                <span className='text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-red-400 to-purple-400'>
                                                    ${SingleProduct.price}
                                                </span>
                                                <span className='text-gray-500 line-through text-xl'>${OriginalPrice}</span>
                                                <span className='bg-linear-to-r from-red-500 to-purple-600 text-white text-sm px-3 py-1 rounded-full font-semibold'>
                                                    {SingleProduct.discountPercentage}% OFF
                                                </span>
                                            </div>
                                            <p className='text-green-400 text-sm mt-1 flex items-center gap-1'>
                                                <Zap className='w-3 h-3' /> You save ${OriginalPrice - SingleProduct.price} on this order
                                            </p>
                                        </div>

                                        {/* Description */}
                                        <p className='text-gray-300 leading-relaxed text-sm md:text-base'>
                                            {SingleProduct.description}
                                        </p>

                                        {/* Quantity */}
                                        <div className='flex items-center gap-4'>
                                            <span className='text-gray-300 text-sm font-medium'>Quantity:</span>
                                            <div className='flex items-center gap-0 backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl overflow-hidden'>
                                                <button
                                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                                    className='px-4 py-2 text-white hover:bg-white/10 transition-colors text-lg font-bold cursor-pointer'
                                                >−</button>
                                                <span className='px-4 py-2 text-white font-semibold min-w-[2.5rem] text-center'>{quantity}</span>
                                                <button
                                                    onClick={() => setQuantity(q => q + 1)}
                                                    className='px-4 py-2 text-white hover:bg-white/10 transition-colors text-lg font-bold cursor-pointer'
                                                >+</button>
                                            </div>
                                        </div>

                                        {/* CTA Buttons */}
                                        <div className='flex gap-3 flex-wrap'>
                                            <button
                                                onClick={handleAddToCart}
                                                className='flex-1 relative inline-flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-red-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 cursor-pointer'
                                            >
                                                <IoCartOutline className='w-5 h-5' /> Add to Cart
                                            </button>
                                            <button className='flex-1 px-6 py-3 backdrop-blur-sm bg-white/10 border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 cursor-pointer'>
                                                Buy Now ⚡
                                            </button>
                                        </div>

                                        {/* Trust badges */}
                                        <div className='grid grid-cols-3 gap-3 mt-2'>
                                            {[
                                                { icon: Truck, label: 'Free Shipping' },
                                                { icon: ShieldCheck, label: 'Secure Pay' },
                                                { icon: RotateCcw, label: 'Easy Returns' },
                                            ].map(({ icon: Icon, label }, i) => (
                                                <div key={i} className='flex flex-col items-center gap-1 backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-3 text-center'>
                                                    <Icon className='w-5 h-5 text-purple-300' />
                                                    <span className='text-gray-300 text-xs'>{label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='flex items-center justify-center h-screen bg-linear-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]'>
                        <video muted autoPlay loop>
                            <source src={Loading} type='video/webm' />
                        </video>
                    </div>
                )
            }
        </>
    )
}

export default SingleProduct