import React, { useContext } from 'react'
import MovieItems from '../components/MovieItems';
import { StateContext } from '../context/StateContext'

const Watched = () => {

    const { watched } = useContext(StateContext);

    return (
        <div className="watch-list">
            <h1 className="section-title">Watched</h1>
            {
                watched && watched.length > 0 ? <MovieItems movies={watched} /> 
                    : <span className="section-span section-margin-2">No movies added yet!</span>
            }
        </div>
    );
}

export default Watched;