import React from "react";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const BookCard = ({ title, author, cover }) => {
  const token = localStorage.getItem("token");

  const handleSaveToWishlist = async () => {
    if (!token) return toast.warning("Please login to save books!");

    try {
      await axios.post(
        "http://localhost:5000/api/user/wishlist",
        { title, author, cover },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Book added to wishlist!");
    } catch (err) {
      console.error("Error saving to wishlist:", err);
      toast.error(
        err.response?.data?.message || "Failed to save book to wishlist."
      );
    }
  };

  const handleStartReading = async () => {
    if (!token) return toast.warning("Please login to start reading!");

    try {
      await axios.patch(
        "http://localhost:5000/api/user/current-reading",
        {
          title,
          author,
          cover,
          progress: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Book added to Currently Reading!");
    } catch (err) {
      if (err.response?.status === 404) {
        // If book doesn't exist yet, create it
        try {
          await axios.post(
            "http://localhost:5000/api/user/current-reading",
            {
              title,
              author,
              cover,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          toast.success("Started reading the book!");
        } catch (createErr) {
          console.error("Error starting reading:", createErr);
          toast.error("Failed to start reading.");
        }
      } else {
        console.error("Error starting reading:", err);
        toast.error(
          err.response?.data?.message || "Failed to start reading the book."
        );
      }
    }
  };

  return (
    <div className="break-inside-avoid rounded-xl overflow-hidden shadow-md hover:shadow-lg transition bg-white">
      <img
        src={cover}
        alt={title}
        className="w-full h-64 object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://via.placeholder.com/300x400?text=No+Image";
        }}
      />
      <div className="p-4 relative">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-500 mt-1">by {author}</p>

        <button
          className="absolute top-2 right-2 text-pink-500 hover:text-pink-700 bg-white p-1 rounded-full shadow"
          onClick={handleSaveToWishlist}
          title="Add to Wishlist"
        >
          <FaHeart size={18} />
        </button>

        <button
          onClick={handleStartReading}
          className="mt-4 w-full bg-indigo-600 text-white text-sm py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Start Reading
        </button>
      </div>
    </div>
  );
};

export default BookCard;
