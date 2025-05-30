import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToFavorites,
  removeFromFavorites,
} from "../Redux/Reducers/FavoritesSlice.js";
import { Toast } from "./Toast.jsx";

export const ProductCard = ({ product, cardType }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const [toastVisible, setToastVisible] = useState(false);
  const showToast = () => setToastVisible(true);
  const hideToast = () => setToastVisible(false);
  const [toastMsg, setToastMsg] = useState("");
  const isPresentInFav =
    favorites.filter((prod) => prod.id === product.id).length > 0;

  function handleSubmit() {
    if (cardType === "home" && !isPresentInFav) {
      setToastMsg("Product is added to favourites!");
      dispatch(addToFavorites(product));
    } else {
      setToastMsg("Product is removed from favourites!");
      dispatch(removeFromFavorites(product.id));
    }
    showToast();
  }

  return (
    <div className="bg-white border rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col w-full max-w-xs mx-auto h-full">
      <div className="flex-grow flex flex-col text-center">
        <Link to={`/product/${product.id}`} className="flex flex-col flex-grow">
          <img
            src={product.image}
            alt={product.title}
            className="h-40 mx-auto object-contain"
          />
          <h2 className="text-md font-semibold mt-2 line-clamp-2">
            {product.title}
          </h2>
        </Link>

        <div className="flex-grow"></div>

        <p className="text-gray-700 mb-2">${product.price}</p>
      </div>

      <div className="mt-2">
        <button
          className={`${
            cardType === "home" && !isPresentInFav
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-red-500 hover:bg-red-600"
          } text-white px-4 py-2 rounded cursor-pointer w-full`}
          onClick={handleSubmit}
        >
          {cardType === "home" && !isPresentInFav
            ? "Add to Favorites"
            : "Remove from favorites"}
        </button>
        <Toast message={toastMsg} show={toastVisible} onClose={hideToast} />
      </div>
    </div>
  );
};
