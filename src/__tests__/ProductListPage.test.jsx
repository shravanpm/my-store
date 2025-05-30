import React from "react";
import { render, screen } from "@testing-library/react";
import { ProductListPage } from "../Pages/ProductListPage";
import { vi } from "vitest";
import * as redux from "react-redux";
import { fetchProducts } from "../Redux/Reducers/ProductsSlice";

const mockDispatch = vi.fn();

const mockUseSelector = vi.fn();

vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");
  return {
    ...actual,
    useDispatch: () => mockDispatch,
    useSelector: (selector) => mockUseSelector(selector),
  };
});

vi.mock("../Redux/Reducers/ProductsSlice", () => ({
  fetchProducts: vi.fn(() => ({ type: "fetchProducts" })),
}));

vi.mock("../Components/SearchBar", () => ({
  default: () => <div>SearchBar</div>,
}));

vi.mock("../Components/Filters", () => ({
  Filters: () => <div>Filters</div>,
}));

vi.mock("../Components/ProductCard", () => ({
  ProductCard: ({ product }) => (
    <div>
      ProductCard - {product.title} - ${product.price}
    </div>
  ),
}));

const mockProducts = [
  { id: 1, title: "Alpha", category: "electronics", price: 100 },
  { id: 2, title: "Beta", category: "clothing", price: 50 },
  { id: 3, title: "Gamma", category: "electronics", price: 150 },
];

describe("ProductListPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("dispatches fetchProducts on mount when status is idle", () => {
    mockUseSelector.mockImplementation((selector) =>
      selector({
        products: { items: [], status: "idle" },
        filters: { search: "", category: "all", sort: "default" },
      })
    );

    render(<ProductListPage />);
    expect(mockDispatch).toHaveBeenCalledWith(fetchProducts());
  });

  it("renders loading state", () => {
    mockUseSelector.mockImplementation((selector) =>
      selector({
        products: { items: [], status: "loading" },
        filters: { search: "", category: "all", sort: "default" },
      })
    );

    render(<ProductListPage />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders filtered and sorted product cards", () => {
    mockUseSelector.mockImplementation((selector) =>
      selector({
        products: { items: mockProducts, status: "succeeded" },
        filters: { search: "", category: "electronics", sort: "low" },
        favorites: [],
      })
    );

    render(<ProductListPage />);
    expect(screen.getByText(/Alpha/)).toBeInTheDocument();
    expect(screen.getByText(/Gamma/)).toBeInTheDocument();
    expect(screen.queryByText(/Beta/)).not.toBeInTheDocument();

    const productsRendered = screen.getAllByText(/ProductCard/);
    expect(productsRendered[0].textContent).toContain("Alpha");
    expect(productsRendered[1].textContent).toContain("Gamma");
  });

  it("renders SearchBar and Filters components", () => {
    mockUseSelector.mockImplementation((selector) =>
      selector({
        products: { items: [], status: "succeeded" },
        filters: { search: "", category: "all", sort: "default" },
      })
    );

    render(<ProductListPage />);
    expect(screen.getByText("SearchBar")).toBeInTheDocument();
    expect(screen.getByText("Filters")).toBeInTheDocument();
  });
});
