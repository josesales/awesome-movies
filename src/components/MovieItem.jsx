import React from 'react'
import { Link } from 'react-router-dom';
import PlaceholderImg from '../assets/img-placeholder.png'
import ListsManager from './ListsManager';

const MovieItem = ({movie}) => (

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
                <ListsManager movie={movie} listName="watchList" text="Watch List"/>
                <ListsManager movie={movie} listName="watched" text="Watched"/>
            </div>
        </div>
    </div>
);

export default MovieItem;