import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./Reducers/ProductsSlice";
import favoritesReducer from "./Reducers/FavoritesSlice";
import filtersReducer from "./Reducers/FiltersSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    favorites: favoritesReducer,
    filters: filtersReducer,
  },
});
