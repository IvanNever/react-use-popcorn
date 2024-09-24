import MovieItem from "./MovieItem";

export default function MovieList({ movies, onChangeSelectedId }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <MovieItem
          movie={movie}
          key={movie.imdbID}
          onChangeSelectedId={onChangeSelectedId}
        />
      ))}
    </ul>
  );
}
