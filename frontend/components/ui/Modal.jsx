"use client";

import { useState } from "react";

/**
 * Modal Component
 * @param {string} title - Modal title
 * @param {string} content - Modal content
 */

export default function Modal({
  title = "Demo Modal",
  content = "This is a sample modal component.",
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Open Modal
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-96">
            <h2 className="text-2xl font-bold mb-4">
              {title}
            </h2>

            <p>{content}</p>

            <button
              onClick={() => setOpen(false)}
              className="mt-5 bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}