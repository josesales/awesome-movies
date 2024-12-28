import React, { createContext, useReducer, useEffect, ReactNode } from "react";
import reducer from "../reducer";
import { State, StateWithActions } from "../types/context";
import { Movie } from "../types/movie";

const initialState: State = {
  watchList: localStorage.getItem("watchList")
    ? JSON.parse(localStorage.getItem("watchList") as string)
    : [],
  watched: localStorage.getItem("watched")
    ? JSON.parse(localStorage.getItem("watched") as string)
    : [],
};

export const StateContext = createContext<StateWithActions | undefined>(
  undefined
);

interface StateContextProviderProps {
  children: ReactNode;
}

export const StateContextProvider = ({
  children,
}: StateContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addMovieWatchList = (movie: Movie) => {
    dispatch({ type: "ADD_MOVIE_WATCH_LIST", payload: movie });
  };

  const removeMovieWatchList = (id: number) => {
    dispatch({ type: "REMOVE_MOVIE_WATCH_LIST", payload: id });
  };

  const addMovieWatched = (movie: Movie) => {
    dispatch({ type: "ADD_MOVIE_WATCHED", payload: movie });
  };

  const removeMovieWatched = (id: number) => {
    dispatch({ type: "REMOVE_MOVIE_WATCHED", payload: id });
  };

  const value: StateWithActions = {
    watchList: state.watchList,
    watched: state.watched,
    addMovieWatchList,
    addMovieWatched,
    removeMovieWatchList,
    removeMovieWatched,
  };

  useEffect(() => {
    //Whenever the state changes it saves the lists on localStorage
    localStorage.setItem("watchList", JSON.stringify(state.watchList));
    localStorage.setItem("watched", JSON.stringify(state.watched));
  }, [state]);

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};
