import { Movie } from "../types/movie";
import MovieItem from "./MovieItem";

type MovieItemsProps = {
  movies: Movie[];
};

const MovieItems = ({ movies }: MovieItemsProps) => {
  const MoviesUi = movies.map((movie) => (
    <MovieItem key={movie.id} movie={movie} />
  ));

  return <div className="movie-items section-margin-2">{MoviesUi}</div>;
};
export default MovieItems;
