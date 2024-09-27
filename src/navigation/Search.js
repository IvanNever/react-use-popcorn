import { useEffect, useRef, useState } from "react";

export default function Search({ query, onChangeQuery }) {
  const inputRef = useRef(null);
  useEffect(() => {
    const callback = (e) => {
      if (document.activeElement === inputRef.current) return;

      if (e.code === "Enter") {
        inputRef.current.focus();
        onChangeQuery("");
      }
    };
    document.addEventListener("keydown", callback);
    return () => document.removeEventListener("keydown", callback);
  }, [onChangeQuery]);
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      ref={inputRef}
      onChange={(e) => onChangeQuery(e.target.value)}
    />
  );
}
