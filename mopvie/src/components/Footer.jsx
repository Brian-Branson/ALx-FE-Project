import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-6">
      <div className="container mx-auto px-4 py-4 text-sm text-gray-600">
        <div className="flex items-center justify-between">
          <div>© {new Date().getFullYear()} Letterbox</div>
          <div>Data from <a href="https://www.themoviedb.org" target="_blank" rel="noreferrer" className="underline">The Movie Database (TMDB)</a></div>
        </div>
      </div>
    </footer>
  );
}
