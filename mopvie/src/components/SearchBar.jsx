import React, { useState, useEffect } from 'react';

export default function SearchBar({ onSearch, initialValue = '' }) {
  const [q, setQ] = useState(initialValue);

  useEffect(() => { setQ(initialValue); }, [initialValue]);

  function submit(e) {
    e.preventDefault();
    if (onSearch) onSearch(q.trim());
  }

  function clear() {
    setQ('');
    if (onSearch) onSearch('');
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="flex-1 rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300"
        placeholder="Search movies by title..."
      />
      <button type="submit" className="bg-sky-600 text-white px-4 py-2 rounded">Search</button>
      <button type="button" onClick={clear} className="px-3 py-2 rounded border text-sm">Clear</button>
    </form>
  );
}
