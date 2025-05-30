import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import * as redux from "react-redux";
import SearchBar from "../Components/SearchBar";
import { setSearch } from "../Redux/Reducers/FiltersSlice";

const mockDispatch = vi.fn();

vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");
  return {
    ...actual,
    useDispatch: () => mockDispatch,
  };
});

vi.mock("../Hooks/useDebounce", () => ({
  useDebounce: (val) => val,
}));

describe("SearchBar component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders input field with correct placeholder", () => {
    render(<SearchBar />);
    expect(
      screen.getByPlaceholderText("Search by title...")
    ).toBeInTheDocument();
  });

  it("updates value on user input", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText("Search by title...");
    fireEvent.change(input, { target: { value: "laptop" } });
    expect(input.value).toBe("laptop");
  });

  it("dispatches setSearch with debounced value", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText("Search by title...");
    fireEvent.change(input, { target: { value: "watch" } });

    expect(mockDispatch).toHaveBeenCalledWith(setSearch("watch"));
  });
});
