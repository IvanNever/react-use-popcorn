import { useEffect, useState } from "react";
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

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

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
    console.log(movie);
    setWatched([...watched, newMovie]);

    closeMovieDetails();
  }

  function handleDeleteMovie(id) {
    setWatched(watched.filter((item) => item.imdbID !== id));
  }

  useEffect(() => {
    async function fetchMovies() {
      try {
        setError("");
        setIsLoading(true);

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${query}`,
        );

        if (!res.ok) {
          throw new Error("Something went wrong with fetching movies!");
        }

        const data = await res.json();

        if (data.Response === "False") {
          throw new Error(data.Error);
        }

        setMovies(data.Search);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovies();
  }, [query]);

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
              onBackHandle={closeMovieDetails}
              onAddMovie={handleAddMovie}
              watched={watched}
              rating={
                watched.find((item) => item.imdbID === selectedId)?.userRating
              }
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
