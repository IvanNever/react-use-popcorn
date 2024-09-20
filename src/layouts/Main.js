import WatchedBox from "../watched/WatchedBox";
import MoviesBox from "../movies/MoviesBox";

export default function Main({ movies }) {
  return (
    <main className="main">
      <MoviesBox movies={movies} />
      <WatchedBox />
    </main>
  );
}
