"use client";
import { useEffect, useState } from "react";
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

  // Load trending movies by default
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

  // Handle search
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

  // Handle filters
  const handleFilter = async () => {
    try {
      const results = await discoverMovies(filters);
      setMovies(results);
    } catch (err) {
      console.error("Error discovering movies:", err);
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">🎬 Movie Explorer</h1>

      {/* Search */}
      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border px-4 py-2 rounded w-full"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        {/* Genre Filter */}
        <select
          value={filters.genre}
          onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>

        {/* Year Filter */}
        <input
          type="number"
          placeholder="Year"
          value={filters.year}
          onChange={(e) => setFilters({ ...filters, year: e.target.value })}
          className="border px-3 py-2 rounded w-28"
        />

        {/* Sort Filter */}
        <select
          value={filters.sort}
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          className="border px-3 py-2 rounded"
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
          className="bg-green-600 text-white px-4 py-2 rounded"
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
            <div
              key={movie.id}
              className="border rounded shadow hover:scale-105 transition"
            >
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full rounded-t"
                />
              ) : (
                <div className="h-64 bg-gray-300 flex items-center justify-center text-gray-600">
                  No Image
                </div>
              )}
              <div className="p-2">
                <h2 className="font-semibold text-sm">{movie.title}</h2>
                <p className="text-xs text-gray-500">{movie.release_date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default HomePage;
