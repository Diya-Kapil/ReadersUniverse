import { FiSearch, FiBookOpen, FiMessageSquare } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();

  return (
    <div className="ml-20 w-[calc(100%-5rem)] h-20 bg-white shadow-md flex items-center justify-between px-8 fixed top-0 z-40">
      {/* Search Bar */}
      <div className="relative w-1/2 max-w-xl mx-auto">
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
          <FiSearch />
        </span>
        <input
          type="text"
          placeholder="Search books, authors, or genres..."
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-gray-100 text-sm shadow-sm"
        />
      </div>

      {/* Right Side Buttons */}
      <div className="flex gap-4">
        {/* Feed Button */}
        <button
          onClick={() => navigate("/feed")}
          className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-3 rounded-full shadow-md text-sm font-semibold transition-transform hover:scale-105"
        >
          <FiMessageSquare className="text-lg" />
          Feed
        </button>

        {/* Current Reading Button */}
        <button
          onClick={() => navigate("/current-reading")}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-full shadow-md text-sm font-semibold transition-transform hover:scale-105"
        >
          <FiBookOpen className="text-lg" />
          Current Reading
        </button>
      </div>
    </div>
  );
};

export default Topbar;
