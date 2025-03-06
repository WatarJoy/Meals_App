import React, { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";

interface SearchBarProps {
  onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input, 500);

  useEffect(() => {
    onSearch(debouncedInput);
  }, [debouncedInput, onSearch]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for recepies"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
