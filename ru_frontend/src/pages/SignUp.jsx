import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../services/api"; // Axios instance with baseURL set

const genreOptions = [
  "Fiction", "Mystery", "Fantasy", "Romance", "Sci-Fi",
  "Non-Fiction", "Self Help", "Biography"
];

function Signup() {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    genres: [],
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        genres: checked
          ? [...prev.genres, value]
          : prev.genres.filter((g) => g !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/register", formData);
      if (response.status === 201) {
        toast.success("Signup successful! Redirecting...", {
          position: "top-center",
          autoClose: 2000,
        });
        setTimeout(() => navigate("/login"), 2500);
      }
    } catch (error) {
      console.error("Signup error:", error);
      const message =
        error.response?.data?.message || "Server error. Please try again later.";
      toast.error(message, {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center">
      <ToastContainer />

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1600&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center w-full px-6 py-10">
        {/* Left Text */}
        <div className="hidden lg:flex flex-col w-1/2 text-left pl-16 pr-8">
          <h1 className="text-6xl font-extrabold leading-tight mb-6 text-indigo-900">
            Welcome to ReadersUniverse
          </h1>
          <p className="text-3xl font-bold max-w-md leading-snug text-white">
            Within the pages of every book lies a world waiting to be discovered.
            Join us and begin your journey into the universe of readers.
          </p>
        </div>

        {/* Signup Form */}
        <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] mx-6 lg:mx-0">
          <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
            Create an Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              name="fullname"
              type="text"
              placeholder="Full Name"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
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

            <label className="block text-gray-700 font-medium">
              Preferred Genres
            </label>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {genreOptions.map((genre) => (
                <label key={genre} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={genre}
                    checked={formData.genres.includes(genre)}
                    onChange={handleChange}
                  />
                  {genre}
                </label>
              ))}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-center mt-4 text-gray-600">
            Already a member?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-indigo-600 font-semibold cursor-pointer hover:underline"
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
