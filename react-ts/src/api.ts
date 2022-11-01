const API_KEY = "a336f0fcafc99aded070334fac5a959c";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  backdrop_path:string;
  poster_path:string;
  title: string;
  overview:string;
  id: number;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum:string;
  },
  page: number;
  results : IMovie[]
  total_pages: number;
  total_results: number;
}

export function getMovies(){
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
};