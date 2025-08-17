import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-gray-600 mb-4">Page not found</p>
      <Link to="/" className="text-sky-600 underline">Go back home</Link>
    </div>
  );
}
