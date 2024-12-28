import MovieItems from "../components/MovieItems";
import { useStateContext } from "../hooks/useStateContext";

const Watched = () => {
  const { watched } = useStateContext();

  return (
    <div className="watch-list">
      <h1 className="section-title">Watched</h1>
      {watched && watched.length > 0 ? (
        <MovieItems movies={watched} />
      ) : (
        <span className="section-span section-margin-2">
          No movies added yet!
        </span>
      )}
    </div>
  );
};

export default Watched;
