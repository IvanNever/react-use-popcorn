import MovieList from "./MovieList";
import ListBox from "../layouts/ListBox";
import { useState } from "react";

export default function MoviesBox({ movies }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <ListBox isOpen={isOpen} setIsOpen={setIsOpen}>
      <MovieList movies={movies}></MovieList>
    </ListBox>
  );
}
