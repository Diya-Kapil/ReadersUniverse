// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../services/api";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", formData);

      // ✅ Save token and user ID to localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user?._id || res.data.user?.id);

      toast.success("Login successful! Redirecting...", {
        position: "top-center",
        autoClose: 2000,
      });

      setTimeout(() => navigate("/dashboard"), 2500);
    } catch (error) {
      console.error("Login error:", error);
      const message =
        error.response?.data?.message || "Login failed. Please try again later.";
      toast.error(message, {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVhZGluZyUyMGFlc3RoZXRpY3xlbnwwfHwwfHx8MA%3D%3D')",
      }}
    >
      <ToastContainer />
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

      {/* Left Quote */}
      <div className="hidden lg:flex flex-col w-1/2 text-white pl-16 pr-8 z-10">
        <h1 className="text-6xl font-extrabold leading-tight mb-6 text-indigo-900">
          Welcome Back to ReadersUniverse
        </h1>
        <p className="text-3xl font-bold max-w-md leading-snug text-white">
          Every time you open a book, you're stepping into a new world. Pick up where you left off.
        </p>
      </div>

      {/* Right Login Form */}
      <div className="z-10 w-full max-w-md bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] mx-6 lg:mx-0">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="email"
            type="email"
            placeholder="Email or Username"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          New to ReadersUniverse?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-indigo-600 font-semibold cursor-pointer hover:underline"
          >
            Join now
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
