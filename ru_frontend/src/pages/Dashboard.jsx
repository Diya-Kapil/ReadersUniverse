import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import BookCard from "../components/BookCard";
import axios from "axios";

const staticBooks = [
  {
    id: 1,
    title: "Ikigai",
    author: "Héctor García & Francesc Miralles",
    cover: "https://m.media-amazon.com/images/I/81l3rZK4lnL.jpg",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    cover: "https://m.media-amazon.com/images/I/91bYsX41DVL.jpg",
  },
  {
    id: 3,
    title: "I Don't Love You Anymore",
    author: "David Clarke",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1718894017i/208826884.jpg",
  },
  {
    id: 4,
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    cover: "https://m.media-amazon.com/images/I/71QKQ9mwV7L.jpg",
  },
  {
    id: 5,
    title: "The Art of Not Overthinking",
    author: "Anne Bogel",
    cover: "https://m.media-amazon.com/images/I/51oZWWrslKL.jpg",
  },
  {
    id: 6,
    title: "The Art of Being Alone",
    author: "Renuka Gavrani",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1684661075i/152297026.jpg",
  },
  {
    id: 7,
    title: "A Good Girl's Guide to Murder",
    author: "Holly Jackson",
    cover: "https://m.media-amazon.com/images/I/81E3hDPr3eL.jpg",
  },
  {
    id: 8,
    title: "The Alchemist",
    author: "Paulo Coelho",
    cover: "https://m.media-amazon.com/images/I/71aFt4+OTOL.jpg",
  },
  {
    id: 9,
    title: "It Ends with Us",
    author: "Colleen Hoover",
    cover: "https://m.media-amazon.com/images/I/81s0B6NYXML.jpg",
  },
  {
    id: 10,
    title: "It Starts with Us",
    author: "Colleen Hoover",
    cover: "https://m.media-amazon.com/images/I/81FummIc2eL._UF1000,1000_QL80_.jpg",
  },
  {
    id: 11,
    title: "You Can Heal Your Life",
    author: "Louise Hay",
    cover: "https://m.media-amazon.com/images/I/71E0V1yb0nL.jpg",
  },
  {
    id: 12,
    title: "Think Like a Monk",
    author: "Jay Shetty",
    cover: "https://m.media-amazon.com/images/I/81s6DUyQCZL.jpg",
  },
];

function Dashboard() {
  const navigate = useNavigate();
  const [fetchedBooks, setFetchedBooks] = useState([]);

  const handleAddBookClick = () => {
    navigate("/add-book");
  };

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/books");
      setFetchedBooks(res.data.books);
    } catch (err) {
      console.error("Failed to load books:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Merge static and fetched books
  const allBooks = [
    ...staticBooks,
    ...fetchedBooks.map((b) => ({
      id: b._id,
      title: b.title,
      author: b.author,
      cover: b.coverUrl,
    })),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50">
      <Sidebar />
      <Topbar />
      <main className="pt-24 ml-20 px-8 md:px-12 lg:px-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <h1 className="text-4xl font-extrabold text-indigo-900 drop-shadow-sm select-none">
            Explore Library
          </h1>
          <button
            onClick={handleAddBookClick}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-400"
            aria-label="Add a new book"
          >
            + Add Book
          </button>
        </div>

        {/* Books Grid */}
        <div
          className="
            grid grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-8
            auto-rows-fr
          "
        >
          {allBooks.map((b) => (
            <BookCard key={b.id} {...b} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
