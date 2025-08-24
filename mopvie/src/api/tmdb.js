import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
console.log("TMDB API Key:", API_KEY);

const BASE_URL = "https://api.themoviedb.org/3";

// Fetch trending movies
export const fetchTrending = async () => {
  const response = await axios.get(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
  );
  return response.data.results;
};

// Fetch TV show details
export const fetchTrendingShows = async () => {
  const response = await axios.get(
    `${BASE_URL}/trending/tv/week?api_key=${API_KEY}`
  );
  return response.data.results;
};



// Search movies by query
export const searchMovies = async (query) => {
  const response = await axios.get(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );
  return response.data.results;
};

// Discover movies (with filters)
export const discoverMovies = async (filters = {}) => {
  const { genre, year, sort } = filters;
  const response = await axios.get(`${BASE_URL}/discover/movie`, {
    params: {
      api_key: API_KEY,
      with_genres: genre || "",
      primary_release_year: year || "",
      sort_by: sort || "popularity.desc",
    },
  });
  return response.data.results;
};

// Get single movie details
export const getMovieDetails = async (id) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits`
  );
  return response.data;
};

// Fetch genres
export const fetchGenres = async () => {
  const response = await axios.get(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
  );
  return response.data.genres;
};
