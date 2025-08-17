# Letterbox - Movie Database (Vite + React + Tailwind)

Full-featured Movie DB frontend using The Movie Database (TMDB) API.

## Features
- Search by title
- Trending & Popular movies
- Movie detail page with credits, trailer, similar movies
- Filters: genre, year, sort
- Pagination (TMDB pages; max 500)
- Loading & error states
- Responsive UI with Tailwind

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env` from `.env.example` and add your TMDB key:
   ```
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   ```
   Get a free API key: https://www.themoviedb.org/settings/api

3. Run dev server:
   ```bash
   npm run dev
   ```

4. Build:
   ```bash
   npm run build && npm run preview
   ```

## Notes
- Vite serves `public/` at root (e.g., `/placeholder.png`).
- Consider adding React Query for caching if you want offline-ish UX.
- Deploy on Vercel/Netlify and set `VITE_TMDB_API_KEY` in project env vars.
