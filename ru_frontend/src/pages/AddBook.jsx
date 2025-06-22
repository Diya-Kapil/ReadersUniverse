import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const genres = [
  "Fiction",
  "Non-fiction",
  "Biography",
  "Self-help",
  "Fantasy",
  "Science",
  "History",
  "Romance",
  "Mystery",
  "Other",
];

export default function AddBook() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
    coverUrl: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const isValidUrl = (str) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = "Title is required";
    if (!formData.author.trim()) errs.author = "Author is required";
    if (!formData.genre) errs.genre = "Genre is required";
    if (formData.year && (isNaN(formData.year) || formData.year < 0))
      errs.year = "Year must be a positive number";
    if (formData.coverUrl && !isValidUrl(formData.coverUrl))
      errs.coverUrl = "Invalid URL";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    if (validate()) {
      try {
        const userId = localStorage.getItem("userId");
        const bookPayload = {
          ...formData,
          user: userId,
        };
        await axios.post("http://localhost:5000/api/books", bookPayload);
        setSuccess(true);
        setFormData({
          title: "",
          author: "",
          genre: "",
          year: "",
          coverUrl: "",
          description: "",
        });
        setErrors({});
        navigate("/dashboard", { state: { refresh: true } });
      } catch (err) {
        console.error("Error adding book:", err);
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center pt-24 px-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1400&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="backdrop-blur-md bg-white/40 rounded-3xl shadow-xl max-w-4xl w-full p-10 md:p-16"
        style={{ border: "1px solid rgba(255, 255, 255, 0.25)" }}
      >
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-serif italic text-yellow-800 drop-shadow-md mb-4">
            "A library is not a luxury but one of the necessities of life."
          </h2>
          <p className="text-yellow-900 font-semibold text-lg drop-shadow-sm">
            – Henry Ward Beecher
          </p>
          <p className="mt-6 text-yellow-900 max-w-xl mx-auto text-md leading-relaxed">
            Join our community by adding your favorite books — because every
            story shared grows the library and connects us all.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white bg-opacity-90 rounded-xl shadow-lg max-w-xl mx-auto p-8"
          noValidate
        >
          <h3 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
            Add a Book
          </h3>

          {/* Title */}
          <div className="mb-6">
            <label htmlFor="title" className="block mb-2 text-gray-700 font-medium">
              Book Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter book title"
              className={`w-full rounded-md border px-4 py-2 text-gray-900
                focus:outline-none focus:ring-2 focus:ring-yellow-400
                ${errors.title ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.title && (
              <p className="text-red-500 mt-1 text-sm">{errors.title}</p>
            )}
          </div>

          {/* Author */}
          <div className="mb-6">
            <label htmlFor="author" className="block mb-2 text-gray-700 font-medium">
              Author <span className="text-red-500">*</span>
            </label>
            <input
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Enter author name"
              className={`w-full rounded-md border px-4 py-2 text-gray-900
                focus:outline-none focus:ring-2 focus:ring-yellow-400
                ${errors.author ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.author && (
              <p className="text-red-500 mt-1 text-sm">{errors.author}</p>
            )}
          </div>

          {/* Genre */}
          <div className="mb-6">
            <label htmlFor="genre" className="block mb-2 text-gray-700 font-medium">
              Genre <span className="text-red-500">*</span>
            </label>
            <select
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className={`w-full rounded-md border px-4 py-2 text-gray-900
                focus:outline-none focus:ring-2 focus:ring-yellow-400
                ${errors.genre ? "border-red-500" : "border-gray-300"}`}
            >
              <option value="">Select genre</option>
              {genres.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            {errors.genre && (
              <p className="text-red-500 mt-1 text-sm">{errors.genre}</p>
            )}
          </div>

          {/* Year */}
          <div className="mb-6">
            <label htmlFor="year" className="block mb-2 text-gray-700 font-medium">
              Year of Publication
            </label>
            <input
              id="year"
              name="year"
              type="number"
              min="0"
              value={formData.year}
              onChange={handleChange}
              placeholder="e.g. 2023"
              className={`w-full rounded-md border px-4 py-2 text-gray-900
                focus:outline-none focus:ring-2 focus:ring-yellow-400
                ${errors.year ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.year && (
              <p className="text-red-500 mt-1 text-sm">{errors.year}</p>
            )}
          </div>

          {/* Cover URL */}
          <div className="mb-6">
            <label htmlFor="coverUrl" className="block mb-2 text-gray-700 font-medium">
              Cover Image URL
            </label>
            <input
              id="coverUrl"
              name="coverUrl"
              type="url"
              value={formData.coverUrl}
              onChange={handleChange}
              placeholder="Paste cover image URL"
              className={`w-full rounded-md border px-4 py-2 text-gray-900
                focus:outline-none focus:ring-2 focus:ring-yellow-400
                ${errors.coverUrl ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.coverUrl && (
              <p className="text-red-500 mt-1 text-sm">{errors.coverUrl}</p>
            )}
            {formData.coverUrl && isValidUrl(formData.coverUrl) && (
              <img
                src={formData.coverUrl}
                alt="cover preview"
                className="mt-3 mx-auto w-40 h-56 object-cover rounded-md shadow"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/150?text=No+Preview";
                }}
              />
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <label htmlFor="description" className="block mb-2 text-gray-700 font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description"
              className="w-full rounded-md border px-4 py-2 text-gray-900
                focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-md shadow transition-transform hover:scale-105"
          >
            Add Book
          </button>

          {success && (
            <p className="mt-4 text-green-700 font-semibold text-center">
              Book added successfully!
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
