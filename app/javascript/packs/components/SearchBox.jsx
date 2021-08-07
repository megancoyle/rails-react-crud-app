import React from "react";

const SearchBox = ({ searchHandler }) => {
  const handleSearchInputChange = (e) => {
    searchHandler(e.target.value);
  };

  return (
    <form className="search form-group">
      <input
        onChange={handleSearchInputChange}
        type="text"
        placeholder="Search Records..."
      />
    </form>
  );
};

export default SearchBox;