import React from 'react';

const MovieItem = ({movie}) => {
    // https://image.tmdb.org/t/p/w200/iXbWpCkIauBMStSTUT9v4GXvdgH.jpg
    return (
        <div className="movie-item">
            <h1>{movie.title}</h1>
            <h1>{movie.poster_path}</h1>
        </div>
    );
}
export default MovieItem;