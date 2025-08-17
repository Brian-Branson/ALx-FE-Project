import React, { useState, useEffect } from 'react';

export default function Filter({ genres = [], onApply, onClear, current = {} }) {
  const [genre, setGenre] = useState(current.genre || '');
  const [year, setYear] = useState(current.year || '');
  const [sortBy, setSortBy] = useState(current.sort_by || '');

  useEffect(() => {
    setGenre(current.genre || '');
    setYear(current.year || '');
    setSortBy(current.sort_by || '');
  }, [current]);

  function apply() {
    if (onApply) onApply({ genre, year, sort_by: sortBy });
  }

  function reset() {
    setGenre('');
    setYear('');
    setSortBy('');
    if (onApply) onApply({ genre: '', year: '', sort_by: '' });
  }

  return (
    <div className="bg-white rounded shadow p-4 sticky top-6">
      <h4 className="font-semibold mb-3">Filters</h4>

      <div className="mb-3">
        <label className="text-xs text-gray-600">Genre</label>
        <select value={genre} onChange={(e)=>setGenre(e.target.value)} className="w-full mt-1 rounded border px-2 py-1 text-sm">
          <option value="">Any</option>
          {genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
        </select>
      </div>

      <div className="mb-3">
        <label className="text-xs text-gray-600">Year</label>
        <input value={year} onChange={(e)=>setYear(e.target.value)} placeholder="e.g. 2022" className="w-full mt-1 rounded border px-2 py-1 text-sm" />
      </div>

      <div className="mb-3">
        <label className="text-xs text-gray-600">Sort</label>
        <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)} className="w-full mt-1 rounded border px-2 py-1 text-sm">
          <option value="">Default</option>
          <option value="popularity.desc">Popularity Desc</option>
          <option value="popularity.asc">Popularity Asc</option>
          <option value="vote_average.desc">Rating Desc</option>
          <option value="release_date.desc">Release Date Desc</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button onClick={apply} className="flex-1 bg-sky-600 text-white rounded px-3 py-2 text-sm">Apply</button>
        <button onClick={reset} className="px-3 py-2 rounded border text-sm">Reset</button>
      </div>

      <div className="mt-3">
        <button onClick={() => { reset(); if (onClear) onClear(); }} className="text-xs text-gray-500 underline">Clear all & go home</button>
      </div>
    </div>
  );
}
