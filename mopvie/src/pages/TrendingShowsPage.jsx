import { useEffect, useState } from "react";
import { fetchTrending } from "../api/tmdb";

const TrendingShows = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const loadTrending = async () => {
      try {
        const data = await fetchTrending();
        setShows(data);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };
    loadTrending();
  }, []);

  return (
    <main className="p-6">
      <h2 className="text-2xl font-bold mb-4">Trending Movies</h2>
      <ul className="space-y-3">
        {shows.map((movie) => (
          <li
            key={movie.id}
            className="p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition"
          >
            <p className="text-lg font-semibold">{movie.title}</p>
            <p className="text-sm text-gray-400">ID: {movie.id}</p>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default TrendingShows;
