import React from 'react'
import MovieItems from '../components/MovieItems';
import HTML_ENTITIES from '../util/htmlEntities';

const Home = () => {

    return (
        <div className="home">
            <input type="text" placeholder={HTML_ENTITIES.search} className="input" />

            <MovieItems />
        </div>
    );
}

export default Home;