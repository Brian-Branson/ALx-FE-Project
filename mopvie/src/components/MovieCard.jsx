import React from 'react';
import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
  const poster = movie.poster_path ? `https://image.tmdb.org/t/p/w342${movie.poster_path}` : '/placeholder.png';
  return (
    <Link to={`/movie/${movie.id}`} className="block bg-white rounded overflow-hidden shadow hover:shadow-lg transform hover:-translate-y-1 transition">
      <img src={poster} alt={movie.title} className="w-full h-56 object-cover" />
      <div className="p-3">
        <h3 className="font-semibold text-sm line-clamp-2">{movie.title}</h3>
        <div className="text-xs text-gray-500 mt-1 flex items-center justify-between">
          <span>{movie.release_date ? movie.release_date.slice(0,4) : '—'}</span>
          <span className="bg-slate-100 px-2 py-0.5 rounded text-xs">{Math.round((movie.vote_average || 0) * 10) / 10}</span>
        </div>
      </div>
    </Link>
  );
}
