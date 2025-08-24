import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import TrendingShowsPage from "./pages/TrendingShowsPage";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <Routes>
      {/* Wrap routes with Layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/trending" element={<TrendingShowsPage />} />
        <Route path="/movie/:movieId" element={<DetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;
