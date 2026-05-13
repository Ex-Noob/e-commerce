import React from 'react'

const BrandName = ({ className = "" }) => (
  <span style={{fontFamily: "'Oxanium', sans-serif"}}
  className={`font-bold bg-linear-to-r from-red-500 to-purple-600 bg-clip-text text-transparent ${className}`}>
  E-Commerce
</span>
)
export default BrandName
