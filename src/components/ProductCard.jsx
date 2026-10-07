import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-700 overflow-hidden flex flex-col justify-between transition hover:shadow-md">
      <img
        className="w-full h-48 object-cover"
        src={product.image}
        alt={product.name}
      />
      <div className="flex flex-col flex-1 justify-between p-4">
        <div>
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            {product.category}
          </span>
          <h3 className="font-semibold text-slate-800 mt-1">{product.name}</h3>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-bold text-slate-900">
            ${product.price}
          </span>
          <button
            className="bg-slate-900 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-indigo-600 transition"
            onClick={() => dispatch(addToCart(product))}
          >
            У кошик
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
