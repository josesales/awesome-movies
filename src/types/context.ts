import { Movie } from "./movie";

export interface State {
  watchList: Movie[];
  watched: Movie[];
}

export interface Action<T> {
  type: string;
  payload: T;
}

export interface StateWithActions extends State {
  addMovieWatchList: (movie: Movie) => void;
  addMovieWatched: (movie: Movie) => void;
  removeMovieWatchList: (id: number) => void;
  removeMovieWatched: (id: number) => void;
}
