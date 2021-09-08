import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import InternalError from '../components/InternalError';
import Loader from '../components/Loader';
import { get } from '../util/requestSender';

const MovieDetails = (props) => {

    const history = useHistory();
    const movie = props?.location?.state?.movie;

    if(!movie || !movie.id) {
        history.push('/');
    }

    const [loading, setLoading] = useState(false);
    const [internalError, setInternalError] = useState(false);
    //youtube id: "key":"KlyknsTJk0w"

    useEffect(() => {
        
        const getMovieDetails = async () => {
            try {
                setLoading(true);
                const data = await get(`${movie.media_type}/${movie.id}?append_to_response=videos`);
                // data: object
                // videos: data.videos[]
                //Youtube link: video[index].key 
                //to show the original trailer: data.video[index].official
                console.log(data);
                setLoading(false);
            }catch(error) {
                setInternalError(true);
            }
        }

        getMovieDetails();
    }, [movie.id, movie.media_type]);

    return (
        <React.Fragment>

            {
                internalError ? <InternalError /> :
                
                <div className="details">
                    {
                        loading ? <Loader /> :
                        
                        <React.Fragment>
                            <h1>Movie Details Page</h1>
                        </React.Fragment>
                    }
                </div>
            }            
        </React.Fragment>
    );
}

export default MovieDetails;