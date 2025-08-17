import React from 'react';
import MovieCard from './MovieCard.jsx';

export default function MovieList({ movies = [] }) {
  if (!movies || movies.length === 0) {
    return <div className="py-8 text-center text-gray-500">No movies found.</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {movies.map(m => <MovieCard key={m.id} movie={m} />)}
    </div>
  );
}
