import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar.jsx';
import MovieList from '../components/MovieList.jsx';
import Filter from '../components/Filter.jsx';
import Pagination from '../components/Pagination.jsx';
import { fetchTrending, searchMovies, discoverMovies, fetchGenres } from '../api/tmdb.js';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [mode, setMode] = useState('trending'); // 'trending' | 'search' | 'discover'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [genres, setGenres] = useState([]);
  const [filters, setFilters] = useState({ genre: '', year: '', sort_by: '' });

  useEffect(() => {
    fetchGenres().then(setGenres).catch(()=>{});
  }, []);

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, page, filters]);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      let data;
      if (mode === 'trending') {
        data = await fetchTrending(page);
      } else if (mode === 'search') {
        data = await searchMovies(query, page);
      } else {
        data = await discoverMovies({
          page,
          with_genres: filters.genre || undefined,
          year: filters.year || undefined,
          sort_by: filters.sort_by || undefined
        });
      }
      setMovies(data.results || []);
      setTotalPages(Math.min(data.total_pages || 1, 500)); // TMDB caps pages at 500
    } catch (err) {
      console.error(err);
      setError('Failed to fetch movies. Try again.');
    } finally {
      setLoading(false);
    }
  }

  function onSearch(q) {
    setQuery(q);
    setPage(1);
    if (!q) setMode('trending'); else setMode('search');
  }

  function onApplyFilters(newFilters) {
    setFilters(newFilters);
    setPage(1);
    setMode('discover');
  }

  function onClearFilters() {
    setFilters({ genre: '', year: '', sort_by: '' });
    setPage(1);
    setMode('trending');
  }

  return (
    <div>
      <div className="mb-4">
        <SearchBar onSearch={onSearch} initialValue={query} />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <aside className="md:w-64">
          <Filter genres={genres} onApply={onApplyFilters} onClear={onClearFilters} current={filters} />
        </aside>

        <section className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {mode === 'trending' ? 'Trending This Week' : mode === 'search' ? `Search results for "${query}"` : 'Discover'}
            </h2>
            <div className="text-sm text-gray-600">Page {page} / {totalPages}</div>
          </div>

          {loading && <div className="py-12 text-center">Loading...</div>}
          {error && <div className="text-red-500">{error}</div>}

          {!loading && !error && (
            <>
              <MovieList movies={movies} />
              <div className="mt-6">
                <Pagination page={page} totalPages={totalPages} onChange={(p) => setPage(p)} />
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
