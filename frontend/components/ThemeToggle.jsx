"use client";

import { useState } from "react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`min-h-screen p-10 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-white text-black"
      }`}
    >
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="px-4 py-2 rounded bg-green-600 text-white"
      >
        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>

      <div className="mt-8">
        <h1 className="text-4xl font-bold">
          Component Library Demo
        </h1>
        <p className="mt-4">
          This page demonstrates dark and light mode.
        </p>
      </div>
    </div>
  );
}