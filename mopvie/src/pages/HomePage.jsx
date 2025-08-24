"use client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // React Router Link
import {
  fetchTrending,
  searchMovies,
  discoverMovies,
  fetchGenres,
} from "../api/tmdb.js";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    genre: "",
    year: "",
    sort: "popularity.desc",
  });

  useEffect(() => {
    const loadTrending = async () => {
      try {
        const trending = await fetchTrending();
        setMovies(trending);
      } catch (err) {
        console.error("Error fetching trending movies:", err);
      }
    };

    const loadGenres = async () => {
      try {
        const genreList = await fetchGenres();
        setGenres(genreList);
      } catch (err) {
        console.error("Error fetching genres:", err);
      }
    };

    loadTrending();
    loadGenres();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    try {
      const results = await searchMovies(query);
      setMovies(results);
    } catch (err) {
      console.error("Error searching movies:", err);
    }
  };

  const handleFilter = async () => {
    try {
      const results = await discoverMovies(filters);
      setMovies(results);
    } catch (err) {
      console.error("Error discovering movies:", err);
    }
  };

  return (
    <main className="p-6 bg-white min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">🎬 Movie Explorer</h1>

      {/* Search */}
      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-2 rounded-lg bg-gray-800 text-white outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={filters.genre}
          onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
          className="p-2 rounded-lg bg-gray-800 text-white"
        >
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Year"
          value={filters.year}
          onChange={(e) => setFilters({ ...filters, year: e.target.value })}
          className="p-2 rounded-lg bg-gray-800 text-white w-28"
        />

        <select
          value={filters.sort}
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          className="p-2 rounded-lg bg-gray-800 text-white"
        >
          <option value="popularity.desc">Popularity ↓</option>
          <option value="popularity.asc">Popularity ↑</option>
          <option value="release_date.desc">Release Date ↓</option>
          <option value="release_date.asc">Release Date ↑</option>
          <option value="vote_average.desc">Rating ↓</option>
          <option value="vote_average.asc">Rating ↑</option>
        </select>

        <button
          onClick={handleFilter}
          className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Apply
        </button>
      </div>

      {/* Movie Grid */}
      {movies.length === 0 ? (
        <p>No movies found 😢</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`} // Navigate to your details page
              className="border rounded shadow hover:scale-105 transition overflow-hidden bg-gray-800"
            >
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-72 object-cover"
                />
              ) : (
                <div className="h-72 flex items-center justify-center bg-gray-700">
                  No Image
                </div>
              )}
              <div className="p-2">
                <h2 className="font-semibold text-sm truncate">{movie.title}</h2>
                <p className="text-xs text-gray-400">{movie.release_date || "Unknown"}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
};

export default HomePage;
