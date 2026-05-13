import React, { useEffect, useState } from 'react'
import { getData } from '../context/DataContext'
import Loading from '../assets/Loading4.webm'
import ProductCard from '../components/ProductCard'
import Pagination from '../components/Pagination'
import { Player } from '@lottiefiles/react-lottie-player'
import notfound from '../assets/notfound.json'
import MobileFilter from '../components/MobileFilter'
import { SlidersHorizontal, Search } from 'lucide-react'

const FilterSection = ({ search, setSearch, brand, setBrand, priceRange, setPriceRange, category, handleBrandChange, handleCategoryChange, setCategory }) => {
  const { categoryOnlyData, brandOnlyData } = getData()

  return (
    <div className='backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-5 mt-10 h-max hidden md:block min-w-[210px]'>

      {/* Search */}
      <div className='relative'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
        <input
          type="text"
          placeholder='Search..'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-xl pl-9 pr-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all'
        />
      </div>

      {/* Category */}
      <h1 className='mt-5 font-semibold text-base text-transparent bg-clip-text bg-linear-to-r from-red-400 to-purple-400'>Category</h1>
      <div className='flex flex-col gap-2 mt-3'>
        {categoryOnlyData?.map((item, index) => (
          <label key={index} className={`flex gap-2 items-center cursor-pointer group px-2 py-1 rounded-lg transition-all ${category === item ? 'bg-white/10' : 'hover:bg-white/5'}`}>
            <input
              type="checkbox"
              name={item}
              checked={category === item}
              value={item}
              onChange={handleCategoryChange}
              className='accent-purple-500'
            />
            <span className={`uppercase text-sm font-medium transition-colors ${category === item ? 'text-purple-300' : 'text-gray-300 group-hover:text-white'}`}>{item}</span>
          </label>
        ))}
      </div>

      {/* Brand */}
      <h1 className='mt-5 font-semibold text-base text-transparent bg-clip-text bg-linear-to-r from-red-400 to-purple-400 mb-3'>Brand</h1>
      <select
        className='bg-white/10 border border-white/20 text-white w-full p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all'
        value={brand}
        onChange={handleBrandChange}
      >
        {brandOnlyData?.map((item, index) => (
          <option key={index} value={item} className='bg-[#1a1040] text-white'>{item.toUpperCase()}</option>
        ))}
      </select>

      {/* Price Range */}
      <h1 className='mt-5 font-semibold text-base text-transparent bg-clip-text bg-linear-to-r from-red-400 to-purple-400 mb-3'>Price Range</h1>
      <div className='flex flex-col gap-2'>
        <span className='text-gray-300 text-sm'>${priceRange[0]} – ${priceRange[1]}</span>
        <input
          type="range"
          min={0} max={5000}
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
          className='accent-purple-500 w-full'
        />
      </div>

      {/* Reset */}
      <button
        className='mt-5 w-full relative inline-flex items-center justify-center gap-2 px-4 py-2 bg-linear-to-r from-red-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300 cursor-pointer text-sm'
        onClick={() => {
          setSearch('')
          setCategory('All')
          setBrand('All')
          setPriceRange([0, 5000])
        }}
      >
        Reset Filters
      </button>
    </div>
  )
}

const Products = () => {
  const { data, fetchAllProducts } = getData()
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [brand, setBrand] = useState("All")
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [page, setPage] = useState(1)
  const [openFilter, setOpenFilter] = useState(false)

  useEffect(() => {
    fetchAllProducts()
    window.scrollTo(0, 0)
  }, [])

  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
    setPage(1)
    setOpenFilter(false)
  }

  const handleBrandChange = (e) => {
    setBrand(e.target.value)
    setPage(1)
    setOpenFilter(false)
  }

  const pageHandler = (selectedPage) => {
    setPage(selectedPage)
    window.scrollTo(0, 0)
  }

  const filteredData = data?.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) &&
    (category === "All" || item.category === category) &&
    (brand === "All" || item.brand === brand) &&
    item.price >= priceRange[0] && item.price <= priceRange[1]
  )

  const dynamicPage = Math.ceil(filteredData?.length / 8)

  return (
    <div className='min-h-screen bg-linear-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]'>
      {/* Page Header */}
      <div className='max-w-6xl mx-auto px-4 pt-10 pb-2'>
        <h1 className='text-3xl font-bold text-white flex items-center gap-3'>
          <SlidersHorizontal className='text-purple-300' />
          All Products
        </h1>
        <p className='text-gray-400 mt-1'>Browse our curated electronics collection</p>
      </div>

      <div className='max-w-6xl mx-auto px-4 pb-16'>

        {/* Mobile Filter (keep original, just passes through) */}
        <MobileFilter
          openFilter={openFilter}
          setOpenFilter={setOpenFilter}
          category={category}
          setCategory={setCategory}
          search={search}
          setSearch={setSearch}
          brand={brand}
          setBrand={setBrand}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          handleCategoryChange={handleCategoryChange}
          handleBrandChange={handleBrandChange}
        />

        {
          data?.length > 0 ? (
            <div className='flex gap-8 items-start'>
              {/* Desktop Filter */}
              <FilterSection
                category={category}
                setCategory={setCategory}
                search={search}
                setSearch={setSearch}
                brand={brand}
                setBrand={setBrand}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                handleCategoryChange={handleCategoryChange}
                handleBrandChange={handleBrandChange}
              />

              {/* Products Grid */}
              <div className='flex-1'>
                {filteredData?.length > 0 ? (
                  <div className='flex flex-col justify-center items-center'>
                    <div className='grid md:grid-cols-4 grid-cols-2 md:gap-5 gap-3 mt-10 w-full'>
                      {filteredData?.slice(page * 8 - 8, page * 8).map((product, index) => (
                        <div
                          key={index}
                          className='backdrop-blur-sm bg-white/10 border border-white/15 rounded-2xl overflow-hidden hover:scale-105 hover:bg-white/15 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer'
                        >
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            className='w-full aspect-square object-cover bg-white/5'
                            onClick={() => window.location.href = `/products/${product.id}`}
                          />
                          <div className='p-3'>
                            <h2 className='text-white font-semibold text-sm line-clamp-2 mb-1'>{product.title}</h2>
                            <p className='text-transparent bg-clip-text bg-linear-to-r from-red-400 to-purple-400 font-bold text-base mb-2'>${product.price}</p>
                            <button
                              className='w-full text-sm relative inline-flex items-center justify-center gap-1 px-3 py-1.5 bg-linear-to-r from-red-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300 cursor-pointer'
                              onClick={() => {
                                // call addToCart via ProductCard — reuse the same button logic
                                const event = new CustomEvent('addToCart', { detail: product })
                                window.dispatchEvent(event)
                              }}
                            >
                              + Cart
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Pagination styled for dark bg */}
                    <div className='mt-10 space-x-4'>
                      <button
                        disabled={page === 1}
                        className={`${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 cursor-pointer'} px-4 py-1.5 bg-linear-to-r from-red-500 to-purple-600 text-white rounded-full font-semibold transition-all`}
                        onClick={() => pageHandler(page - 1)}
                      >Prev</button>
                      {Array.from({ length: dynamicPage }, (_, i) => i + 1)
                        .filter(p => p === 1 || p === dynamicPage || Math.abs(p - page) <= 1)
                        .map((p, i, arr) => (
                          <React.Fragment key={p}>
                            {i > 0 && arr[i - 1] !== p - 1 && <span className='text-gray-500'>...</span>}
                            <span
                              onClick={() => pageHandler(p)}
                              className={`cursor-pointer font-semibold transition-colors ${p === page ? 'text-transparent bg-clip-text bg-linear-to-r from-red-400 to-purple-400' : 'text-gray-400 hover:text-white'}`}
                            >{p}</span>
                          </React.Fragment>
                        ))}
                      <button
                        disabled={page === dynamicPage}
                        className={`${page === dynamicPage ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 cursor-pointer'} px-4 py-1.5 bg-linear-to-r from-red-500 to-purple-600 text-white rounded-full font-semibold transition-all`}
                        onClick={() => pageHandler(page + 1)}
                      >Next</button>
                    </div>
                  </div>
                ) : (
                  <div className='flex justify-center items-center md:h-150 mt-10'>
                    <Player autoplay loop src={notfound} style={{ width: '400px' }} />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className='flex items-center justify-center h-100'>
              <video muted autoPlay loop>
                <source src={Loading} type='video/webm' />
              </video>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Products