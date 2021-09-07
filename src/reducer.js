  const reducer = (state, action) => {

    switch (action.type) {

      case "ADD_MOVIE_WATCH_LIST":
        
        return {
          ...state,
          watchList: [action.payload].concat(state.watchList),
        };

      case "ADD_MOVIE_WATCHED":
          
        return {
          ...state,
          watchList: state.watchList.filter(movie => movie.id !== action.payload.id),
          watched: [action.payload].concat(state.watched),
        };

      case "REMOVE_MOVIE_WATCH_LIST":
        
        return {
          ...state,
          watchList: state.watchList.filter(movie => movie.id !== action.payload),
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