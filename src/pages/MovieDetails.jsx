import React, { useEffect, useState, useCallback} from 'react'
import { useHistory } from 'react-router';
import Genres from '../components/Genres';
import InternalError from '../components/InternalError';
import ListsManager from '../components/ListsManager';
import Loader from '../components/Loader';
import Media from '../components/Media';
import { get } from '../util/requestSender';

const MovieDetails = (props) => {

    const history = useHistory();
    const basicMovie = props?.location?.state?.movie;

    if(!basicMovie || !basicMovie.id) {
        history.push('/');
    }

    const [loading, setLoading] = useState(false);
    const [internalError, setInternalError] = useState(false);
    const [movie, setMovie] = useState({...basicMovie, videoUrl: '', genres: [], year: ''});

    const getVideoUrl = useCallback(videos =>  {
        let videoUrl = '';
            
        if(videos?.length > 0 ) {

            //Doing a reverse loop since the api usually keeps the official trailers at the end of the array 
            for (let index = videos.length - 1; index > 0; index--) {

                if(videos[index].official === true && videos[index].key && videos[index].site?.toLowerCase() === 'youtube'
                    && (videos[index].type?.toLowerCase() === 'trailer' || videos[index].type?.toLowerCase() === 'teaser')) {

                    videoUrl = 'https://www.youtube.com/embed/' + videos[index].key;
                    break;
                }
            }
        }

        return videoUrl;
    }, []);

    useEffect(() => {
        
        const getMovieDetails = async () => {
            try {
                setLoading(true);
                const data = await get(`movie/${basicMovie.id}?append_to_response=videos`);
                const videoUrl = getVideoUrl(data.videos.results);
                console.log(data);
                let year = '';
                if(data.release_date && data.release_date.includes('-')) {
                    const splitDate = data.release_date.split('-');
                    year = splitDate[0];
                }
                setMovie(movie => {
                    return {
                        ...movie, 
                        videoUrl, 
                        genres: data.genres,
                        year
                    }
                });

                setLoading(false);
            }catch(error) {
                setInternalError(true);
            }
        }

        getMovieDetails();
    }, [basicMovie.id, getVideoUrl]);

    return (
        <React.Fragment>

            {
                internalError ? <InternalError /> :
                
                <div className="details">
                    {
                        loading  ? <Loader /> :
                        
                        <React.Fragment>

                            <h1 className="section-title">{movie.year ? `${movie.title} (${movie.year})` : movie.year}</h1>
                            
                            {
                                movie.genres?.length > 0 ? <Genres genres={movie.genres}/> : ''
                            }
                            
                            <div className="details__content section-margin-2">

                                <span className="details__overview">{movie.overview}</span>

                                <Media movie={movie}/>

                                <div className="details__list section-margin-2">
                                    <ListsManager movie={movie} listName="watchList" text="Watch List"/>
                                    <ListsManager movie={movie} listName="watched" text="Watched"/>
                                </div>
                            </div>

                        </React.Fragment>
                    }
                </div>
            }            
        </React.Fragment>
    );
}

export default MovieDetails;