"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const [history, setHistory] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    verifyUser(token);
  }, []);

  const verifyUser = async (token) => {
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Unauthorized");
      }

      const data = await res.json();

      setUser(data.user);

      loadHistory();
    } catch (err) {
      console.log(err);

      localStorage.removeItem("token");

      router.push("/login");
    }
  };

  const loadHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://127.0.0.1:8000/predictions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Unable to load history");
      }

      const data = await res.json();

      setHistory(data);
    } catch (err) {
      console.log(err);
    }
  };

  const deletePrediction = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(
        `http://127.0.0.1:8000/predictions/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      loadHistory();
    } catch (err) {
      console.log(err);
    }
  };

  const editPrediction = async (item) => {
    const disease = prompt(
      "Edit Disease",
      item.disease
    );

    if (!disease) return;

    const confidence = prompt(
      "Edit Confidence",
      item.confidence
    );

    if (!confidence) return;

    const token = localStorage.getItem("token");

    await fetch(
      `http://127.0.0.1:8000/predictions/${item._id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          disease,
          confidence,
        }),
      }
    );

    loadHistory();
  };

  const logout = () => {
    localStorage.removeItem("token");

    router.push("/login");
  };

  const averageConfidence =
    history.length > 0
      ? (
          history.reduce(
            (sum, item) =>
              sum + Number(item.confidence),
            0
          ) / history.length
        ).toFixed(2)
      : 0;

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Dashboard
          </h1>

          <p className="text-gray-600 mt-2">

            Welcome {user?.sub}

          </p>

        </div>

        <button
          onClick={logout}
          className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>

      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-green-600 text-white p-6 rounded-xl">

          <h2 className="text-xl font-bold">
            Total Predictions
          </h2>

          <p className="text-5xl mt-4">
            {history.length}
          </p>

        </div>

        <div className="bg-blue-600 text-white p-6 rounded-xl">

          <h2 className="text-xl font-bold">

            Latest Prediction

          </h2>

          <p className="text-2xl mt-4">

            {history.length
              ? history[0].disease
              : "No Prediction"}

          </p>

        </div>

        <div className="bg-orange-500 text-white p-6 rounded-xl">

          <h2 className="text-xl font-bold">

            Average Confidence

          </h2>

          <p className="text-5xl mt-4">

            {averageConfidence}%

          </p>

        </div>

      </div>

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-bold mb-6">

          Prediction History

        </h2>

        <table className="w-full border">

          <thead>

            <tr className="bg-gray-200">

              <th className="border p-3">
                Disease
              </th>

              <th className="border p-3">
                Confidence
              </th>

              <th className="border p-3">
                File
              </th>

              <th className="border p-3">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {history.length > 0 ? (

              history.map((item) => (

                <tr key={item._id}>

                  <td className="border p-3">

                    {item.disease}

                  </td>

                  <td className="border p-3">

                    {item.confidence}%

                  </td>

                  <td className="border p-3">

                    {item.filename}

                  </td>

                  <td className="border p-3">

                    <button
                      onClick={() =>
                        editPrediction(item)
                      }
                      className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deletePrediction(item._id)
                      }
                      className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="4"
                  className="text-center p-6"
                >
                  No Prediction History
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}