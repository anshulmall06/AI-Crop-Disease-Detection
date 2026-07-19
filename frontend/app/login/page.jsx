"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/auth/login",
        {
          email,
          password,
        }
      );

      console.log(res.data);

      localStorage.setItem(
        "token",
        res.data.access_token
      );

      alert("Login Successful");

      router.push("/dashboard");
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.detail ||
        "Unable to login"
      );
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#2E7D32,#66BB6A,#A5D6A7)",
      }}
    >
      <div
        style={{
          width: "400px",
          background: "white",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#2E7D32",
            marginBottom: "10px",
          }}
        >
          AI Crop Disease
        </h1>

        <h3
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Login
        </h3>

        <form onSubmit={login}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "20px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "20px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              background: "#2E7D32",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Don't have an account?{" "}
          <span
            style={{
              color: "green",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={() => router.push("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}