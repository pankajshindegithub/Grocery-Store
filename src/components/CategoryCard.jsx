import React from 'react'

const CategoryCard = ({ name, image }) => {
  return (
    <div className='flex flex-col items-center gap-3 cursor-pointer'>

      {/* Circular Image */}
      <div className='w-30 h-30 bg-gray-200 rounded-full overflow-hidden border border-gray-300 shadow-sm'>
        <img
          src={image}
          alt={name}
          className='w-full h-full object-cover'
        />
      </div>

      {/* Name */}
      <h3 className='text-sm font-medium text-gray-700 text-center'>
        {name}
      </h3>

    </div>
  )
}

export default CategoryCard
