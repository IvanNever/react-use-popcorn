import { useState } from "react";

export default function Search({ query, onChangeQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onChangeQuery(e.target.value)}
    />
  );
}
