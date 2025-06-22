import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { FaHeart, FaTrash } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

function Favourites() {
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get("http://localhost:5000/api/user/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWishlist(res.data.wishlist || []);
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
      toast.error("Failed to load wishlist.");
    }
  };

  const handleRemove = async (book) => {
    const token = localStorage.getItem("token");
    if (!token) return toast.warning("Please login!");

    try {
      await axios.delete("http://localhost:5000/api/user/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
        data: {
          title: book.title,
          author: book.author,
        },
      });
      toast.success("Book removed from wishlist");
      fetchWishlist(); // refresh
    } catch (err) {
      console.error("Failed to remove book:", err);
      toast.error("Failed to remove book.");
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 to-purple-100">
      <Sidebar />
      <Topbar />

      <main className="pt-24 ml-20 px-6 pb-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-indigo-800 mb-2">Your Favourites</h2>
          <p className="text-md text-gray-700 italic">
            There is more treasure in books than in all the pirate's loot on Treasure Island
          </p>
        </div>

        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-lg shadow-md">
            <FaHeart className="text-pink-500 text-2xl" />
            <span className="text-lg font-semibold text-gray-700">
              {wishlist.length} Books Favorited
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((book, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-64 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/300x400?text=No+Image";
                }}
              />
              <div className="p-4 relative">
                <h3 className="font-bold text-lg text-indigo-800">{book.title}</h3>
                <p className="text-sm text-gray-600">{book.author}</p>
                <button
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 bg-white p-1 rounded-full shadow"
                  onClick={() => handleRemove(book)}
                  title="Remove from Wishlist"
                >
                  <FaTrash size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Favourites;
