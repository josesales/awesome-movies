import React, { useEffect, useState } from 'react';
import { get } from '../util/requestSender';
import Loader from './Loader'
import MovieItem from './MovieItem'

const MovieItems = () => {

    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);

    const MoviesUi = movies.map(movie => <MovieItem key={movie.id} movie={movie}/>);

    useEffect(() => {

        const getMovies = async () => {

            setLoading(true)
            const { results } = await get(`trending/all/week?page=${page}`);
            setMovies(results);
            setLoading(false)
        }
        getMovies();
    }, []);
    
    return (
        <div className="movie-items">
            {
                loading ? <Loader /> : 
                MoviesUi
            }
        </div>
    );
}
export default MovieItems;