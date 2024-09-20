import { useState } from "react";
import { Search } from "./Search";
import { Logo } from "./Logo";
import { Results } from "./Results";

export default function Navbar({ movies }) {
  const [query, setQuery] = useState("");
  return (
    <nav className="nav-bar">
      <Logo />
      <Search query={query} setQuery={setQuery} />
      <Results movies={movies} />
    </nav>
  );
}
