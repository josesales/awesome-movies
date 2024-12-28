import React, { useEffect, useState } from "react";
import { Movie } from "../types/movie";
import { useStateContext } from "../hooks/useStateContext";

type ListManagerProps = {
  movie: Movie;
  listName: string;
  text: string;
};

const ListsManager = ({ movie, listName, text }: ListManagerProps) => {
  const {
    watchList,
    watched,
    addMovieWatchList,
    addMovieWatched,
    removeMovieWatchList,
    removeMovieWatched,
  } = useStateContext();
  const [addedToList, setAddedToList] = useState(false);

  const onAddToListClick = () => {
    switch (listName) {
      case "watchList":
        addMovieWatchList(movie);
        break;

      case "watched":
        addMovieWatched(movie);
        break;

      default:
        break;
    }
  };

  const onRemoveFromListClick = () => {
    switch (listName) {
      case "watchList":
        removeMovieWatchList(movie.id);
        break;

      case "watched":
        removeMovieWatched(movie.id);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    switch (listName) {
      case "watchList":
        const watchListFilter = watchList.filter(
          (watchListMovie) => watchListMovie.id === movie.id
        );
        setAddedToList(watchListFilter?.length > 0);
        break;
      case "watched":
        const watchedFilter = watched.filter(
          (watchedMovie) => watchedMovie.id === movie.id
        );
        setAddedToList(watchedFilter?.length > 0);
        break;

      default:
        break;
    }
  }, [watchList, watched, listName, movie.id]);

  return (
    <React.Fragment>
      {!addedToList ? (
        <span className="lists-manager" onClick={onAddToListClick}>
          + {text}
        </span>
      ) : (
        <span className="lists-manager" onClick={onRemoveFromListClick}>
          - {text}
        </span>
      )}
    </React.Fragment>
  );
};
export default ListsManager;
