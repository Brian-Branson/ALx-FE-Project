import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./DetailPage.css";

const API_KEY = "f927c623d8e75c727547728a5cac5643";

export default function DetailPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  if (!movieId) return <div className="error">Invalid movie ID</div>;

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

  if (!movie) return <div className="loading">Loading...</div>;

  return (
    <div
      className="detail-page"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="overlay">
        <div className="content">
          <img
            className="poster"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="info">
            <h1>
              {movie.title} <span className="year">({movie.release_date?.slice(0, 4)})</span>
            </h1>
            <p className="meta">
              {movie.release_date} • {movie.runtime} min •{" "}
              {movie.genres?.map((g) => g.name).join(", ")}
            </p>
            <div className="score">
              <span className="circle">{Math.round(movie.vote_average * 10)}%</span>
              <span>User Score</span>
            </div>
            <h2>Overview</h2>
            <p className="overview">{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
