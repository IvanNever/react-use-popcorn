import { useState } from "react";
import Navbar from "./navigation/Navbar";
import Main from "./layouts/Main";
import Search from "./navigation/Search";
import Results from "./navigation/Results";
import MovieList from "./movies/MovieList";
import WatchedSummary from "./watched/WatchedSummary";
import WatchedList from "./watched/WatchedList";
import ListBox from "./layouts/ListBox";
import Loader from "./common/Loader";
import ErrorMessage from "./common/ErrorMessage";
import MovieDetails from "./movies/MovieDetails";
import { useMovies } from "./movies/useMovies";
import { useLocalStorageState } from "./common/useLocalStorageState";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useLocalStorageState([], "watched");
  const { movies, isLoading, error } = useMovies(query);

  function handleSelectedId(id) {
    setSelectedId(selectedId === id ? null : id);
  }

  function closeMovieDetails() {
    setSelectedId(null);
  }

  function handleAddMovie(movie) {
    const newMovie = {
      ...movie,
      imdbRating: Number(movie.imdbRating) || 0,
      runtime: Number(movie.Runtime.split(" ")[0]),
    };

    setWatched([...watched, newMovie]);

    closeMovieDetails();
  }

  function handleDeleteMovie(id) {
    setWatched(watched.filter((item) => item.imdbID !== id));
  }

  return (
    <>
      <Navbar>
        <Search query={query} onChangeQuery={setQuery} />
        <Results movies={movies} />
      </Navbar>
      <Main>
        <ListBox>
          {isLoading ? <Loader /> : null}
          {!isLoading && !error && (
            <MovieList movies={movies} onChangeSelectedId={handleSelectedId} />
          )}
          {error ? <ErrorMessage message={error} /> : null}
        </ListBox>
        <ListBox>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              watched={watched}
              rating={
                watched.find((item) => item.imdbID === selectedId)?.userRating
              }
              onBackHandle={closeMovieDetails}
              onAddMovie={handleAddMovie}
              onCloseMovieDetails={closeMovieDetails}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList
                watched={watched}
                onDeleteMovie={handleDeleteMovie}
              />
            </>
          )}
        </ListBox>
      </Main>
    </>
  );
}
