import { useEffect, useState } from "react";
import Loader from "../common/Loader";
import ErrorMessage from "../common/ErrorMessage";
import StarRating from "../common/StarRating";
import { useKey } from "../common/useKey";

export default function MovieDetails({
  selectedId,
  watched,
  rating,
  onBackHandle,
  onAddMovie,
  onCloseMovieDetails,
}) {
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState("");

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${selectedId}`,
        );

        if (!res.ok) {
          throw new Error("Something went wrong with fetching movie details!");
        }

        const data = await res.json();

        if (data.Response === "False") {
          throw new Error(data.Error);
        }

        setMovieDetails(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!movieDetails.Title) return;
    document.title = `Movie | ${movieDetails.Title}`;

    return function () {
      document.title = "usePopcorn";
    };
  }, [movieDetails]);

  useKey("Escape", onCloseMovieDetails);

  return (
    <div className="details">
      {isLoading ? <Loader /> : null}
      {!isLoading && !error && (
        <>
          <header>
            <button className="btn-back" onClick={onBackHandle}>
              &larr;
            </button>
            <img src={movieDetails.Poster} alt={movieDetails.Title} />
            <div className="details-overview">
              <h2>{movieDetails.Title}</h2>
              <p>
                {movieDetails.Released} &bull; {movieDetails.Runtime}
              </p>
              <p>{movieDetails.Genre}</p>
              <p>
                <span>⭐</span>
                {movieDetails.imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {watched.find((item) => item.imdbID === selectedId) ? (
                <p>
                  You rated this movie with {rating}
                  <span>⭐</span>
                </p>
              ) : (
                <>
                  <StarRating
                    size="24"
                    maxRating={10}
                    onSetRating={setUserRating}
                  />
                  {userRating && (
                    <button
                      className="btn-add"
                      onClick={() =>
                        onAddMovie({ ...movieDetails, userRating })
                      }
                    >
                      + Add to list
                    </button>
                  )}
                </>
              )}
            </div>
            <p>
              <em>{movieDetails.Plot}</em>
            </p>
            <p>Starring {movieDetails.Actors}</p>
            <p>Directed by {movieDetails.Director}</p>
          </section>
        </>
      )}
      {error ? <ErrorMessage message={error} /> : null}
    </div>
  );
}
