import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
if (!API_KEY) console.warn('VITE_TMDB_API_KEY is not set. Add it to your .env file.');

const BASE = 'https://api.themoviedb.org/3';
const tmdb = axios.create({ baseURL: BASE, params: { api_key: API_KEY } });

export async function fetchTrending(page = 1) {
  const res = await tmdb.get('/trending/movie/week', { params: { page } });
  return res.data;
}

export async function fetchPopular(page = 1) {
  const res = await tmdb.get('/movie/popular', { params: { page } });
  return res.data;
}

export async function searchMovies(query, page = 1) {
  const res = await tmdb.get('/search/movie', { params: { query, page } });
  return res.data;
}

export async function getMovieDetails(id) {
  const res = await tmdb.get(`/movie/${id}`, { params: { append_to_response: 'credits,videos,similar' } });
  return res.data;
}

export async function fetchGenres() {
  const res = await tmdb.get('/genre/movie/list');
  return res.data.genres;
}

export async function discoverMovies({ page = 1, with_genres, year, sort_by }) {
  const params = { page };
  if (with_genres) params.with_genres = with_genres;
  if (year) params.primary_release_year = year;
  if (sort_by) params.sort_by = sort_by;
  const res = await tmdb.get('/discover/movie', { params });
  return res.data;
}
