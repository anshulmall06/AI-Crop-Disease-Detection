"use client";
import AIAdvice from "../../components/AIAdvice";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [language, setLanguage] = useState("en");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiResult, setAIResult] = useState("");
  const [error, setError] = useState("");
  const translations = {
    en: {
      title: "AI Crop Disease Detection",
      subtitle: "Upload leaf images and detect diseases instantly",
      upload: "Upload Leaf Image",
      predict: "Predict Disease",
      result: "Prediction Result",
      disease: "Disease Name",
      confidence: "Confidence Score",
      description: "Disease Description",
      treatment: "Recommended Treatment",
      prevention: "Preventive Measures",
      features: "System Features",
      uploadFeature: "Upload",
      uploadDesc: "Upload crop leaf images.",
      aiFeature: "AI Detection",
      aiDesc: "Detect diseases instantly.",
      treatmentFeature: "Treatment",
      treatmentDesc: "Get treatment suggestions.",
      footer: "© 2026 Crop Disease Detection System",
    },

    hi: {
      title: "एआई फसल रोग पहचान प्रणाली",
      subtitle: "पत्तियों की तस्वीर अपलोड करें और तुरंत रोग पहचानें",
      upload: "पत्ती की तस्वीर अपलोड करें",
      predict: "रोग पहचानें",
      result: "परिणाम",
      disease: "रोग का नाम",
      confidence: "विश्वास स्तर",
      description: "रोग का विवरण",
      treatment: "उपचार की सलाह",
      prevention: "रोकथाम के उपाय",
      features: "सिस्टम की विशेषताएँ",
      uploadFeature: "अपलोड",
      uploadDesc: "फसल की पत्तियों की तस्वीर अपलोड करें।",
      aiFeature: "एआई पहचान",
      aiDesc: "रोग की तुरंत पहचान करें।",
      treatmentFeature: "उपचार",
      treatmentDesc: "उपचार संबंधी सुझाव प्राप्त करें।",
      footer: "© 2026 फसल रोग पहचान प्रणाली",
    },
  };

  const t = translations[language];

  const handlePredict = async () => {
    if (!file) {
      alert("Please select an image first");
      return;
    }
  const getAIExplanation = async (diseaseName) => {
    
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

      console.log("Prediction Response:", response.data);
      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Prediction failed. Make sure the backend is running.");
    } finally {
      setLoading(false);
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

      {/* Hero Section */}
      <section className="bg-green-600 text-white py-20 text-center">
        <h1 className="text-5xl font-bold">{t.title}</h1>

        <p className="mt-4 text-xl">{t.subtitle}</p>
      </section>

      {/* Upload Card */}
      <div className="max-w-4xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6">{t.upload}</h2>

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
          {loading ? "Predicting..." : t.predict}
        </button>
      </div>

      {/* Result Card */}
      <div className="max-w-4xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6">{t.result}</h2>

        <div className="space-y-3">
          {result ? (
  <>
    <>
  <p>
    <strong>{t.disease}:</strong> {result.disease}
  </p>

  <p>
    <strong>{t.confidence}:</strong> {result.confidence}%
  </p>

  <p>
    <strong>{t.description}:</strong>{" "}
    Detected disease in uploaded crop leaf.
  </p>

  <p>
    <strong>{t.treatment}:</strong>{" "}
    Apply recommended fungicide and monitor crop health.
  </p>

  <p>
    <strong>{t.prevention}:</strong>{" "}
    Maintain proper irrigation and crop hygiene.
  </p>

  {/* Check if AIAdvice is rendering */}
  <div className="mt-6 border-2 border-red-500 p-4 rounded-lg">
    <p className="text-red-600 font-bold text-xl mb-3">
      AI Advice Component Below
    </p>

   <AIAdvice
  disease={result.disease}
  confidence={result.confidence}
/>
  </div>
</>
  </>
) : (
  <p>No prediction yet.</p>
)}
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto py-16">
        <h2 className="text-4xl font-bold text-center mb-10">
          {t.features}
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h3 className="text-2xl font-bold mb-2">
              📷 {t.uploadFeature}
            </h3>
            <p>{t.uploadDesc}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h3 className="text-2xl font-bold mb-2">
              🤖 {t.aiFeature}
            </h3>
            <p>{t.aiDesc}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h3 className="text-2xl font-bold mb-2">
              💊 {t.treatmentFeature}
            </h3>
            <p>{t.treatmentDesc}</p>
          </div>

        </div>
      </div>

      {/* Language Selector */}
      <div className="flex justify-center gap-4 py-10">
        <button
          onClick={() => setLanguage("en")}
          className={`px-6 py-3 rounded-full font-semibold ${
            language === "en"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          English
        </button>

        <button
          onClick={() => setLanguage("hi")}
          className={`px-6 py-3 rounded-full font-semibold ${
            language === "hi"
              ? "bg-orange-500 text-white"
              : "bg-gray-200"
          }`}
        >
          हिन्दी
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-green-700 text-white text-center py-4">
        {t.footer}
      </footer>

    </div>
  );
}