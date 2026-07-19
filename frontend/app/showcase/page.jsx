"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Modal,
  Toast,
  Loader,
} from "@/components/ui";

export default function Showcase() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`min-h-screen p-10 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-white text-black"
      }`}
    >
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <h1 className="text-4xl font-bold mb-8">
        Component Library Demo
      </h1>

      <div className="mb-8">
        <h2 className="text-2xl mb-2">Button</h2>
        <Button text="Click Me" />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl mb-2">Input</h2>
        <Input placeholder="Enter your name" />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl mb-2">Modal</h2>
        <Modal />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl mb-2">Toast</h2>
        <Toast message="Prediction Successful!" />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl mb-2">Loader</h2>
        <Loader />
      </div>
    </div>
  );
}