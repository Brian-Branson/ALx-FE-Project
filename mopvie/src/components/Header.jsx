import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-sky-600 flex items-center justify-center text-white font-bold">L</div>
          <div>
            <div className="font-semibold text-lg">Letterbox</div>
            <div className="text-xs text-gray-500 -mt-0.5">Movie DB</div>
          </div>
        </Link>

        <nav className="hidden md:flex gap-4 items-center text-sm text-gray-600">
          <Link to="./pages/TrendingShowsPage.jsx" className="hover:underline">
            Trending Shows
          </Link>
        </nav>
      </div>
    </header>
  );
}
