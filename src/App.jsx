import React from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCTS } from "./data/products";
import Header from "./components/Header";
import CartModal from "./components/CartModal";
import { setCategory } from "./redux/slices/filterSlice";
import ProductCard from "./components/ProductCard";

const CATEGORIES = ["Усі", "Аудіо", "Ґаджети", "Периферія"];

const App = () => {
  const dispatch = useDispatch();
  const { selectedCategory, searchQuery } = useSelector(
    (state) => state.filter
  );

  const filterProducts = PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === "Усі" || product.category === selectedCategory;

    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  console.log(filterProducts);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <CartModal />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => dispatch(setCategory(category))}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                selectedCategory === category
                  ? "text-white bg-indigo-600"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filterProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
