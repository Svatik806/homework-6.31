import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../redux/slices/filterSlice";
import { toggleCart } from "../redux/slices/cartSlice";

const Header = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const searchQuery = useSelector((state) => state.filter.searchQuery);

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return <header className="bg-slate-900 text-white sticky top-0 z-10 shadow-lg ">
    <div className="max-w-6xl mx-auto p-4 flex item justify-between gap-4">
      <h1 className="text-xl font-bold text-indigo-400">TechMarket</h1>

      <input placeholder="Пошук товарів..." value={searchQuery} onChange={event => dispatch(setSearchQuery(event.target.value))} type="text" className="bg-slate-800 text-sm px-4 py-2 rounded-lg w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 " />
      <button className="relative bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg font-medium transition" onClick={() => dispatch(toggleCart())}>
        Кошик
        {totalCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">{totalCount}</span>
        )}
      </button>
    </div>
  </header>
};

export default Header;
