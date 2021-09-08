import React, { useContext } from 'react'
import MovieItems from '../components/MovieItems';
import { StateContext } from '../context/StateContext'

const WatchList = () => {

    const { watchList } = useContext(StateContext);

    return (
        <div className="watch-list">
            <h1 className="section-title">Watch List</h1>
            {
                watchList && watchList.length > 0 ? <MovieItems movies={watchList} /> 
                    : <span className="section-span section-margin-2">No movies added yet!</span>
            }
        </div>
    );
}

export default WatchList;