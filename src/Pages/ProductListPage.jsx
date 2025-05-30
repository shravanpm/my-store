import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../Components/SearchBar";
import { Filters } from "../Components/Filters";
import { ProductCard } from "../Components/ProductCard";
import { fetchProducts } from "../Redux/Reducers/ProductsSlice";

export const ProductListPage = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);
  const { search, category, sort } = useSelector((state) => state.filters);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filtered = items
    .filter((p) => category === "all" || p.category === category)
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-0 py-6">
      <SearchBar />
      <Filters />
      {status === "loading" && <p className="text-gray-500 mt-4">Loading...</p>}
      <div className="grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 justify-center mx-auto">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} cardType={"home"} />
        ))}
      </div>
    </div>
  );
};
