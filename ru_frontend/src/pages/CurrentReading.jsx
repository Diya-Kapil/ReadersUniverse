import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

function CurrentlyReading() {
  const [books, setBooks] = useState([]);

  const token = localStorage.getItem("token");

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user/current-reading", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(res.data.currentlyReading || []);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  const markAsFinished = async (title, author) => {
    try {
      await axios.patch(
        "http://localhost:5000/api/user/current-reading",
        { title, author, progress: 100 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Marked as finished!");
      fetchBooks(); // Refresh list
    } catch (err) {
      console.error("Mark as finished error:", err);
      toast.error("Failed to mark as finished");
    }
  };

  const continueReading = async (title, author, currentProgress) => {
    const newProgress = Math.min(currentProgress + 10, 100);
    try {
      await axios.patch(
        "http://localhost:5000/api/user/current-reading",
        { title, author, progress: newProgress },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Progress updated!");
      fetchBooks(); // Refresh list
    } catch (err) {
      console.error("Continue Reading error:", err);
      toast.error("Failed to update progress");
    }
  };

  const handleRemove = async (title, author) => {
    try {
      await axios.delete("http://localhost:5000/api/user/current-reading", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { title, author },
      });
      toast.success("Book removed!");
      fetchBooks();
    } catch (err) {
      console.error("Remove error:", err);
      toast.error("Failed to remove book");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <Sidebar />
      <Topbar />

      <main className="pt-24 px-6 ml-20">
        <h1 className="text-3xl font-bold text-indigo-800 mb-2">Currently Reading</h1>
        <p className="text-gray-600 mb-8 text-lg">Your personal reading journey, one book at a time.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {books.length === 0 && (
            <p className="text-gray-500 text-lg">No books in currently reading.</p>
          )}

          {books.map((book, index) => (
            <div
              key={index}
              className="bg-white shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition duration-300 flex flex-col relative"
            >
              <img
                src={book.cover}
                alt={book.title}
                className="h-64 w-full object-cover"
              />

              {/* Delete Icon */}
              <button
                className="absolute top-3 right-3 bg-red-100 hover:bg-red-200 p-2 rounded-full"
                onClick={() => handleRemove(book.title, book.author)}
                title="Remove from Currently Reading"
              >
                <FaTrash className="text-red-600" />
              </button>

              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-lg font-semibold text-indigo-700">{book.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{book.author}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                    <div
                      className="bg-indigo-600 h-2.5 rounded-full"
                      style={{ width: `${book.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-indigo-500 mb-4">
                    {book.progress}% Completed
                  </p>
                </div>

                <div className="mt-auto flex gap-2">
                  <button
                    className="flex-1 py-1 text-sm bg-indigo-100 text-indigo-700 border border-indigo-300 rounded-md hover:bg-indigo-200 transition"
                    onClick={() => continueReading(book.title, book.author, book.progress)}
                  >
                    📖 Continue Reading
                  </button>
                  <button
                    className="flex-1 py-1 text-sm bg-green-100 text-green-700 border border-green-300 rounded-md hover:bg-green-200 transition"
                    onClick={() => markAsFinished(book.title, book.author)}
                  >
                    ✅ Mark as Finished
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default CurrentlyReading;
