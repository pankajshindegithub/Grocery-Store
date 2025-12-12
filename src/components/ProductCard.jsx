import React from "react";
import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../Redux/CartSlice";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const { cart } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const addToCart = (product) => {
    const isExist = cart.find((item) => item.id === product.id);

    if (isExist) {
      toast.warning("Product is already in the cart", {
        position: "bottom-right",
        autoClose: 1500,
      });
      return;
    }

    const payload = { ...product, qty: 1 };
    dispatch(addItem(payload));

    toast.success("Added to cart successfully!", {
      position: "bottom-right",
      autoClose: 1500,
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-center p-4 ">
        <img src={product.image} alt={product.name} className="object-contain" />
      </div>

      <div className="px-4 pb-4">
        <div className="flex items-center justify-between">
          <p className="text-xs text-green-600">{product.category}</p>
          <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4 text-yellow-400"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M12 .587l3.668 7.431L24 9.587l-6 5.847L19.335 24 12 19.897 4.665 24 6 15.434 0 9.587l8.332-1.569z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">
              {product.rating ?? "4.8"}
            </span>
          </div>
        </div>

        <h3 className="mt-2 text-sm md:text-base font-semibold text-gray-800 leading-tight">
          {product.name}
        </h3>

        <p className="text-xs text-gray-500 mt-1">
          {product.quantity} {product.unit}
        </p>

        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="text-lg font-bold text-gray-900">
              ₹{product.price}
            </span>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-green-200 cursor-pointer"
          >
            <ShoppingCart size={16} /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
