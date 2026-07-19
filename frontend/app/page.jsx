"use client";

import { useState } from "react";
import axios from "axios";
import AIAdvice from "../components/AIAdvice";

export default function Home() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    if (!file) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(response.data);
    } catch (err) {
      console.error(err);
      alert("Prediction failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-green-700 text-white p-5">
        <h1 className="text-3xl font-bold">
          🌱 Crop Disease Detection
        </h1>
      </nav>

      {/* Upload */}
      <div className="max-w-4xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-8">

        <h2 className="text-3xl font-bold mb-6">
          Upload Leaf Image
        </h2>

        <input
          type="file"
          accept="image/*"
          className="w-full border p-3 rounded-lg"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          onClick={handlePredict}
          className="mt-5 bg-green-700 text-white px-6 py-3 rounded-lg"
        >
          {loading ? "Predicting..." : "Predict Disease"}
        </button>

      </div>

      {/* Prediction Result */}
      <div className="max-w-4xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-8">

        <h2 className="text-3xl font-bold mb-6">
          Prediction Result
        </h2>

        {result ? (
          <>
            <p>
              <strong>Disease:</strong> {result.disease}
            </p>

            <p>
              <strong>Confidence:</strong> {result.confidence}%
            </p>

            <p>
              <strong>Description:</strong> Detected disease in uploaded crop leaf.
            </p>

            <p>
              <strong>Treatment:</strong> Apply recommended fungicide.
            </p>

            <p>
              <strong>Prevention:</strong> Maintain crop hygiene.
            </p>

            <AIAdvice
              disease={result.disease}
              confidence={result.confidence}
            />
          </>
        ) : (
          <p>No prediction yet.</p>
        )}

      </div>

      {/* Test */}
      <div className="bg-red-600 text-white text-center p-5 mt-8 text-2xl">
        TEST COMPONENT
      </div>

    </div>
  );
}