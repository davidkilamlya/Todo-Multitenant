import React, { useState } from "react";
import "./SearchFilter.scss";

function SearchFilter({ searchField, handleSearchFilter }) {
  return (
    <div className="search-filter">
      <div className="search-filter-input-container">
        <span className="search-filte-label">Search:</span>
        <input
          type="search"
          name="search"
          value={searchField}
          className="search-filter-input"
          onChange={(e) => {
            handleSearchFilter(e);
          }}
          id=""
          placeholder="search Todo list"
        />
      </div>
    </div>
  );
}

export default SearchFilter;
