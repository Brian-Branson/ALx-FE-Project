import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-6 py-3">
          <Header />
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main >
    </div>
  );
}

export default Layout;
