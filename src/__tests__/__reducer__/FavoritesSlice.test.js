import favoritesReducer, {
  addToFavorites,
  removeFromFavorites,
} from "../../Redux/Reducers/FavoritesSlice";

describe("favoritesSlice reducer", () => {
  const initialState = [];

  it("should return the initial state when passed an empty action", () => {
    const result = favoritesReducer(undefined, { type: "" });
    expect(result).toEqual([]);
  });

  it("should handle addToFavorites by adding a new item if it does not exist", () => {
    const newItem = { id: 1, name: "Product 1" };
    const action = addToFavorites(newItem);
    const result = favoritesReducer(initialState, action);
    expect(result).toEqual([newItem]);
  });

  it("should not add a duplicate item when addToFavorites is called with an existing item", () => {
    const existingItem = { id: 1, name: "Product 1" };
    const state = [existingItem];
    const action = addToFavorites(existingItem);
    const result = favoritesReducer(state, action);
    expect(result).toEqual(state);
  });

  it("should handle removeFromFavorites by removing the item with the given id", () => {
    const existingItem1 = { id: 1, name: "Product 1" };
    const existingItem2 = { id: 2, name: "Product 2" };
    const state = [existingItem1, existingItem2];
    const action = removeFromFavorites(1);
    const result = favoritesReducer(state, action);
    expect(result).toEqual([existingItem2]);
  });

  it("should do nothing when removeFromFavorites is called with an id not in state", () => {
    const existingItem = { id: 1, name: "Product 1" };
    const state = [existingItem];
    const action = removeFromFavorites(999);
    const result = favoritesReducer(state, action);
    expect(result).toEqual(state);
  });
});
