// src/components/SearchBar.jsx
import React, { useState } from "react";

const API_KEY = "f927c623d8e75c727547728a5cac5643";

export default function SearchBar({ onResults }) {
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          query
        )}&language=en-US&page=1`
      );
      const data = await response.json();
      onResults(data.results || []);
    } catch (error) {
      console.error("Search failed:", error);
      onResults([]);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center w-full max-w-lg mx-auto bg-white rounded-2xl shadow p-2"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="flex-1 px-4 py-2 text-gray-700 focus:outline-none rounded-l-2xl"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-r-2xl hover:bg-blue-600"
      >
        Search
      </button>
    </form>
  );
}
