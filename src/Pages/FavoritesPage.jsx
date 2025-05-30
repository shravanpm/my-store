import React from "react";
import { useSelector } from "react-redux";
import { ProductCard } from "../Components/ProductCard";

export const FavoritesPage = () => {
  const favorites = useSelector((state) => state.favorites);

  return (
    <div className="max-w-7xl mx-auto px-0 py-6">
      {favorites.length === 0 ? (
        <p className="text-white">No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 justify-center mx-auto">
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
