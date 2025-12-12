import React from 'react'
import { Link } from 'react-router-dom'

const Template = () => {
  return (
    <section className='py-12 bg-green-100'>
        <div className='container px-4 mx-auto text-2xl text-center'>
            <h1 className='text-3xl font-bold mb-4'>Free Delivery on Your First Order</h1>
            <p className='text-lg mb-6 max-w-2xl mx-auto'>Use code FRESH10 at checkout for free delivery on orders over ₹30</p>
                  <Link to='/shop'>  <button className='px-4 py-2 bg-green-500 rounded-full text-white cursor-pointer'>Shop Now</button></Link>

        </div>
      
    </section>
  )
}

export default Template
