import { render, screen, fireEvent } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ProductCard } from "../Components/ProductCard";
import favoritesReducer, {
  addToFavorites,
  removeFromFavorites,
} from "../Redux/Reducers/favoritesSlice";

const product = {
  id: 1,
  title: "Test Product",
  price: 10,
  image: "test.jpg",
};

const renderWithMockStore = (preloadedState = [], cardType = "home") => {
  const store = configureStore({
    reducer: {
      favorites: favoritesReducer,
    },
    preloadedState: {
      favorites: preloadedState,
    },
  });

  render(
    <Provider store={store}>
      <BrowserRouter>
        <ProductCard product={product} cardType={cardType} />
      </BrowserRouter>
    </Provider>
  );

  return store;
};

describe("ProductCard with mock store", () => {
  it("shows 'Add to Favorites' when product is not in favorites", () => {
    renderWithMockStore([]);

    expect(screen.getByRole("button")).toHaveTextContent(/add to favorites/i);
  });

  it("shows 'Remove from favorites' when product is in favorites", () => {
    renderWithMockStore([product]);

    expect(screen.getByRole("button")).toHaveTextContent(
      /remove from favorites/i
    );
  });

  it("dispatches addToFavorites on click", () => {
    const store = renderWithMockStore([]);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    const actions = store.getState().favorites;
    expect(actions.length).toBe(1);
    expect(actions[0].id).toBe(product.id);
  });

  it("dispatches removeFromFavorites on click", () => {
    const store = renderWithMockStore([product]);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    const actions = store.getState().favorites;
    expect(actions.length).toBe(0);
  });
});
