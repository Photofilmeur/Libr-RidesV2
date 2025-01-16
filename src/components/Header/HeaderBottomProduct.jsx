import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const HeaderBottomProduct = () => {
  const currentPath = window.location.pathname
  const pathSegments = currentPath.split('/')
  const lastSegment = pathSegments[pathSegments.length - 1]

  const CategoryToFilter = lastSegment.toUpperCase()

  const [activeCategory, setActiveCategory] = useState(CategoryToFilter)

  return (
    <div className="fixed top-20 z-10 justify-center w-full ">
      <div className="h-10 bg-black bg-opacity-70 text-white p-2 flex items-center justify-between ">
        <div className="w-full flex justify-center space-x-4 ">
          <Link to="/Product/Route">
            <button
              className={`font-title h-10 w-20 m-2 py-2 rounded text-center ${
                activeCategory === 'ROUTE'
                  ? 'text-red-500 hover:bg-gray-900'
                  : 'hover:bg-gray-900'
              }`}
              onClick={() => setActiveCategory('ROUTE')}
            >
              Routières
            </button>
          </Link>

          <Link to="/Product/Cross">
            <button
              className={`font-title h-10 w-20 m-2 py-2 rounded text-center ${
                activeCategory === 'CROSS'
                  ? 'text-red-500 hover:bg-gray-900'
                  : 'hover:bg-gray-900'
              }`}
              onClick={() => setActiveCategory('CROSS')}
            >
              Cross
            </button>
          </Link>

          <Link to="/Product/Quads">
            <button
              className={`font-title h-10 w-20 m-2 py-2 rounded text-center ${
                activeCategory === 'QUADS'
                  ? 'text-red-500 hover:bg-gray-900'
                  : 'hover:bg-gray-900'
              }`}
              onClick={() => setActiveCategory('QUADS')}
            >
              Quads
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HeaderBottomProduct
