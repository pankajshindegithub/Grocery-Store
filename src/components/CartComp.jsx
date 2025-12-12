// src/components/CartComp.jsx
import React from 'react';
import { CgClose } from 'react-icons/cg';
import { Trash2, ChevronRight, LucideNotebookText } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQty } from '../Redux/CartSlice'; // adjust path if needed
import { Link } from 'react-router-dom';
import { MdDeliveryDining } from 'react-icons/md';
import { GiShoppingBag } from 'react-icons/gi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const CartComp = ({ isOpen, onClose }) => {
  const { cart } = useSelector(store => store.cart);
  const dispatch = useDispatch();

  const getQuantity = (item) => {
    if (typeof item.qty === 'number') return item.qty;
    if (typeof item.unit === 'number') return item.unit;
    return 1;
  };

  const increase = (id) => {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    dispatch(updateQty({ id, qty: getQuantity(item) + 1 }));
  };

  const decrease = (id) => {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    const qty = getQuantity(item);
    if (qty <= 1) {
      // removing last unit of this item
      dispatch(removeItem(id));
      const willBeEmpty = cart.length === 1; // after removal cart becomes empty
      if (willBeEmpty) {
        toast.success("Item removed — your cart is now empty.", { position: "bottom-right", autoClose: 1400 });
      } else {
        toast.success("Item removed from cart", { position: "bottom-right", autoClose: 1200 });
      }
    } else {
      dispatch(updateQty({ id, qty: qty - 1 }));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeItem(id));
    const willBeEmpty = cart.length === 1; // removing one item
    if (willBeEmpty) {
      toast.success("Item removed — your cart is now empty.", { position: "top-right", autoClose: 1400 });
    } else {
      toast.success("Item removed from cart", { position: "top-right", autoClose: 1200 });
    }
  };

  const totalPrice = cart.reduce((sum, item) => {
    const qty = getQuantity(item);
    return sum + ((Number(item.price) || 0) * qty);
  }, 0);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[400px] bg-gray-100 shadow-lg p-4 z-50 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <h2 className="text-xl font-bold mb-4 flex justify-between items-center px-4">
        My Cart
        <button onClick={onClose} aria-label="Close cart" className="p-1 cursor-pointer">
          <CgClose />
        </button>
      </h2>

      {/* EMPTY STATE */}
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60%] text-center px-6">
          <div className="w-40 h-40 mb-6 empty-cart-anim">
            <svg viewBox="0 0 64 64" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <g fill="none" stroke="none">
                <rect width="64" height="64" rx="8" fill="#F3F4F6"/>
                <g transform="translate(12 14)">
                  <path d="M2 2h8l4 18h22l6-12H12" fill="#EDF7EF"/>
                  <path d="M2 2h8l4 18h22l6-12H12" stroke="#D1FAE5" strokeWidth="1" />
                  <circle cx="14" cy="36" r="4" fill="#D1FAE5" />
                  <circle cx="34" cy="36" r="4" fill="#D1FAE5" />
                </g>
              </g>
            </svg>
          </div>

          <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
          <p className="text-sm text-gray-600 mb-5">Looks like you haven't added anything yet. Go pick something you love!</p>

                 </div>
      ) : (
        <>
          {/* CART LIST */}
          <div className="space-y-4">
            {cart.map(item => {
              const qty = getQuantity(item);
              const price = Number(item.price) || 0;
              const subtotal = price * qty;

              return (
                <div key={item.id} className="flex items-start gap-4 p-2 bg-white rounded-md">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />

                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <p className="text-xs text-gray-500">{item.category}</p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => decrease(item.id)}
                        className="px-3 py-1 border rounded text-lg"
                        aria-label={`decrease-${item.id}`}
                      >
                        -
                      </button>

                      <div className="px-4 py-1 border rounded text-center">{qty}</div>

                      <button
                        onClick={() => increase(item.id)}
                        className="px-3 py-1 border rounded text-lg"
                        aria-label={`increase-${item.id}`}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* SUBTOTAL + TRASH ICON */}
                  <div className="flex flex-col items-end gap-3">
                    <p className="font-semibold">₹{subtotal}</p>

                    <button
                      onClick={() => handleRemove(item.id)}
                      className="p-2 rounded hover:bg-red-50"
                      aria-label={`remove-${item.id}`}
                      title="Remove item"
                    >
                      <Trash2 size={18} className="text-red-500" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* BILL SECTION */}
          <div className="bg-white rounded-md p-4 mt-4 space-y-1">
            <h1 className="text-gray-800 font-bold text-xl">Bill details</h1>

            <div className="flex justify-between items-center">
              <h1 className="flex gap-1 items-center text-gray-700"><LucideNotebookText /> Items total</h1>
              <p>₹{totalPrice}</p>
            </div>

            <div className="flex justify-between items-center">
              <h1 className="flex gap-1 items-center text-gray-700"><MdDeliveryDining /> Delivery Charges</h1>
              <p className="text-green-600"><span className="line-through text-gray-600">₹25</span> Free</p>
            </div>

            <div className="flex justify-between items-center">
              <h1 className="flex gap-1 items-center text-gray-700"><GiShoppingBag /> Handling charge</h1>
              <p className="text-green-600">₹5</p>
            </div>

            <div className="flex justify-between items-center">
              <h1 className="font-semibold text-lg">Grand total</h1>
              <p className="font-semibold text-lg">₹{totalPrice + 5}</p>
            </div>
          </div>

          {/* CHECKOUT CTA */}
          <div className="bg-white p-5 rounded-md mt-4">
            <div className="bg-green-600 text-white w-full py-2 px-3 rounded-md flex justify-between items-center cursor-pointer">
              <div>
                <h1 className="font-semibold">₹{totalPrice + 5}</h1>
                <h1 className="text-gray-100">TOTAL</h1>
              </div>
              <div className="flex gap-1 items-center font-semibold">
                <h1 className="text-lg">Login to Proceed</h1>
                <ChevronRight />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartComp;
