import React, { createContext, useReducer, useEffect } from "react";
import reducer from "../reducer";

const initialState = {
    watchList: localStorage.getItem("watchList") ? JSON.parse(localStorage.getItem("watchList")) : [],
    watched: localStorage.getItem("watched") ? JSON.parse(localStorage.getItem("watched")) : [],
};

export const StateContext = createContext(initialState);

export const StateContextProvider = ({children}) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {

    //Whenever the state changes it saves the lists on localStorage
    localStorage.setItem("watchList", JSON.stringify(state.watchList));
    localStorage.setItem("watched", JSON.stringify(state.watched));
  }, [state]);

  const addMovieWatchList = (movie) => {
    dispatch({ type: "ADD_MOVIE_WATCH_LIST", payload: movie });
  };

  const removeMovieWatchList = (id) => {

    dispatch({ type: "REMOVE_MOVIE_WATCH_LIST", payload: id });
  };

  const addMovieWatched = (movie) => {
    dispatch({ type: "ADD_MOVIE_WATCHED", payload: movie });
  };

  const removeMovieWatched = (id) => {
    dispatch({ type: "REMOVE_MOVIE_WATCHED", payload: id });
  };

  const value = {
    watchList: state.watchList,
    watched: state.watched,
    addMovieWatchList,
    addMovieWatched,
    removeMovieWatchList,
    removeMovieWatched,
  }

  return (
    <StateContext.Provider value={value}>
      {children}
    </StateContext.Provider>
  );
};