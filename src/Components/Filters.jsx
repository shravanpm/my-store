import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCategory, setSort } from "../Redux/Reducers/FiltersSlice";
import axios from "axios";

export const Filters = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 bg-white px-4 py-3 rounded-lg shadow-md border border-gray-200">
      <select
        onChange={(e) => dispatch(setCategory(e.target.value))}
        className="border border-gray-300 px-3 py-2 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
      >
        <option value="all">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>

      <select
        onChange={(e) => dispatch(setSort(e.target.value))}
        className="border border-gray-300 px-3 py-2 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
      >
        <option value="default">Default Sort</option>
        <option value="low">Price: Low to High</option>
        <option value="high">Price: High to Low</option>
      </select>
    </div>
  );
};
