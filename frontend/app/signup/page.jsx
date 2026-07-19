"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Signup() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/auth/register",
        {
          email,
          password,
        }
      );

      alert(res.data.message);
      router.push("/login");
    } catch (error) {
      alert(
        error.response?.data?.detail ||
          "Registration Failed"
      );
    }
  };

  return (
    <div
      style={{
        width: "350px",
        margin: "80px auto",
      }}
    >
      <h1>Sign Up</h1>

      <form onSubmit={register}>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          Register
        </button>

      </form>
    </div>
  );
}