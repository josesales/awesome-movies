import React, { useCallback, useEffect, useState } from "react";
import InternalError from "../components/InternalError";
import Loader from "../components/Loader";
import MovieItems from "../components/MovieItems";
import HTML_ENTITIES from "../util/htmlEntities";
import { get } from "../util/requestSender";
import { useDebounce } from "../hooks/useDebounce";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [movies, setMovies] = useState([]);
  const [text, setText] = useState("");
  const [internalError, setInternalError] = useState(false);
  const debounce = useDebounce(1000);

  const search = useCallback(async (currentText) => {
    try {
      let results = null;
      setLoading(true);

      if (currentText && currentText.trim()) {
        const data = await get(
          `search/movie?page=1&include_adult=false&query=${currentText}`
        );
        results = data.results;
      } else {
        const data = await get(`trending/movie/week?page=1`);
        results = data.results;
      }
      setMovies(results);
      setLoading(false);
    } catch (error) {
      setInternalError(true);
    }
  }, []);

  const searchMovie = debounce((currentText) => {
    search(currentText);
  });

  useEffect(() => {
    search("");
    setMounted(true);
  }, [search]);

  const onTextChange = useCallback(
    (event) => {
      const currentText = event.target.value;

      setText(currentText);

      searchMovie(currentText);
    },
    [searchMovie]
  );

  return (
    <React.Fragment>
      {internalError ? (
        <InternalError />
      ) : (
        <div className="home">
          <input
            type="text"
            placeholder={HTML_ENTITIES.search}
            onChange={onTextChange}
            className="input"
            value={text}
          />

          {loading ? (
            <Loader />
          ) : movies?.length > 0 ? (
            <MovieItems movies={movies} />
          ) : (
            mounted && (
              <span className="section-span section-margin-2">
                Movie not found!
              </span>
            )
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default Home;
