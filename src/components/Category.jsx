import { useNavigate } from 'react-router-dom'
import { getData } from '../context/DataContext'

const categoryIcons = {
  laptops: '💻',
  smartphones: '📱',
  tablets: '📟',
}

const Category = () => {
  const navigate = useNavigate()
  const { data } = getData()

  const getUniqueCategory = (data, property) => {
    let newVal = data?.map((curElem) => curElem[property])
    newVal = [...new Set(newVal)]
    return newVal
  }

  const categoryOnlyData = getUniqueCategory(data, 'category')

  return (
    <div className='bg-linear-to-r from-[#0f0c29] via-[#1a1340] to-[#24243e] border-t border-white/5'>
      <div className='max-w-6xl mx-auto px-4 py-8'>

        <p className='text-center text-xs font-bold tracking-[0.25em] uppercase text-gray-500 mb-5'>
          Browse by Category
        </p>

        <div className='flex flex-wrap gap-4 items-center justify-center'>
          {categoryOnlyData?.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(`/products/category/${item}`)}
              className='group flex items-center gap-2.5 px-6 py-3 backdrop-blur-sm bg-white/5 border border-white/10
                text-white font-semibold rounded-full uppercase tracking-wider text-sm
                hover:bg-linear-to-r hover:from-red-500 hover:to-purple-600
                hover:border-transparent hover:shadow-lg hover:shadow-purple-500/30
                hover:scale-105 transition-all duration-300 cursor-pointer'
            >
              <span className='text-base'>{categoryIcons[item] || '🛒'}</span>
              {item}
            </button>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Category