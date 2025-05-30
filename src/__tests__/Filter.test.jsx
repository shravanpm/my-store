import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { Filters } from "../Components/Filters";
import { vi } from "vitest";
import axios from "axios";
import * as redux from "react-redux";
import { setCategory, setSort } from "../Redux/Reducers/FiltersSlice";

vi.mock("axios");

const mockDispatch = vi.fn();

vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");
  return {
    ...actual,
    useDispatch: () => mockDispatch,
  };
});

describe("Filters component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches and displays categories", async () => {
    const fakeCategories = ["electronics", "clothing"];
    axios.get.mockResolvedValueOnce({ data: fakeCategories });

    render(<Filters />);

    await waitFor(() => {
      expect(screen.getByText("Electronics")).toBeInTheDocument();
      expect(screen.getByText("Clothing")).toBeInTheDocument();
    });

    expect(axios.get).toHaveBeenCalledWith(
      "https://fakestoreapi.com/products/categories"
    );
  });

  it("dispatches setCategory on category change", async () => {
    axios.get.mockResolvedValueOnce({ data: ["electronics"] });
    render(<Filters />);

    await waitFor(() => {
      expect(screen.getByText("Electronics")).toBeInTheDocument();
    });

    const categorySelect = screen.getByDisplayValue("All Categories");
    fireEvent.change(categorySelect, { target: { value: "electronics" } });

    expect(mockDispatch).toHaveBeenCalledWith(setCategory("electronics"));
  });

  it("dispatches setSort on sort change", () => {
    axios.get.mockResolvedValueOnce({ data: [] });
    render(<Filters />);

    const sortSelect = screen.getByDisplayValue("Default Sort");
    fireEvent.change(sortSelect, { target: { value: "low" } });

    expect(mockDispatch).toHaveBeenCalledWith(setSort("low"));
  });
});
