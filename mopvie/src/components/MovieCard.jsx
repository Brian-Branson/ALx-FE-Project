import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}-${movie.title.replace(/\s+/g, "-")}`}>
      <div className="movie-card">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <h3>{movie.title}</h3>
      </div>
    </Link>
  );
}
