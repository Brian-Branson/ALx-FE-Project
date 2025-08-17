import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieDetails } from '../api/tmdb.js';

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError('Failed to load movie details');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <div className="py-12 text-center">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!movie) return <div>No movie found.</div>;

  const poster = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder.png';
  const cast = movie.credits?.cast?.slice(0, 8) || [];
  const trailer = movie.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube');

  return (
    <div className="bg-white rounded shadow p-4">
      <div className="flex flex-col md:flex-row gap-6">
        <img src={poster} alt={movie.title} className="w-full md:w-64 object-cover rounded" />
        <div className="flex-1">
          <h1 className="text-2xl font-bold">
            {movie.title} <span className="text-gray-500 text-base">({movie.release_date?.slice(0,4)})</span>
          </h1>
          <p className="mt-2 text-sm text-gray-700">{movie.overview}</p>

          <div className="mt-4 text-sm text-gray-600 space-y-1">
            <div><strong>Genres:</strong> {movie.genres?.map(g => g.name).join(', ') || '—'}</div>
            <div><strong>Runtime:</strong> {movie.runtime ? `${movie.runtime} min` : '—'}</div>
            <div><strong>Rating:</strong> {movie.vote_average ?? '—'} ({movie.vote_count ?? 0} votes)</div>
            <div><strong>Tagline:</strong> {movie.tagline || '—'}</div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold">Top Cast</h3>
            <div className="mt-2 flex gap-3 overflow-x-auto py-2">
              {cast.length === 0 && <div className="text-sm text-gray-500">No cast info.</div>}
              {cast.map(c => (
                <div key={c.cast_id || c.credit_id} className="min-w-[120px]">
                  <img
                    src={c.profile_path ? `https://image.tmdb.org/t/p/w154${c.profile_path}` : '/placeholder.png'}
                    alt={c.name}
                    className="w-24 h-32 object-cover rounded"
                  />
                  <div className="text-xs mt-1">
                    <div className="font-medium">{c.name}</div>
                    <div className="text-gray-500">{c.character}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {trailer && (
            <div className="mt-6">
              <h3 className="font-semibold">Trailer</h3>
              <div className="mt-2">
                <iframe
                  title="trailer"
                  width="100%"
                  height="360"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  allowFullScreen
                />
              </div>
            </div>
          )}

          <div className="mt-6 flex gap-3">
            <Link to="/" className="text-sm text-slate-700 underline">← Back</Link>
            {movie.homepage && <a className="text-sm text-sky-600" href={movie.homepage} target="_blank" rel="noreferrer">Official site</a>}
          </div>
        </div>
      </div>

      {movie.similar?.results?.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Similar movies</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {movie.similar.results.slice(0,8).map(s => (
              <a key={s.id} href={`/movie/${s.id}`} className="block">
                <img src={s.poster_path ? `https://image.tmdb.org/t/p/w342${s.poster_path}` : '/placeholder.png'} alt={s.title} className="w-full h-40 object-cover rounded" />
                <div className="text-sm mt-1">{s.title}</div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
