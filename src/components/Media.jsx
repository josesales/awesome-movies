import React from 'react';

const Media = ({movie}) => (

    <React.Fragment>
        {
            movie.videoUrl ? 
                <div className="media">
                    <iframe title="Trailer" className="media__trailer" src={movie.videoUrl} frameBorder="0" allowFullScreen />
                </div> 
            
            : movie.poster_path ? <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="media__img" alt="Movie Poster" /> : ''
        }
    </React.Fragment>
)

export default Media;