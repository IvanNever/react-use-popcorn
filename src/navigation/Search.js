import { useRef } from "react";
import { useKey } from "../common/useKey";

export default function Search({ query, onChangeQuery }) {
  const inputRef = useRef(null);
  useKey("Enter", () => {
    if (document.activeElement === inputRef.current) return;
    inputRef.current.focus();
    onChangeQuery("");
  });
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
