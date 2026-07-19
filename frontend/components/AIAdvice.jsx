"use client";

import { useState } from "react";
import axios from "axios";

export default function AIAdvice({ disease, confidence }) {
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState("");
  const [error, setError] = useState("");

  const getAIAdvice = async () => {
    setLoading(true);
    setAdvice("");
    setError("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/ai/explain",
        {
          disease: disease,
        }
      );

      setAdvice(response.data.answer);
    } catch (err) {
      setError("Failed to generate AI advice.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 bg-green-50 rounded-xl shadow-lg border border-green-300 p-6">

      <h2 className="text-3xl font-bold text-green-700 mb-4">
        🌿 AI Crop Advisor
      </h2>

      <div className="grid md:grid-cols-2 gap-4 mb-6">

        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="font-bold text-green-700">Disease</h3>
          <p>{disease}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="font-bold text-green-700">Confidence</h3>
          <p>{confidence}%</p>
        </div>

      </div>

      <button
        onClick={getAIAdvice}
        className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg"
      >
        🤖 Get AI Advice
      </button>

      {loading && (
  <div className="mt-6 bg-blue-50 border border-blue-300 rounded-xl p-5 shadow">

    <div className="flex items-center gap-4">

      <div className="animate-spin rounded-full h-8 w-8 border-4 border-green-200 border-t-green-600"></div>

      <div>
        <p className="text-lg font-semibold text-green-700">
          🤖 AI is analyzing your crop...
        </p>

        <p className="text-gray-600">
          Generating disease description, treatment and prevention tips...
        </p>
      </div>

    </div>

  </div>
)}

      {error && (
        <div className="mt-6 text-red-600 font-semibold">
          {error}
        </div>
      )}

      {advice && (
        <div className="mt-8">

          <h2 className="text-2xl font-bold mb-5">
            🌾 AI Analysis Report
          </h2>

          <div className="bg-white border rounded-xl shadow p-5">
            <pre className="whitespace-pre-wrap leading-8 text-gray-700">
              {advice}
            </pre>
          </div>

        </div>
      )}

    </div>
  );
}