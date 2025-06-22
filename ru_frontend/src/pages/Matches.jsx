import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { FiUsers } from "react-icons/fi";
import axios from "axios";

function Matches() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user/matches", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setMatches(res.data.matches || []);
      } catch (err) {
        console.error("Error fetching matches:", err);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-rose-100 to-blue-100">
      <Sidebar />
      <Topbar />

      <main className="pt-24 ml-20 px-6 pb-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-indigo-800 mb-2">
            Your Book Mates
          </h2>
          <p className="text-md text-gray-700 italic">
            "Books bring people together — let’s discover your literary tribe."
          </p>
        </div>

        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-lg shadow-md">
            <FiUsers className="text-indigo-600 text-2xl" />
            <span className="text-lg font-semibold text-gray-700">
              {matches.length} Matches Found
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {matches.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <h3 className="text-lg font-bold text-indigo-800">{user.name}</h3>
              <p className="text-sm text-gray-600 mb-2">
                Favorite Book: <span className="italic">{user.favBook}</span>
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-xs">
                {user.genres.map((genre, idx) => (
                  <span
                    key={idx}
                    className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Matches;
