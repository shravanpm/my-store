import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import axios from "axios";
import productsReducer, {
  fetchProducts,
} from "../../Redux/Reducers/ProductsSlice";

vi.mock("axios");

describe("productsSlice reducer and async thunk", () => {
  const initialState = {
    items: [],
    status: "idle",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return the initial state by default", () => {
    const state = productsReducer(undefined, { type: "" });
    expect(state).toEqual(initialState);
  });

  it("should handle fetchProducts.pending", () => {
    const action = { type: fetchProducts.pending.type };
    const state = productsReducer(initialState, action);
    expect(state.status).toBe("loading");
  });

  it("should handle fetchProducts.fulfilled", () => {
    const products = [
      { id: 1, title: "Product 1" },
      { id: 2, title: "Product 2" },
    ];
    const action = { type: fetchProducts.fulfilled.type, payload: products };
    const state = productsReducer(initialState, action);
    expect(state.status).toBe("succeeded");
    expect(state.items).toEqual(products);
  });

  it("should handle fetchProducts.rejected", () => {
    const action = { type: fetchProducts.rejected.type };
    const state = productsReducer(initialState, action);
    expect(state.status).toBe("failed");
  });

  it("fetchProducts thunk success", async () => {
    const products = [{ id: 1, title: "Mock Product" }];
    axios.get.mockResolvedValue({ data: products });

    const dispatch = vi.fn();
    const thunk = fetchProducts();

    await thunk(dispatch, () => initialState, undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: fetchProducts.pending.type })
    );
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: fetchProducts.fulfilled.type,
        payload: products,
      })
    );
  });

  it("fetchProducts thunk failure", async () => {
    axios.get.mockRejectedValue(new Error("Network error"));

    const dispatch = vi.fn();
    const thunk = fetchProducts();

    await thunk(dispatch, () => initialState, undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: fetchProducts.pending.type })
    );
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: fetchProducts.rejected.type })
    );
  });
});
