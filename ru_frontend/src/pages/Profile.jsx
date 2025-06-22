import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data.user);
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      }
    };

    fetchUser();
  }, []);

  const quotes = [
    "“A reader lives a thousand lives before he dies.” – George R.R. Martin",
    "“Until I feared I would lose it, I never loved to read.” – Harper Lee",
    "“So many books, so little time.” – Frank Zappa",
    "“Books are a uniquely portable magic.” – Stephen King",
    "“Reading is essential for those who seek to rise.” – Jim Rohn",
    "“If you don’t like to read, you haven’t found the right book.” – J.K. Rowling",
    "“Reading gives us someplace to go when we have to stay where we are.” – Mason Cooley",
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  const recentlyViewed = user?.recentlyViewed || [
    {
      title: "Atomic Habits",
      author: "James Clear",
      cover: "https://m.media-amazon.com/images/I/91bYsX41DVL.jpg",
    },
    {
      title: "The Alchemist",
      author: "Paulo Coelho",
      cover: "https://m.media-amazon.com/images/I/71aFt4+OTOL.jpg",
    },
    {
      title: "Ikigai",
      author: "Héctor García",
      cover: "https://m.media-amazon.com/images/I/81l3rZK4lnL.jpg",
    },
    {
      title: "It Ends with Us",
      author: "Colleen Hoover",
      cover: "https://m.media-amazon.com/images/I/81s0B6NYXML.jpg",
    },
    {
      title: "Think Like a Monk",
      author: "Jay Shetty",
      cover: "https://m.media-amazon.com/images/I/81s6DUyQCZL.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      <Sidebar />
      <Topbar />

      <main className="pt-24 ml-20 px-6">
        <div className="grid grid-cols-2 grid-rows-2 gap-6 h-[calc(100vh-6rem)]">
          
          {/* Quote Block */}
          <div className="rounded-xl p-6 relative bg-cover bg-center overflow-hidden shadow-lg flex items-center justify-center"
            style={{
              backgroundImage:
                "url('https://images.squarespace-cdn.com/content/v1/5f13643bd87ba32558d653e7/fbe95804-f2e0-42b5-b20a-ff91c0a8bde8/sabina-sturzu-pAk7WnfquaI-unsplash.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-xl"></div>
            <p className="relative z-10 text-xl text-white font-semibold text-center px-4 leading-relaxed">
              {randomQuote}
            </p>
          </div>

          {/* Profile Info */}
          <div className="bg-gradient-to-br from-white via-indigo-50 to-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center border border-indigo-100">
            <img
              src={
                user?.profilePic ||
                "https://i.pinimg.com/736x/de/92/0d/de920d91132a5d32186537067846d3cf.jpg"
              }
              alt="profile"
              className="w-24 h-24 rounded-full mb-4 object-cover ring-4 ring-indigo-300 shadow"
            />
            <h2 className="text-xl font-bold text-indigo-800">
              {user?.fullname || "Loading..."}
            </h2>
            <p className="text-gray-500">@{user?.username || "username"}</p>
            <p className="text-sm text-gray-600">{user?.email || "email@example.com"}</p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {user?.genres?.map((genre, idx) => (
                <span
                  key={idx}
                  className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>
            <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
              Edit Profile
            </button>
          </div>

          {/* Recently Viewed */}
          <div className="bg-white/80 rounded-xl shadow-lg p-6 overflow-auto backdrop-blur border border-gray-200">
            <h2 className="text-lg font-semibold text-indigo-700 mb-4">Recently Viewed Books</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recentlyViewed.map((book, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-indigo-50 hover:bg-indigo-100 transition p-3 rounded-lg shadow"
                >
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-14 h-20 object-cover rounded shadow"
                  />
                  <div>
                    <h3 className="text-sm font-semibold text-indigo-800">{book.title}</h3>
                    <p className="text-xs text-gray-600">{book.author}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes Section */}
          <div className="bg-white/80 rounded-xl shadow-lg p-6 flex flex-col backdrop-blur border border-gray-200">
            <h2 className="text-lg font-semibold text-indigo-700 mb-4">Your Personal Book</h2>
            <textarea
              placeholder="Write your thoughts here..."
              className="w-full h-full border border-indigo-200 bg-white/50 text-gray-700 p-4 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder:text-indigo-300"
            ></textarea>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
