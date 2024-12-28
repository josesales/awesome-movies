import { Genre } from "./genre";

export interface Result {
  key: string;
  official: boolean;
  site: string;
  type: string;
}

export interface Video {
  results: Result[];
}

export interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  genres: Genre[];
  videos: Video[];
  year: string;
  videoUrl: string;
  poster_path: string;
}
