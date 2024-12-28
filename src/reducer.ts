import { Action, State } from "./types/context";
import { Movie } from "./types/movie";

const reducer = <T>(state: State, action: Action<T>) => {
  switch (action.type) {
    case "ADD_MOVIE_WATCH_LIST":
      return {
        ...state,
        watched: state.watched.filter(
          (movie) => movie.id !== (action.payload as Movie).id
        ),
        watchList: [action.payload as Movie].concat(state.watchList),
      };

    case "ADD_MOVIE_WATCHED":
      return {
        ...state,
        watchList: state.watchList.filter(
          (movie) => movie.id !== (action.payload as Movie).id
        ),
        watched: [action.payload as Movie].concat(state.watched),
      };

    case "REMOVE_MOVIE_WATCH_LIST":
      return {
        ...state,
        watchList: state.watchList.filter(
          (movie) => movie.id !== action.payload
        ),
      };

    case "REMOVE_MOVIE_WATCHED":
      return {
        ...state,
        watched: state.watched.filter((movie) => movie.id !== action.payload),
      };

    default:
      return state;
  }
};

export default reducer;
