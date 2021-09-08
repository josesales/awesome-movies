import React, { useCallback, useEffect, useState } from 'react'
import InternalError from '../components/InternalError';
import Loader from '../components/Loader';
import MovieItems from '../components/MovieItems';
import HTML_ENTITIES from '../util/htmlEntities';
import { get } from '../util/requestSender';

const Home = () => {

    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState([]);
    const [text, setText] = useState('');
    const [internalError, setInternalError] = useState(false);

    const searchMovies = useCallback((currentText) => {

        const search = async () => {

            try {
                let results = null;
                setLoading(true);
        
                if(currentText && currentText.trim()) {
        
                    const data = await get(`search/multi?page=1&include_adult=false&query=${currentText}`);
                    results = data.results.filter(movie => movie.media_type === 'movie' || movie.media_type === 'tv');
                }else {
                    const data = await get(`trending/all/week?page=1`);
                    results = data.results;
                }
                setMovies(results);
                setLoading(false)
            }catch(error) {
                setInternalError(true);
            }
        }

        search();
    }, [])

    useEffect(() => {
        searchMovies('');
    }, [searchMovies]);

    const onTextChange = useCallback(event => {

        const currentText = event.target.value;

        setText(currentText);
        searchMovies(currentText);
    }, [searchMovies]);


    return (
        <React.Fragment>
            {
                internalError ? <InternalError /> :

                <div className="home">
                    <input type="text" placeholder={HTML_ENTITIES.search} onChange={onTextChange} className="input" value={text}/>

                    {
                        loading ? <Loader /> : 
                            movies?.length > 0 ? <MovieItems movies={movies} /> :
                                <span className="section-span section-margin-2">Movie not found!</span>
                    }
                </div>
            }
        </React.Fragment>
    );
}

export default Home;