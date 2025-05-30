import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addToFavorites,
  removeFromFavorites,
} from "../Redux/Reducers/FavoritesSlice";
import { Toast } from "../Components/Toast";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const showToast = () => setToastVisible(true);
  const hideToast = () => setToastVisible(false);

  function handleSubmit() {
    if (!isPresentInFav) {
      setToastMsg("Product is added to favourites!");
      dispatch(addToFavorites(product));
    } else {
      setToastMsg("Product is removed from favourites!");
      dispatch(removeFromFavorites(product.id));
    }
    showToast();
  }

  const isPresentInFav =
    favorites.filter((prod) => prod.id === product.id).length > 0;

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`).then((res) => {
      setProduct(res.data);
    });
  }, [id]);

  if (!product.id) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Product Not Found...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl w-full">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={product.image}
            alt={product.title}
            className="w-full md:w-1/2 object-cover rounded-lg"
          />
          <div className="flex-1 space-y-4 flex-col justify-center text-center mt-0 md:mt-15">
            <h1 className="text-2xl font-bold text-gray">{product.title}</h1>
            <p className="text-lg font-semibold text-green">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-sm text-gray-500">
              Category: {product.category}
            </p>
            <div>
              <button
                className={`${
                  !isPresentInFav
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-red-500 hover:bg-red-600"
                } text-white px-4 py-2 rounded cursor-pointer w-full`}
                onClick={handleSubmit}
              >
                {!isPresentInFav ? "Add to Favorites" : "Remove from favorites"}
              </button>
            </div>
          </div>
          <Toast message={toastMsg} show={toastVisible} onClose={hideToast} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
