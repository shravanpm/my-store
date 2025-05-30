import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import * as redux from "react-redux";
import axios from "axios";
import ProductDetailsPage from "../Pages/ProductDetailsPage";
import {
  addToFavorites,
  removeFromFavorites,
} from "../Redux/Reducers/FavoritesSlice";
import { useParams } from "react-router-dom";

vi.mock("axios");

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: vi.fn(),
  };
});

vi.mock("../Components/Toast", () => ({
  Toast: ({ message, show }) => (show ? <div>{message}</div> : null),
}));

vi.mock("react-redux", () => {
  return {
    useSelector: vi.fn(),
    useDispatch: vi.fn(),
  };
});

describe("ProductDetailsPage Component", () => {
  const useParamsMock = useParams;
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    redux.useSelector.mockImplementation((selector) =>
      selector({ favorites: [] })
    );
    redux.useDispatch.mockReturnValue(mockDispatch);

    useParamsMock.mockReturnValue({ id: "1" });
  });

  it("renders fallback when no product id", async () => {
    axios.get.mockResolvedValueOnce({ data: {} });
    render(<ProductDetailsPage />);

    await waitFor(() => {
      expect(screen.getByText(/Product Not Found/i)).toBeInTheDocument();
    });
  });

  it("renders product details after fetch", async () => {
    const mockProduct = {
      id: 1,
      title: "Mock Product",
      price: 49.99,
      image: "image.jpg",
      description: "A great product",
      category: "electronics",
    };
    axios.get.mockResolvedValueOnce({ data: mockProduct });

    render(<ProductDetailsPage />);

    await waitFor(() => {
      expect(screen.getByText("Mock Product")).toBeInTheDocument();
      expect(screen.getByText("$49.99")).toBeInTheDocument();
      expect(screen.getByText("A great product")).toBeInTheDocument();
      expect(screen.getByText(/Category: electronics/i)).toBeInTheDocument();
    });
  });

  it("dispatches addToFavorites when product is not in favorites", async () => {
    const mockProduct = {
      id: 1,
      title: "Mock Product",
      price: 49.99,
      image: "image.jpg",
      description: "A great product",
      category: "electronics",
    };
    axios.get.mockResolvedValueOnce({ data: mockProduct });

    render(<ProductDetailsPage />);

    await waitFor(() => screen.getByText("Add to Favorites"));

    fireEvent.click(screen.getByText("Add to Favorites"));

    expect(mockDispatch).toHaveBeenCalledWith(addToFavorites(mockProduct));
    await waitFor(() => {
      expect(
        screen.getByText(/Product is added to favourites/i)
      ).toBeInTheDocument();
    });
  });

  it("dispatches removeFromFavorites when product is already in favorites", async () => {
    const mockProduct = {
      id: 2,
      title: "Test Product",
      price: 99.99,
      image: "test.jpg",
      description: "Description",
      category: "books",
    };

    useParamsMock.mockReturnValue({ id: "2" });
    axios.get.mockResolvedValueOnce({ data: mockProduct });

    redux.useSelector.mockImplementation((selector) =>
      selector({ favorites: [mockProduct] })
    );

    render(<ProductDetailsPage />);

    await waitFor(() => screen.getByText("Remove from favorites"));

    fireEvent.click(screen.getByText("Remove from favorites"));

    expect(mockDispatch).toHaveBeenCalledWith(
      removeFromFavorites(mockProduct.id)
    );
    await waitFor(() => {
      expect(
        screen.getByText(/Product is removed from favourites/i)
      ).toBeInTheDocument();
    });
  });
});
