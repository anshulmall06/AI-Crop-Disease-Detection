"use client";

import { useState } from "react";

/**
 * Toast Component
 * @param {string} message - Toast message
 */

export default function Toast({
  message = "Operation Successful!",
}) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <button
        onClick={() => {
          setShow(true);
          setTimeout(() => setShow(false), 3000);
        }}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Show Toast
      </button>

      {show && (
        <div className="fixed top-5 right-5 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg">
          {message}
        </div>
      )}
    </div>
  );
}