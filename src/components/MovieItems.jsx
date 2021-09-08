import React from 'react';
import MovieItem from './MovieItem'

const MovieItems = ({movies}) => {

    const MoviesUi = movies.map(movie => <MovieItem key={movie.id} movie={movie}/>);

    return (
        <div className="movie-items section-margin-2">
            {MoviesUi}
        </div>
    );
}
export default MovieItems;