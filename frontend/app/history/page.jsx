"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const API_BASE = "http://127.0.0.1:8000";

export default function History() {
  const router = useRouter();

  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    disease: "",
    confidence: "",
  });
  const [savingId, setSavingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetchPredictions();
  }, []);

  const fetchPredictions = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`${API_BASE}/predictions`);
      setPredictions(response.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load predictions. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (prediction) => {
    setEditingId(prediction._id);
    setEditForm({
      disease: prediction.disease,
      confidence: prediction.confidence,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({
      disease: "",
      confidence: "",
    });
  };

  const saveEdit = async (id) => {
    setSavingId(id);
    setError("");

    try {
      await axios.put(`${API_BASE}/predictions/${id}`, {
        disease: editForm.disease,
        confidence: parseFloat(editForm.confidence),
      });

      await fetchPredictions();
      setEditingId(null);
    } catch (err) {
      console.error("Update error:", err);
      setError("Failed to update prediction.");
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this prediction record?")) return;

    setDeletingId(id);
    setError("");

    try {
      await axios.delete(`${API_BASE}/predictions/${id}`);

      setPredictions((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete prediction.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-green-700 text-white p-5 flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          🌱 Crop Disease Detection
        </h1>

        <div className="flex gap-6">
          <a href="/">Home</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/history">History</a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-8 mb-16">
        <h2 className="text-3xl font-bold mb-6">
          Prediction History
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <p>Loading predictions...</p>
        ) : predictions.length === 0 ? (
          <p>
            No predictions found. Upload an image on the Home page first.
          </p>
        ) : (
          <div className="space-y-4">
            {predictions.map((p) => (
              <div
                key={p._id}
                className="border rounded-lg p-4 flex justify-between items-center"
              >
                {editingId === p._id ? (
                  <div className="flex-1 flex gap-4 items-center flex-wrap">
                    <input
                      type="text"
                      className="border p-2 rounded-lg flex-1 min-w-[150px]"
                      value={editForm.disease}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          disease: e.target.value,
                        })
                      }
                    />

                    <input
                      type="number"
                      step="0.01"
                      className="border p-2 rounded-lg w-28"
                      value={editForm.confidence}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          confidence: e.target.value,
                        })
                      }
                    />

                    <button
                      onClick={() => saveEdit(p._id)}
                      disabled={savingId === p._id}
                      className="bg-green-700 text-white px-4 py-2 rounded-lg"
                    >
                      {savingId === p._id ? "Saving..." : "Save"}
                    </button>

                    <button
                      onClick={cancelEdit}
                      className="bg-gray-300 px-4 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <div>
                      <p className="font-semibold">
                        {p.disease}
                      </p>

                      <p className="text-sm text-gray-600">
                        Confidence: {p.confidence}% | File: {p.filename}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => startEdit(p)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(p._id)}
                        disabled={deletingId === p._id}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg"
                      >
                        {deletingId === p._id
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-green-700 text-white text-center py-4">
        © 2026 Crop Disease Detection System
      </footer>
    </div>
  );
}