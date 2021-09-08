import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import PlaceholderImg from '../assets/img-placeholder.png'
import {StateContext} from '../context/StateContext'

const MovieItem = ({movie}) => {

    const {watchList, watched, addMovieWatchList, addMovieWatched, removeMovieWatchList, removeMovieWatched} = useContext(StateContext);
    const [addedToWatchList, setAddedToWatchList] = useState(false);
    const [addedToWatched, setAddedToWatched] = useState(false);

    const onAddWatchListClick = () => {
        addMovieWatchList(movie);
        setAddedToWatchList(true);
        setAddedToWatched(false);
    }
    
    const onAddWatchedClick = () => {
        addMovieWatched(movie);
        setAddedToWatched(true);
        setAddedToWatchList(false);
    }

    const onRemoveWatchListClick = () => {
        removeMovieWatchList(movie.id);
        setAddedToWatchList(false);
    }

    const onRemoveWatchedClick = () => {
        removeMovieWatched(movie.id);
        setAddedToWatched(false);
    }

    useEffect(() => {

        const watchListFilter = watchList.filter(watchListMovie => watchListMovie.id === movie.id);
        if(watchListFilter?.length > 0) {
            setAddedToWatchList(true);
        }

        const watchedFilter = watched.filter(watchedMovie => watchedMovie.id === movie.id);
        if(watchedFilter?.length > 0) {
            setAddedToWatched(true);
        }
    }, [movie.id, watchList, watched]);

    return (
        <div className="movie-item">

            {
                movie.poster_path && movie.poster_path.trim() ? 
                    <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} className="movie-item__img" alt="Movie Poster" />
                :
                <div className="placeholder-container">
                    <span className="placeholder-container__span">{movie.title}</span>
                    <img src={PlaceholderImg} className="movie-item__img-placeholder" alt="Movie Poster Placeholder" />
                    <span className="placeholder-container__span">Poster not Available</span>
                </div>
            }

            <div className="movie-item__options">

                <div className="movie-item__list">
                    
                    <Link className="movie-item__details" to={{pathname: '/movieDetails', state: {movie}}}>Details</Link>
                    {
                        !addedToWatchList ? 
                            <span className="movie-item__span" onClick={onAddWatchListClick}>+ Watch List</span>
                            : <span className="movie-item__span" onClick={onRemoveWatchListClick}>- Watch List</span>
                    }

                    {
                        !addedToWatched ? 
                        <span className="movie-item__span" onClick={onAddWatchedClick}>+ Watched</span>
                            : <span className="movie-item__span" onClick={onRemoveWatchedClick}>- Watched</span>
                    }

                </div>
            </div>
        </div>
    );
}
export default MovieItem;