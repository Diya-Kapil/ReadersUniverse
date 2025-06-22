// src/pages/Home.jsx
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-100 to-indigo-100 flex flex-col">

      {/* Main Section */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl font-extrabold text-indigo-700 mb-8">ReadersUniverse</h1>

        <blockquote className="max-w-2xl">
          <p className="text-3xl md:text-4xl font-bold text-gray-800 leading-snug">
            “A reader lives a thousand lives before he dies. The man who never reads lives only one.”
          </p>
          <footer className="mt-4 text-lg text-gray-600">― George R.R. Martin</footer>
        </blockquote>

        <button
          onClick={() => navigate("/signup")}
          className="mt-10 px-8 py-3 text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-full shadow-lg transition"
        >
          Join Now
        </button>
      </main>
    </div>
  );
}

export default Home;
