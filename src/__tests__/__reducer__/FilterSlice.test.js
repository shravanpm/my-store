import { describe, it, expect } from "vitest";
import filtersReducer, {
  setSearch,
  setCategory,
  setSort,
} from "../../Redux/Reducers/FiltersSlice";

describe("filtersSlice reducer", () => {
  const initialState = {
    search: "",
    category: "all",
    sort: "default",
  };

  it("should return the initial state when passed an empty action", () => {
    const state = filtersReducer(undefined, { type: "" });
    expect(state).toEqual(initialState);
  });

  it("should handle setSearch", () => {
    const action = setSearch("laptop");
    const state = filtersReducer(initialState, action);
    expect(state.search).toBe("laptop");
    expect(state.category).toBe("all"); // unchanged
    expect(state.sort).toBe("default"); // unchanged
  });

  it("should handle setCategory", () => {
    const action = setCategory("electronics");
    const state = filtersReducer(initialState, action);
    expect(state.category).toBe("electronics");
    expect(state.search).toBe("");
    expect(state.sort).toBe("default");
  });

  it("should handle setSort", () => {
    const action = setSort("price_asc");
    const state = filtersReducer(initialState, action);
    expect(state.sort).toBe("price_asc");
    expect(state.search).toBe("");
    expect(state.category).toBe("all");
  });
});
