// src/pages/TvDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDetails } from "../api/tmdb";
const TvDetailsPage = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    const loadShow = async () => {
      try {
        const data = await fetchDetails("tv", id);
        setShow(data);
      } catch (error) {
        console.error("Error fetching TV show details:", error);
      }
    };
    loadShow();
  }, [id]);

  if (!show) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gray-950 text-white">
        <p>Loading TV show details...</p>
      </main>
    );
  }

  return (
    <main className="p-6 bg-gray-950 min-h-screen text-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Poster */}
          <img
            src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
            alt={show.name}
            className="rounded-lg w-full md:w-1/3"
          />

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{show.name}</h1>
            <p className="text-gray-400 mb-4">{show.tagline}</p>

            <p className="mb-4">{show.overview}</p>

            <p className="mb-2">
              <span className="font-semibold">First Air Date:</span>{" "}
              {show.first_air_date}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Last Air Date:</span>{" "}
              {show.last_air_date}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Seasons:</span>{" "}
              {show.number_of_seasons}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Episodes:</span>{" "}
              {show.number_of_episodes}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Rating:</span>{" "}
              {show.vote_average} ⭐
            </p>

            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Genres</h2>
              <div className="flex flex-wrap gap-2">
                {show.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-blue-600 px-3 py-1 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TvDetailsPage;
