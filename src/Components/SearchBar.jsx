import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useDebounce } from "../Hooks/useDebounce";
import { setSearch } from "../Redux/Reducers/FiltersSlice";

function SearchBar() {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const debounced = useDebounce(value, 500);

  React.useEffect(() => {
    dispatch(setSearch(debounced));
  }, [debounced, dispatch]);

  return (
    <input
      type="text"
      placeholder="Search by title..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="border border-gray-300 px-4 py-2 mb-4 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-700"
    />
  );
}

export default SearchBar;
