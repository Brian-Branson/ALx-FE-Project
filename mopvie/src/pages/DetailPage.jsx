import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = "f927c623d8e75c727547728a5cac5643";

export default function DetailPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  if (!movieId) return <div className="text-red-500 font-bold text-lg p-4">Invalid movie ID</div>;

  const id = movieId.split("-")[0];

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        console.error("Failed to fetch movie:", err);
      }
    };
    fetchMovie();
  }, [id]);

  if (!movie) return <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">Loading...</div>;

  return (
    <div
      className="relative min-h-screen bg-cover bg-center text-white flex items-center"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="absolute inset-0 w-full h-full bg-black bg-opacity-80 p-12 md:p-24 lg:p-32 flex justify-center items-center">
        <div className="flex flex-col md:flex-row max-w-7xl w-full gap-8">
          <img
            className="w-64 md:w-80 lg:w-96 rounded-xl shadow-2xl"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2">
              {movie.title} <span className="text-gray-400 font-light">({movie.release_date?.slice(0, 4)})</span>
            </h1>
            <p className="text-base text-gray-300 mb-4">
              {movie.release_date} • {movie.runtime} min •{" "}
              {movie.genres?.map((g) => g.name).join(", ")}
            </p>
            <div className="flex items-center gap-4 my-4">
              <div className="bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg text-green-400">
                {Math.round(movie.vote_average * 10)}%
              </div>
              <span className="text-gray-300">User Score</span>
            </div>
            <h2 className="text-2xl font-semibold mt-8 mb-2">Overview</h2>
            <p className="text-base leading-relaxed text-gray-200">
              {movie.overview}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
