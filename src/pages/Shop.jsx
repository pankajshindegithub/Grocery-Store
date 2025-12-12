import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from "../Utils/Data";
import empty from "../assets/empty.jpg";
import { FiFilter } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';

const Shop = () => {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  // mobile drawer state
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // --- filter logic (fixed variable name) ---
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "" || product.category === category) &&
    product.price >= priceRange[0] &&
    product.price <= priceRange[1]
  );

  // reset handler (shared)
  const resetFilters = () => {
    setSearch('');
    setCategory('');
    setPriceRange([0, 500]);
  };

  return (
    <div className='mt-16 max-w-6xl mx-auto flex flex-col lg:gap-6 my-7 lg:mt-28 mt-24 h-max'>

      {/* MOBILE: top bar with Filters button */}
      <div className="md:hidden px-4 mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Shop</h2>

        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
          aria-label="Open filters"
        >
          <FiFilter /> Filters
        </button>
      </div>

      {/* FILTER SIDEBAR (desktop) */}
      <div className='col-span-1 p-4 bg-gray-100 h-max rounded-lg fixed w-[280px] mb-10 hidden md:block' >
        <h2 className='text-lg font-semibold mb-4' >Filters</h2>

        <input placeholder='Search...'
          className='mb-4 bg-white p-2 w-full rounded-md'
          value={search}
          onChange={(e) => setSearch(e.target.value)} />

        <select
          className='w-full p-2 border rounded mb-4'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Fruits">Fruits</option>
          <option value="Dairy">Dairy</option>
          <option value="Bakery">Bakery</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Meat">Meat</option>
        </select>

        <div className='mb-4'>
          <label className='block mb-1'>Price Range: {priceRange[0]} - {priceRange[1]}</label>
          <input
            type="range"
            min="0"
            max="500"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className='w-full'
          />
        </div>

        <div className="flex gap-2">
          <button
            className='px-8 py-2 bg-red-500 rounded-md text-white cursor-pointer'
            onClick={resetFilters}
          >
            Reset
          </button>
        </div>
      </div>

      {/* PRODUCTS / EMPTY SECTION */}
      {filteredProducts.length > 0 ? (
        <div className='col-span-3 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:ml-[300px] px-4 md:px-0 mt-6 md:mt-0'>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className='lg:ml-[300px] flex flex-col items-center justify-center px-4 md:px-0 mt-12'>
          <img src={empty} alt="empty" className='w-full max-w-sm object-contain mb-6' />
          <h3 className='text-xl font-semibold mb-2'>No products found</h3>
          <p className='text-sm text-gray-600 mb-4'>Try changing filters or search to find products.</p>
        </div>
      )}

      {/* MOBILE FILTER DRAWER (bottom sheet) */}
      {mobileFiltersOpen && (
        <>
          {/* backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setMobileFiltersOpen(false)}
            aria-hidden="true"
          />

          {/* sheet */}
          <div className="fixed inset-x-0 bottom-0 z-50">
            <div className="bg-white rounded-t-xl shadow-lg p-4 max-h-[70vh] overflow-auto">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button onClick={() => setMobileFiltersOpen(false)} className="p-1">
                  <IoClose size={20} />
                </button>
              </div>

              {/* filters (same as desktop) */}
              <div className="space-y-3">
                <input
                  placeholder='Search...'
                  className='mb-1 bg-gray-100 p-3 w-full rounded-md'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <select
                  className='w-full p-3 border rounded mb-1'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Dairy">Dairy</option>
                  <option value="Bakery">Bakery</option>
                  <option value="Vegetables">Vegetables</option>
                  <option value="Meat">Meat</option>
                </select>

                <div>
                  <label className='block mb-1'>Price Range: {priceRange[0]} - {priceRange[1]}</label>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className='w-full'
                  />
                </div>

                <div className="flex gap-2 mt-2">
                  <button
                    className='flex-1 px-4 py-2 bg-green-600 text-white rounded-md cursor-pointer'
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    Apply
                  </button>
                  <button
                    className='px-4 py-2 bg-red-500 rounded-md text-white'
                    onClick={resetFilters}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Shop;
