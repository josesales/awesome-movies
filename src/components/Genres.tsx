import React from "react";
import { Genre } from "../types/genre";

type GenresProps = {
  genres: Genre[];
};

const Genres = ({ genres }: GenresProps) => {
  const GenresUi = genres.map((genre) => (
    <li className="genres__li" key={genre.id}>
      {genre.name}
    </li>
  ));

  return (
    <div className="genres">
      <ul className="genres__ul">{GenresUi}</ul>
    </div>
  );
};

export default Genres;
