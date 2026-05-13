import React from 'react'
import { FaFilter } from 'react-icons/fa6'
import { getData } from '../context/DataContext'


const MobileFilter = ({ openFilter, setOpenFilter, search, setSearch, brand, setBrand, priceRange, setPriceRange, category, handleBrandChange, handleCategoryChange, setCategory }) => {
    const { categoryOnlyData, brandOnlyData } = getData()

    const toggleFilter = ()=> {
        setOpenFilter(!openFilter)
    }
    return (
        <>
            <div className='bg-gray-100 flex justify-between items-center md:hidden px-4 p-2 mt-5'>
                <h1 className='font-semibold text-xl'>Filters</h1>
                <FaFilter className='text-gray-800' onClick={toggleFilter} />
            </div>
            {
                openFilter ? <div className='bg-gray-100 p-2 md:hidden'>
                    <input type="text"
                        placeholder='Search..'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='bg-white rounded-md border-gray-400 border-2 p-1 w-full'
                    />

                    {/* category only data */}
                    <h1 className='mt-5 font-semibold text-xl'>Category</h1>
                    <div className='flex flex-col gap-2 mt-3'>
                        {
                            categoryOnlyData?.map((item, index) => {
                                return <div key={index} className='flex gap-2'>
                                    <input type="checkbox"
                                        name={item}
                                        checked={category === item}
                                        value={item}
                                        onChange={handleCategoryChange}
                                    />
                                    <button className='cursor-pointer uppercase'>{item}</button>
                                </div>
                            })
                        }
                    </div>
                    {/* Brand only data */}
                    <h1 className='mt-5 font-semibold text-xl mb-3'>Brand</h1>
                    <select name="" id=""
                        className='bg-white w-full p-2 border-gray-200 border-2 rounded-md'
                        value={brand}
                        onChange={handleBrandChange}
                    >
                        {
                            brandOnlyData?.map((item, index) => {
                                return <option key={index} value={item}>{item.toUpperCase()}</option>
                            })
                        }
                    </select>

                    {/* Price Range Filter */}
                    <h1 className='mt-5 font-semibold text-xl mb-3'>Price Range</h1>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="">Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
                        <input type="range"
                            min={0} max={5000}
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        />
                    </div>

                    {/* Reset Filter */}
                    <button className='bg-red-500 text-white rounded-md px-3 py-1 mt-5 cursor-pointer hover:scale-105  transition-all'
                        onClick={() => {
                            setSearch('')
                            setCategory('All')
                            setBrand('All')
                            setPriceRange([0, 5000])
                            setOpenFilter(false)
                        }}>
                        Reset Filter</button>
                </div> : null
            }
        </>
    )
}

export default MobileFilter
