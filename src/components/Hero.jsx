import React from "react";
import bg from "../assets/bg.png";
import {Link} from 'react-router-dom'

const Hero = () => {
  return (
    <section className="relative bg-green-600 text-white mt-12 md:mt-16">
      <div className="max-w-6xl mx-auto py-16 flex flex-col md:flex-row items-center px-6 md:px-0 gap-7">
        
        {/* LEFT TEXT */}
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Fresh <span className="text-orange-400">Groceries</span> Delivered to Your Door
          </h1>

          <p className="text-lg mb-6">
            Shop from our wide selection of fresh fruits, vegetables, dairy, and more. Get same-day delivery!
          </p>

          <div className="flex flex-wrap gap-4 items-center">
           <Link to='/shop'> <button className="cursor-pointer bg-white text-green-600 hover:bg-gray-100 rounded-full px-4 py-2">
              Shop Now
            </button></Link>
            <button className="text-white cursor-pointer border border-white bg-green-700 hover:bg-green-600 rounded-full px-4 py-2">
              Learn More
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-center md:w-1/2">
          <div className="absolute inset-0  backdrop-blur-sm"></div>

          {/* BIGGER IMAGE SIZE */}
          <div className="relative z-10 w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-lg overflow-hidden">
            <img 
              src={bg} 
              alt="Grocery background" 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
