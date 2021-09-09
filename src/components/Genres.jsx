import React from 'react';

const Genres = ({genres}) => {

    const GenresUi = genres.map(genre => <li className="genres__li" key={genre.id}>{genre.name}</li>);

    return (
        <div className="genres">
            <ul className="genres__ul">
                {GenresUi}
            </ul>
        </div>
    );
}

export default Genres;